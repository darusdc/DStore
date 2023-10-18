import { View, Text, FlatList } from 'react-native'
import React, { useCallback, useState } from 'react'
import Header from '../../components/Header/header'
import { realm } from '../../store/realm'
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native'
import { headerStyle } from '../../components/Header/headerStyle'
import { SearchBar } from '@rneui/themed'
import ProductComp from '../../components/Product/Product'
import { Product } from '../../store/realm/models/Product'
import EmptyList from '../../components/EmptyList/EmptyList'


const BrandScreen = () => {
    const route: RouteProp<{ params: { brandId: number, title: string } }> = useRoute()
    const { brandId, title } = route.params
    const productDB = realm.objects<Product>('Product').filtered(`idBrand == ${brandId}`)
    const [products, setProducts] = useState([...productDB])
    const [searchKeyword, setSearchKeyword] = useState('')
   
    const onChangeText = (searchKeyword: string) => {
        const data = productDB.filtered(`name CONTAINS[c] "${searchKeyword}"`)
        setSearchKeyword(searchKeyword)
        setProducts([...data])
    }

    return (
        <View style={{ flex: 1 }}>
            <Header
                isStackScreen
                title={title}
            />
            <SearchBar placeholder='Search item here..'
                inputContainerStyle={headerStyle.searchBarInnerContainer}
                containerStyle={headerStyle.searchBarContainerStyle}
                onChangeText={onChangeText}
                value={searchKeyword}
            />
            <View style={{ flex: 1}}>
                <FlatList
                    numColumns={2}
                    data={products}
                    ListEmptyComponent={
                        <EmptyList
                            heading='Product not found'
                            desc='We cannot find what you looking for, try to use other keyword or reset keyword'
                            buttonCaption='Reset Keyword'
                            imageSource={require('../../assets/images/bag-cross.png')}
                        />
                    }
                    renderItem={({ item }) => (
                        <ProductComp item={item} />
                    )}
                />
            </View>
        </View>
    )
}

export default BrandScreen