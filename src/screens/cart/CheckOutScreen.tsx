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
import checkOutstyles from './CheckOutStyle'
import { Shipping } from '../../store/realm/models/Shipping'
import profileScreenStyles from '../profile/ProfileScreenStyle'

const CheckOutScreen = () => {
  const navigation = useNavigation<StackNavigation>()
  const userLoginId = useSelector<RootState>((store) => store.userLoginIdReducer.userLoginId)
  const addressId = realm.objects<SelectedAddress>('SelectedAddress').filtered(`userId == ${userLoginId}`)[0]?.addressId || 0
  const userData = realm.objects<User>('User').filtered(`id == ${userLoginId}`)[0]
  const [cartItems, setCartItems] = useState(realm.objects<Cart>('Cart').filtered(`idUser == ${userLoginId}`))
  const products = realm.objects<Product>('Product')
  const internalStorage = realm.objects<InternalStorage>('InternalStorage')
  const ramCapacity = realm.objects<RamCapacity>('RamCapacity')
  const shipping = realm.objects<Shipping>('Shipping')

  const getSelectedShipping = () => {
    const selectedShipping = shipping.filtered(`isSelected == true`)[0]
    if (selectedShipping) {
      return selectedShipping
    }
  }
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

  const renderFlatList = ({ item }: { item: Cart & Realm.Object<unknown, never> }) => (
    <View style={{ padding: 10, borderTopWidth: 1, borderColor: Colors.CONTAINER }}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={{ uri: getProductData(item.idProduct).images[0].link }}
          style={cartStyles.tileImage}
        />
        <TinyText text={item.quantity > 9 ? '9+' : item.quantity.toString()}
          style={{ backgroundColor: Colors.PRIMARY, position: 'absolute', marginLeft: 100, width: 16, height: 16, borderRadius: 100, textAlign: 'center', color: Colors.WHITE }}
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
    </View>
  )

  useFocusEffect(useCallback(() => {
    refreshCart()
  }, []))

  return (
    <View style={{ flex: 1 }}>
      <Header
        title='Order Confirmation'
        isStackScreen
      />
      <View style={cartStyles.addressContainer}>
        <Icon name='shopping-cart'
          type='feather'
          size={16}
        />
        <SmallText text='Order summary ' style={{ marginLeft: 5 }} />
        <View style={{ alignItems: 'flex-end', width: '67%' }}>
          <SmallText text={`$ ${getAllPriceProduct().toFixed(2)}`} style={{ fontWeight: 'bold', alignItems: 'flex-end' }} />
        </View>
      </View>
      <ScrollView style={checkOutstyles.cartItemContainer}>


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
      <View style={checkOutstyles.subtotalContainer}>
        <View style={checkOutstyles.childSubTotalContainer}>
          <View>
            <MediumText text='Subtotal' style={checkOutstyles.textInSubTotalContainer} />
            <MediumText text='Shipping' style={{ ...checkOutstyles.textInSubTotalContainer }} />
          </View>
          <View>
            <MediumText text={`$ ${getAllPriceProduct().toFixed(2)}`} style={{ fontWeight: 'bold', alignItems: 'flex-end' }} />
            <MediumText text={`$ ${getSelectedShipping().deliveryFee.toFixed(2) || 'Free'}`} style={{ fontWeight: 'bold', alignItems: 'flex-end' }} />
          </View>
        </View>
        <View style={checkOutstyles.divider}></View>
        <View style={{ ...checkOutstyles.childSubTotalContainer }}>
          <MediumText text='Total' style={checkOutstyles.textInSubTotalContainer} />
          <MediumText text={`$ ${(getAllPriceProduct() + getSelectedShipping().deliveryFee).toFixed(2) || 'Free'}`} style={{ fontWeight: 'bold', alignItems: 'flex-end' }} />
        </View>
      </View>
      <View style={{...checkOutstyles.addressContainer}}>
        <Icon name='user'
          type='feather'
          size={16}
        />
        <SmallText text='Contact & Shipping Info ' style={{ marginLeft: 5 }} />
      </View>

      <View style={{...checkOutstyles.subtotalContainer, paddingHorizontal: 10}}>
        <View style={{ flexDirection: 'row' }}>
          {userData.profileImage ?
            <Image source={{ uri: userData.profileImage }} style={{ width: 40, height: 40 }} />
            :
            <SmallText text={userData?.fullname.split(' ').map((v) => { return v[0].toUpperCase() })}
              style={profileScreenStyles.textProfileContainer} />
          }
          <View style={{paddingHorizontal: 10, alignContent:'center'}}>
            <MediumText text={userData.fullname || "name?"}  style={{marginBottom:-5, marginTop: 20}}/>
            <SmallText text={userData.email || 'email?'} style={{color: Colors.GRAY_TEXT, verticalAlign:'middle'}}/>
          </View>
        </View>
        <View style={checkOutstyles.divider}></View>
        <MediumText text={getSelectedShipping().shippingName} />
        <MediumText text={`${userData.addresses[addressId].street || <Button text='add new address' />},
${userData.addresses[addressId].city}, ${userData.addresses[addressId].province}`} 
        />
      </View>

      <View style={cartStyles.bottomContainer}>
        <View style={{...cartStyles.bottomSecondContainer, flexDirection:'column', alignItems:'center', paddingVertical: 15}}>
            <Button
              text='Pay Now'
              containerStyle={[WelcomeScreenStyle.primaryButtonContainer,]}
              textStyle={WelcomeScreenStyle.primaryTextButton}
              onPress={() => { navigation.navigate('CheckOut') }}
            />
        </View>
      </View>

    </View>
  )
}

export default CheckOutScreen