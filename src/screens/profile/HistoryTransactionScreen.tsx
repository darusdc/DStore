import { View, Text, FlatList, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import Header from '../../components/Header/header'
import { LargeText, SmallText } from '../../components/Text'
import Colors from '../../constants/Colors'
import Button from '../../components/Button/button'
import { WelcomeScreenStyle } from '../onboarding/WelcomeScreenStyle'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { StackNavigation } from '../../navigation/MainNavigation'
import EmptyList from '../../components/EmptyList/EmptyList'
import { realm } from '../../store/realm'
import { Order } from '../../store/realm/models/Order'
import { useSelector } from 'react-redux'
import { RootState } from '../../../App'
import cartStyles from '../cart/CartScreenStyle'
import { Icon } from '@rneui/themed'
import ProductList from '../../components/ProductList/ProductList'
import { OrderDetail } from '../../store/realm/models/OrderDetail'
import HTstyles from './HistoryTransactionStyle'

const HistoryTransactionScreen = () => {
    const navigation = useNavigation<StackNavigation>()
    const month = {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec'
    }

    const userLoginId = useSelector<RootState>((store) => store.userLoginIdReducer.userLoginId)
    const [historyTransactionDB, setHistoryTransactionDB] = useState(realm.objects<Order>('Order').filtered(`idUser == ${userLoginId}`))
    const getOrderItem = (orderId: number) => {
        const orderItem = realm.objects<OrderDetail>('OrderDetail').filtered(`idOrder == ${orderId}`)
        return orderItem
    }

    useFocusEffect(useCallback(() => {
        setHistoryTransactionDB(realm.objects<Order>('Order').filtered(`idUser == ${userLoginId}`))
    },[]))
    return (
        <View style={{flex: 1}}>
            <Header
                title='History Transaction'
                isStackScreen
            />
            <FlatList
                data={[...historyTransactionDB].reverse()}
                ListEmptyComponent={
                    <EmptyList
                        imageSource={require('../../assets/images/bag.png')}
                        heading='No orders yet'
                        desc='When you buy an item, your order about it will appear here.'
                        buttonCaption='Shop Now'
                        onPress={() => { navigation.navigate('HomeTab', { screen: 'Search' }) }}
                    />
                }
                renderItem={({ item }) => (
                    <View style={HTstyles.FlatList_1}>
                        <View style={[cartStyles.addressContainer, HTstyles.orderTitleBar]}>
                            <Icon name='shopping-cart'
                                type='feather'
                                size={16}
                            />
                            <SmallText text={`#ORD-${item.date.getMonth()}${item.date.getFullYear()}${item.id.toString()}`} style={{ marginLeft: 5 }} />
                            <View style={{ alignItems: 'flex-end', width: '70%' }}>
                                <SmallText 
                                text={`${month[item.date.getMonth()]} ${item.date.getDate()}, ${item.date.getFullYear()}`} 
                                style={{ fontWeight: 'bold', alignItems: 'flex-end' }} />
                            </View>
                        </View>
                        <View style={HTstyles.FlatList_2}>
                            {[...getOrderItem(item.id)].length > 2 ?
                                <><FlatList
                                    scrollEnabled={false}
                                    data={[...getOrderItem(item.id)]}
                                    renderItem={(x) => {
                                        if (x.index < 2) {
                                            return (
                                                <ProductList item={x.item}
                                                    isCheckOut />
                                            )
                                        }
                                    }} /><SmallText text={`+${[...getOrderItem(item.id)].length - 2} more products`} style={HTstyles.moreProductText} /></>
                                :
                                <FlatList
                                    data={[...getOrderItem(item.id)]}
                                    renderItem={(x) => (
                                        <ProductList item={x.item}
                                            isCheckOut />

                                    )}
                                />
                            }
                        </View>

                        <View style={[cartStyles.addressContainer, HTstyles.orderFooter]}>
                            
                            <SmallText text='Total Payment' style={{ marginLeft: 5 }} />
                            <View style={{ alignItems: 'flex-end', width: '70%' }}>
                                <SmallText text={`$ ${(item.totalPrice + item.deliveryFee + item.serviceFee).toFixed(2) }`} style={{ fontWeight: 'bold', alignItems: 'flex-end' }} />
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

export default HistoryTransactionScreen