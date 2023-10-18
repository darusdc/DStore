import { View, Text, FlatList, Image, Alert, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import Header from '../../components/Header/header'
import { Icon } from '@rneui/themed'
import { realm } from '../../store/realm'
import { Cart } from '../../store/realm/models/Cart'
import { useSelector } from 'react-redux'
import { RootState } from '../../../App'
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import Colors from '../../constants/Colors'
import {  LargeText, MediumText, SmallText, } from '../../components/Text'
import { SelectedAddress, User } from '../../store/realm/models/User'
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
import { Order } from '../../store/realm/models/Order'
import { OrderDetail } from '../../store/realm/models/OrderDetail'
import ProductList from '../../components/ProductList/ProductList'
import { Host, Portal } from 'react-native-portalize'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Modalize } from 'react-native-modalize'
export type CartLike = {
  idProduct: number,
  idUser: unknown,
  idInternalStorage?: number,
  idRamCapacity?: number,
  quantity: number
}
const CheckOutScreen = () => {
  const navigation = useNavigation<StackNavigation>()
  const route : RouteProp<{ params: {productId: number, internalStorageId: number, ramCapacityId: number} }>= useRoute()
  const userLoginId = useSelector<RootState>((store) => store.userLoginIdReducer.userLoginId)
  const [addressId, setAddressId] = useState(realm.objects<SelectedAddress>('SelectedAddress').filtered(`userId == ${userLoginId}`)[0]?.addressId-1 || 0)
  const userData = realm.objects<User>('User').filtered(`id == ${userLoginId}`)[0]
  const products = realm.objects<Product>('Product')
  const [cartItems, setCartItems] = useState(realm.objects<Cart>('Cart').filtered(`idUser == ${userLoginId}`))
  const buyNowCart = 
  [{
    idProduct: route.params?.productId,
    idUser: userLoginId,
    idInternalStorage: route.params?.internalStorageId,
    idRamCapacity: route.params?.ramCapacityId,
    quantity: 1
  }]
  const internalStorage = realm.objects<InternalStorage>('InternalStorage')
  const ramCapacity = realm.objects<RamCapacity>('RamCapacity')
  const [shipping, setShipping] = useState(realm.objects<Shipping>('Shipping'))
  const [showItemOption, setShowItemOption] = useState(false)
  const showItemRef = useRef<Modalize>()

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
    if (route.params?.productId) {
      price = getProductPrice(buyNowCart[0])
    } else {
      cartItems.forEach((item) => price = price + getProductPrice(item))
    }
    return price
  }

  const getSizeData = (type: 'internal' | 'ram', idSize: number) => {
    if (type === "internal") {
      return internalStorage.filtered(`id ==${idSize}`)[0]
    } else {
      return ramCapacity.filtered(`id ==${idSize}`)[0]
    }
  }

  const onClickPayNow = () => {
    const OrderData = realm.objects<Order>('Order')
    const OrderDetails = realm.objects<OrderDetail>('OrderDetail')
    const selectedShipping = getSelectedShipping()
    const idOrder = OrderData.length + 1
    let idOrderDetail = OrderDetails.length - 1
    if (addressId) {
        realm.write(()=> {
          realm.create('Order', {
            id: idOrder,
            idUser: userLoginId,
            idShipping: selectedShipping.id,
            totalPrice: getAllPriceProduct(),
            deliveryFee: selectedShipping.deliveryFee,
            serviceFee: 0,
            date: new Date()
          })
          if (route.params?.productId){
            realm.create('OrderDetail', {
              id: ++idOrderDetail,
              idOrder: idOrder,
              idProduct: buyNowCart[0].idProduct,
              idInternalStorage: buyNowCart[0].idInternalStorage,
              idRamCapacity: buyNowCart[0].idRamCapacity,
              price: getProductPrice(buyNowCart[0]),
              quantity: buyNowCart[0].quantity
            })
          } else {
            cartItems.forEach((item)=> {
              realm.create('OrderDetail', {
                id: ++idOrderDetail,
                idOrder: idOrder,
                idProduct: item.idProduct,
                idInternalStorage: item.idInternalStorage,
                idRamCapacity: item.idRamCapacity,
                price: getProductPrice(item),
                quantity: item.quantity
              })
            })
            realm.delete(cartItems)
          }
        })
        navigation.navigate('SuccessOrder',{orderId: idOrder})
    } else {
      alert('Please add your address first')
    }
    // navigation.navigate('SuccessOrder')
  }

  const renderFlatList = ({ item }: { item: Cart & Realm.Object<unknown, never> | CartLike }) => (
   <ProductList item={item} isCheckOut isShowPrice/>
  )

  const onClickShipping = (id: number) => { 
    realm.write(() => {
      shipping.forEach((item) => {
        item.isSelected = item.id === id
      })
    })
    setShipping(realm.objects<Shipping>('Shipping'))
   }

  const updateAddress = () => { 
    const addressId = realm.objects<SelectedAddress>('SelectedAddress').filtered(`userId == ${userLoginId}`)[0]?.addressId-1
    setAddressId(addressId)
   }

  useFocusEffect(useCallback(() => {
    refreshCart()
    updateAddress()
  }, []))

  return (
    <Host>

    
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
        {route.params?.productId? 
        <FlatList
        scrollEnabled={false}
        data={[...buyNowCart]}
        ListEmptyComponent={
          <EmptyList
            imageSource={require('../../assets/images/bag.png')}
            heading='Your cart stil empty'
            desc='Find your favorite items and add to cart before check out.'
            buttonCaption='Find Products'
            onPress={() => { navigation.navigate('HomeTab', { screen: 'Search' }) }}
          />
        }
        renderItem={(item) => renderFlatList(item)}
      />
        :
        
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
        }
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
      <View style={{ ...checkOutstyles.addressContainer }}>
        <Icon name='user'
          type='feather'
          size={16}
        />
        <SmallText text='Contact & Shipping Info ' style={{ marginLeft: 5 }} />
      </View>

      <View style={{ ...checkOutstyles.subtotalContainer, paddingHorizontal: 10 }}>
        <View style={{ flexDirection: 'row' }}>
          {userData.profileImage ?
            <Image source={{ uri: userData.profileImage }} style={{ width: 40, height: 40 }} />
            :
            <SmallText text={userData?.fullname.split(' ').map((v) => { return v[0].toUpperCase() })}
              style={profileScreenStyles.textProfileContainer} />
          }
          <View style={{ paddingHorizontal: 10, alignContent: 'center' }}>
            <MediumText text={userData.fullname || "name?"} style={{ marginBottom: -5, marginTop: 20 }} />
            <SmallText text={userData.email || 'email?'} style={{ color: Colors.GRAY_TEXT, verticalAlign: 'middle' }} />
          </View>
        </View>
        <View style={checkOutstyles.divider}></View>
        <TouchableOpacity onPress={() => { showItemRef.current?.open() }}>

        <MediumText text={getSelectedShipping().shippingName} />
        </TouchableOpacity>
        {addressId? 
          <MediumText text={`${userData.addresses[addressId].street},
          ${userData.addresses[addressId].city}, ${userData.addresses[addressId].province}`}
                  />
                  :  
        <TouchableOpacity onPress={()=> {navigation.navigate('AddAddress')}}>
          <MediumText text='Add new address' style={{textDecorationLine:'underline'}}/>
        </TouchableOpacity>
      }
      
      </View>

      <View style={cartStyles.bottomContainer}>
        <View style={{ ...cartStyles.bottomSecondContainer, flexDirection: 'column', alignItems: 'center', paddingVertical: 15 }}>
          <Button
            text='Pay Now'
            containerStyle={[WelcomeScreenStyle.primaryButtonContainer,]}
            textStyle={WelcomeScreenStyle.primaryTextButton}
            onPress={() => onClickPayNow()}
          />
        </View>
      </View>

      <Portal>
          <GestureHandlerRootView style={{ flex: showItemOption ? 1 : 0 }}>
            <Modalize
              ref={showItemRef}
              onOpen={() => setShowItemOption(true)}
              onClose={() => setShowItemOption(false)}
              adjustToContentHeight
            >
              <View style={{
                flex: 1,
                padding: 16,
                alignItems: 'center'
              }}>
                <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.DIVIDER, width: Dimensions.get('window').width, alignItems: 'center' }}>
                  <LargeText text='Select your shipping:' />
                </View>

                <FlatList
                  horizontal
                  data={shipping}
                  ListHeaderComponentStyle={{}}
                  renderItem={({ item }) => (

                    <View style={{ margin: 10 }}>
                      <TouchableOpacity style={{ backgroundColor: item.isSelected ? Colors.PRIMARY : null, borderRadius: 100 }}
                        onPress={() => onClickShipping(item.id )}
                      >
                        <MediumText text={item.shippingName} />
                      </TouchableOpacity>
                    </View>
                  )}
                />

                <View style={{ flexDirection: 'row' }}>
                  <LargeText text='Current price: $' />
                  <LargeText text={`${getSelectedShipping().deliveryFee}`} />
                  
                </View>
                <LargeText text='Term:' />
                  <MediumText text={`${getSelectedShipping().terms}`} />
              </View>

            </Modalize>
          </GestureHandlerRootView>
        </Portal>

    </View>
    </Host>
  )
}

export default CheckOutScreen