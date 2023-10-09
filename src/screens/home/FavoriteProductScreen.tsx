import { View, Text, FlatList } from 'react-native'
import React, { useCallback, useState } from 'react'
import Header from '../../components/Header/header'
import { useSelector } from 'react-redux'
import { RootState } from '../../../App'
import { realm } from '../../store/realm'
import { FavoriteProduct } from '../../store/realm/models/FavoriteProduct'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import EmptyList from '../../components/EmptyList/EmptyList'
import { StackNavigation } from '../../navigation/MainNavigation'
import ProductComp from '../../components/Product/Product'
import { Product } from '../../store/realm/models/Product'

const FavoriteProductScreen = () => {
    const userLoginId = useSelector<RootState>((store) => store.userLoginIdReducer.userLoginId)
    const navigation = useNavigation<StackNavigation>()
    const [favoriteProducts, setFavoriteProduct] = useState(realm.objects<FavoriteProduct>('FavoriteProduct').filtered(`idUser == ${userLoginId}`)[0]?.idProducts)

    const refreshProduct = () => {
        const data = realm.objects<FavoriteProduct>('FavoriteProduct').filtered(`idUser == ${userLoginId}`)[0]?.idProducts
        console.log(data)
        setFavoriteProduct(data)
    }

    const product = (productId: number) => {
        const data = realm.objects<Product>('Product').filtered(`id == ${productId}`)[0]
        console.log(data)
        return realm.objects<Product>('Product').filtered(`id == ${productId}`)[0]
    }

    useFocusEffect(useCallback(() => {
        refreshProduct()
    }, []))
    return (
        <View style={{ flex: 1 }}>
            <Header
                isStackScreen
                title='Favorite'
            />
            <View style={{ flex: 1}}>

                <FlatList
                numColumns={2}
                    data={[...favoriteProducts]}
                    ListEmptyComponent={
                        <EmptyList
                            heading='No favorite items yet'
                            desc='When add items to favorite, the item will appear on the favorite list'
                            buttonCaption='Find Products'
                            imageSource={require('../../assets/images/folder-favorite.png')}
                            onPress={() => { navigation.navigate('HomeTab') }}
                        />
                    }
                    renderItem={({ item }) => (
                        <ProductComp item={product(item)} />
                    )}
                />
            </View>
        </View>
    )
}

export default FavoriteProductScreen