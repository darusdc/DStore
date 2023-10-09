import { View, FlatList } from 'react-native'
import React, { useCallback, useState } from 'react'
import Header from '../../components/Header/header'
import { realm } from '../../store/realm'
import ProductComp from '../../components/Product/Product'
import { Product } from '../../store/realm/models/Product'
import EmptyList from '../../components/EmptyList/EmptyList'
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native'

const SearchScreen = () => {
  const route : RouteProp<{ params: { searchKeyword: string } }>  = useRoute()
  const searchKeyword = route?.params?.searchKeyword
  const productDB = realm.objects<Product>('Product')
  const [products, setProducts] = useState([...productDB])

  const onChangeText = (searchKeyword :string) => { 
    const data = productDB.filtered(`name CONTAINS[c] "${searchKeyword}"`)

    setProducts([...data])
   }

  useFocusEffect(useCallback(() => {
    console.log(searchKeyword)
    if (searchKeyword !== '' && searchKeyword !== undefined) {
      onChangeText(searchKeyword)
    }
  }, [searchKeyword]))
  return (
    <View style={{flex: 1}}>
        <Header
          isSearchBarShow
          title='all Pro'
          onChangeText={onChangeText}
        />
      <View style={{flex: 1}}>
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
          )
          }
        />
      </View>
    </View>
  )
}

export default SearchScreen