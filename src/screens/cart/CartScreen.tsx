import { View, Text, FlatList, Image, Alert, ScrollView, TouchableOpacity } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import Header from '../../components/Header/header'
import { Icon } from '@rneui/themed'
import { realm } from '../../store/realm'
import { Cart } from '../../store/realm/models/Cart'
import { useSelector } from 'react-redux'
import { RootState } from '../../../App'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Colors from '../../constants/Colors'
import { LargeText, MediumText, SmallText, TinyText } from '../../components/Text'
import { Address, SelectedAddress, User } from '../../store/realm/models/User'
import { StackNavigation } from '../../navigation/MainNavigation'
import EmptyList from '../../components/EmptyList/EmptyList'
import { Product } from '../../store/realm/models/Product'
import { InternalStorage, RamCapacity } from '../../store/realm/models/Size'
import cartStyles from './CartScreenStyle'
import Button from '../../components/Button/button'
import { WelcomeScreenStyle } from '../onboarding/WelcomeScreenStyle'
import { Portal } from 'react-native-portalize'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Modalize } from 'react-native-modalize'
import ProductList from '../../components/ProductList/ProductList'

const CartScreen = () => {
  const navigation = useNavigation<StackNavigation>()
  const userLoginId = useSelector<RootState>((store) => store.userLoginIdReducer.userLoginId)
  const addressId = realm.objects<SelectedAddress>('SelectedAddress').filtered(`userId == ${userLoginId}`)[0]?.addressId - 1 || 0
  const userData = realm.objects<User>('User').filtered(`id == ${userLoginId}`)[0]
  const [cartItems, setCartItems] = useState(realm.objects<Cart>('Cart').filtered(`idUser == ${userLoginId}`))
  const products = realm.objects<Product>('Product')
  const internalStorage = realm.objects<InternalStorage>('InternalStorage')
  const ramCapacity = realm.objects<RamCapacity>('RamCapacity')
  const [showModal, setShowModal] = useState(false)
  const logoutRef = useRef<Modalize>()
  console.log(addressId)
  const refreshCart = () => {
    const carts = realm.objects<Cart>('Cart').filtered(`idUser == ${userLoginId}`)
    setCartItems(carts)
  }

  const getProductData = (idProduct: number) => {
    return products.filtered(`id == ${idProduct}`)[0]
  }

  const getProductPrice = (item: Cart & Realm.Object<unknown, never>) => {
    if (getProductData(item.idProduct).idCategory != 4) {
      return ((getProductData(item.idProduct).price *
        getSizeData('internal', item.idInternalStorage)?.priceMultiplier *
        getSizeData('ram', item.idRamCapacity)?.priceMultiplier) * item.quantity)
    } else {
      return (getProductData(item.idProduct).price * item.quantity)
    }
  }

  const getAllPriceProduct = () => {
    let price = 0
    cartItems.forEach((item) => price = price + getProductPrice(item))
    return price
  }

  const getSizeData = (type: 'internal' | 'ram', idSize: number) => {
    if (type === "internal") {
      return internalStorage.filtered(`id ==${idSize}`)[0]
    } else {
      return ramCapacity.filtered(`id ==${idSize}`)[0]
    }
  }

  const cartModified = (action: 'remove' | 'plus' | 'minus', item: Cart & Realm.Object<unknown, never>) => {
    if (action === 'remove') {
      realm.write(() => {
        realm.delete(item)
      })
    } else if (action === 'minus') {
      if (item.quantity < 2) {
        Alert.alert('Remove Item', 'Do you want to remove this item?',
          [{
            text: 'Yes',
            onPress: () => {
              realm.write(() => {
                realm.delete(item)
              })
              refreshCart()
            }
          }, { text: 'No', style: 'cancel' }])
      } else {
        realm.write(() => {
          item.quantity--
        })
      }
    } else {
      realm.write(() => {
        item.quantity++
      })
    }
    refreshCart()
  }

  const renderFlatList = ({ item }: { item: Cart & Realm.Object<unknown, never> }) => (
    <ProductList item={item} refreshCart={refreshCart} />
  )

  const onClickDeleteAll = () => {
    refreshCart()
    realm.write(() => {
      realm.delete(cartItems)
    })

  }

  useFocusEffect(useCallback(() => {
    refreshCart()
  }, []))

  return (
    <View style={{ flex: 1 }}>
      <Header
        title='My Cart'
        isShowRightIcon
        rightIcon='trash-bin-outline'
        disabledRightIcon={cartItems.length > 0 ? false : true}
        onRightIconClick={() => { logoutRef.current?.open() }}
      />
      <View style={cartStyles.addressContainer}>
        <Icon name='map-pin'
          type='feather'
          size={16}
        />
        <TinyText text='Shipping to ' style={{ marginLeft: 5 }} />
        <TouchableOpacity onPress={() => { navigation.navigate('SelectAddress') }}>
          <TinyText text={`${userData.addresses[addressId].city},${userData.addresses[addressId].province}`} style={{ fontWeight: 'bold' }} />
        </TouchableOpacity>
      </View>
      <ScrollView style={cartStyles.cartItemContainer}>


        <FlatList
          scrollEnabled={false}
          data={cartItems}
          ListEmptyComponent={
            <EmptyList
              imageSource={require('../../assets/images/bag.png')}
              heading='Your cart stil empty'
              desc='Find your favorite items and add to cart before check out.'
              buttonCaption='Find Products'
              onPress={() => { navigation.navigate('HomeTab', { screen: 'Search' }) }}
            />
          }
          renderItem={renderFlatList}
        />
      </ScrollView>
      <View style={cartStyles.bottomContainer}>
        <View style={cartStyles.bottomSecondContainer}>
          <View>
            <SmallText text='Subtotal' style={{ marginBottom: -5, color: Colors.GRAY_TEXT }} />
            <MediumText text={getAllPriceProduct() ? `$ ${getAllPriceProduct().toFixed(2)}` : '-'} style={{ color: Colors.PRIMARY }} />
          </View>
          <View>
            <Button
              disabled={cartItems.length === 0}
              text='Checkout'
              containerStyle={[WelcomeScreenStyle.primaryButtonContainer, cartStyles.checkoutButton, cartItems.length === 0 ? cartStyles.buttonInactive : null]}
              textStyle={WelcomeScreenStyle.primaryTextButton}
              onPress={() => { navigation.navigate('CheckOut') }}
            />
          </View>
        </View>
      </View>
      <Portal>
        <GestureHandlerRootView style={{ flex: showModal ? 1 : 0 }}>
          <Modalize ref={logoutRef}
            onOpen={() => { setShowModal(true) }}
            onClose={() => { setShowModal(false) }}
            adjustToContentHeight
          >
            <View style={{
              flex: 1,
              padding: 16,
              alignItems: 'center',
            }}>
              <MediumText text='Delete Items?' style={{ textAlign: 'center' }} />
              <SmallText text='Are you sure want to delete all items on cart?' style={{ textAlign: 'center' }} />
              <View style={{ flexDirection: 'row' }}>
                <Button text='Cancel'
                  containerStyle={
                    [WelcomeScreenStyle.secondaryButtonContainer,
                    { flex: 1, borderRadius: 100, marginHorizontal: 10 }]}
                  textStyle={WelcomeScreenStyle.secondaryTextButton}
                  onPress={() => { logoutRef.current?.close() }}
                />
                <Button text='Delete'
                  containerStyle={
                    [WelcomeScreenStyle.primaryButtonContainer,
                    { flex: 1, borderRadius: 100, marginHorizontal: 10, backgroundColor: 'red' }]}
                  textStyle={WelcomeScreenStyle.primaryTextButton}
                  onPress={() => onClickDeleteAll()}
                />
              </View>
            </View>
          </Modalize>
        </GestureHandlerRootView>
      </Portal>
    </View>
  )
}

export default CartScreen