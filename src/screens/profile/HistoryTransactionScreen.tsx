import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import Header from '../../components/Header/header'
import { LargeText, SmallText } from '../../components/Text'
import Colors from '../../constants/Colors'
import Button from '../../components/Button/button'
import { WelcomeScreenStyle } from '../onboarding/WelcomeScreenStyle'
import { useNavigation } from '@react-navigation/native'
import { StackNavigation } from '../../navigation/MainNavigation'
import EmptyList from '../../components/EmptyList/EmptyList'

const HistoryTransactionScreen = () => {
    const navigation = useNavigation<StackNavigation>()
    return (
        <View>
            <Header
                title='History Transaction'
                isStackScreen
            />
            <FlatList
                data={[]}
                ListEmptyComponent={
                    <EmptyList
                        imageSource={require('../../assets/images/bag.png')}
                        heading='No orders yet'
                        desc='When you buy an item, your order about it will appear here.'
                        buttonCaption='Shop Now'
                        onPress={() => { navigation.navigate('HomeTab', { screen: 'Search'}) }}
                    />
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