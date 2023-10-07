import { View, Text, FlatList } from 'react-native'
import React, { useCallback, useState } from 'react'
import Header from '../../components/Header/header'
import { realm } from '../../store/realm'
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native'
import { headerStyle } from '../../components/Header/headerStyle'
import { SearchBar } from '@rneui/themed'
import ProductComp from '../../components/Product/Product'


const BrandScreen = () => {
    const route : RouteProp<{params: {brandId :number, title: string}}> = useRoute()
    const { brandId, title } = route.params
    const [products, setProducts] = useState([])

    const collectData = () => {
        const productDB = realm.objects('Product').filtered(`idBrand == ${brandId}`)
        setProducts([...productDB])
        const maxIndex = productDB.length
        console.log(maxIndex)
    }

    useFocusEffect(useCallback(
        () => {
            collectData()
        }, []
    ))
    return (
        <View>
            <Header
                isStackScreen
                title={title}
            />
            <SearchBar placeholder='Search item here..'
                inputContainerStyle={headerStyle.searchBarInnerContainer}
                containerStyle={headerStyle.searchBarContainerStyle}
            />
            <View>
                <FlatList
                    numColumns={2}
                    data={products}
                    renderItem={({ item }) => (

                        <ProductComp item={item} />
                    )
                    }
                />
            </View>
        </View>
    )
}

export default BrandScreen