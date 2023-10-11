import { View, Text, FlatList, Image, Alert, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
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

const CartScreen = () => {
  const navigation = useNavigation<StackNavigation>()
  const userLoginId = useSelector<RootState>((store) => store.userLoginIdReducer.userLoginId)
  const addressId = realm.objects<SelectedAddress>('SelectedAddress').filtered(`userId == ${userLoginId}`)[0]?.addressId || 0
  const userData = realm.objects<User>('User').filtered(`id == ${userLoginId}`)[0]
  const [cartItems, setCartItems] = useState(realm.objects<Cart>('Cart').filtered(`idUser == ${userLoginId}`))
  const products = realm.objects<Product>('Product')
  const internalStorage = realm.objects<InternalStorage>('InternalStorage')
  const ramCapacity = realm.objects<RamCapacity>('RamCapacity')

  const refreshCart = () => {
    const carts = realm.objects<Cart>('Cart').filtered(`idUser == ${userLoginId}`)
    setCartItems(carts)
  }

  const getProductData = (idProduct: number) => {
    return products.filtered(`id == ${idProduct}`)[0]
  }

  const getProductPrice = (item) => {
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
    <View style={{ padding: 10, borderTopWidth: 1, borderColor: Colors.CONTAINER }}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={{ uri: getProductData(item.idProduct).images[0].link }}
          style={cartStyles.tileImage}
        />

        <View style={{ paddingLeft: 10 }}>
          <MediumText text={getProductData(item.idProduct).name} style={cartStyles.itemName} />
          {getProductData(item.idProduct).idCategory != 4 ?
            <SmallText text={
              `${getSizeData('ram', item.idRamCapacity)?.size}/${getSizeData('internal', item.idInternalStorage)?.size}`} />
            :
            <SmallText text={`Liked by : ${getProductData(item.idProduct).likeNumber.toString()}`} />
          }
          <MediumText text={`$ ${getProductPrice(item).toFixed(2)}`}
          />
        </View>

      </View>
      <View style={cartStyles.actionWrapperContainer}>
        <Button text='Remove'
          textStyle={{ color: 'red', verticalAlign: 'middle' }}
          containerStyle={{ alignItems: 'center' }}
          onPress={() => cartModified('remove', item)}
        />
        <View style={cartStyles.buttonPlusMinusContainer}>
          <Button text='-'
            textStyle={cartStyles.itemButton}
            containerStyle={cartStyles.buttonPlusMinus}
            onPress={() => cartModified('minus', item)}
          />
          <TinyText text={item.quantity.toString()}
            style={[cartStyles.buttonPlusMinus,
            {
              textAlign: 'center',
              verticalAlign: 'middle',
              fontSize: 14

            }]}
          />
          <Button text='+'
            textStyle={cartStyles.itemButton}
            containerStyle={cartStyles.buttonPlusMinus}
            onPress={() => cartModified('plus', item)}
          />
        </View>
      </View>
    </View>
  )

  useFocusEffect(useCallback(() => {
    refreshCart()
  }, []))

  return (
    <View style={{ flex: 1 }}>
      <Header
        title='My Cart'
        isShowRightIcon
        rightIcon='trash-bin-outline'
        disabledRightIcon={cartItems ? false : true}
      />
      <View style={cartStyles.addressContainer}>
        <Icon name='map-pin'
          type='feather'
          size={16}
        />
        <TinyText text='Shipping to ' style={{ marginLeft: 5 }} />
        <TinyText text={`${userData.addresses[addressId].city},${userData.addresses[addressId].province}`} style={{ fontWeight: 'bold' }} />
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
              onPress={() => { navigation.navigate('HomeTab', {screen:'Search'}) }}
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
              text='Checkout'
              containerStyle={[WelcomeScreenStyle.primaryButtonContainer, cartStyles.checkoutButton]}
              textStyle={WelcomeScreenStyle.primaryTextButton} 
              onPress={() => {navigation.navigate('CheckOut')}}
              />
          </View>
        </View>
      </View>

    </View>
  )
}

export default CartScreen