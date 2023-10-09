import { View, Text, FlatList, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import Header from '../../components/Header/header'
import { Icon } from '@rneui/themed'
import { realm } from '../../store/realm'
import { Cart } from '../../store/realm/models/Cart'
import { useSelector } from 'react-redux'
import { RootState } from '../../../App'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Colors from '../../constants/Colors'
import { LargeText, SmallText, TinyText } from '../../components/Text'
import { Address, SelectedAddress, User } from '../../store/realm/models/User'
import { StackNavigation } from '../../navigation/MainNavigation'
import EmptyList from '../../components/EmptyList/EmptyList'

const CartScreen = () => {
  const navigation = useNavigation<StackNavigation>()
  const userLoginId = useSelector<RootState>((store) => store.userLoginIdReducer.userLoginId)
  const addressId = realm.objects<SelectedAddress>('SelectedAddress').filtered(`userId == ${userLoginId}`)[0]?.addressId || 0
  const userData = realm.objects<User>('User').filtered(`id == ${userLoginId}`)[0]
  const [cartItems, setCartItems] = useState(realm.objects<Cart>('Cart').filtered(`idUser == ${userLoginId}`))

  const refreshCart = () => {
    const carts = realm.objects<Cart>('Cart').filtered(`idUser == ${userLoginId}`)
    setCartItems(carts)
  }

  useFocusEffect(useCallback(() => {
    refreshCart()
  }, []))
  return (
    <View>
      <Header
        title='My Cart'
        isShowRightIcon
        rightIcon='trash-bin-outline'
      />
      <View style={{
        flexDirection: 'row',
        paddingHorizontal: 10,
        height: 40,
        backgroundColor: Colors.CONTAINER,
        alignItems: 'center'
      }}>
        <Icon name='map-pin'
          type='feather'
          size={16}
        />
        <TinyText text='Shipping to ' style={{ marginLeft: 5 }} />
        <TinyText text={`${userData.addresses[addressId].city},${userData.addresses[addressId].province}`} style={{ fontWeight: 'bold' }} />
      </View>

      <FlatList
        data={cartItems}
        ListEmptyComponent={
          <EmptyList
              imageSource={require('../../assets/images/bag.png')}
              heading='Your cart stil empty'
              desc='Find your favorite items and add to cart before check out.'
              buttonCaption='Find Products'
            />
        }
        renderItem={(item) => (
          <View>
            <Text>{item.item.quantity}</Text>
          </View>
        )}
      />
      

    </View>
  )
}

export default CartScreen