import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import Header from '../../components/Header/header'
import { LargeText, SmallText } from '../../components/Text'
import Colors from '../../constants/Colors'

const HistoryTransactionScreen = () => {
    return (
        <View>
            <Header
                title='History Transaction'
                isStackScreen
            />
            <FlatList
            data={[]} 
            ListEmptyComponent={
                <View style={{flex:1, alignItems:'center', marginVertical:200}}>
                    <Image 
                    source={require('../../assets/images/bag.png')}
                    style={{flex:1, width: 118, height: 118}}
                    />
                    <LargeText text='No orders yet' style={{fontSize: 24}}/>
                    <SmallText text='When you buy an item, your order about it will appear here.' style={{color: Colors.GRAY_TEXT}}/>
                </View>
            }
            renderItem={(item) => (
                <View>
                    
                </View>
            )}
            />
        </View>
    )
}

export default HistoryTransactionScreen