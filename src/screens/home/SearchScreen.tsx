import { View, FlatList } from 'react-native'
import React, { useCallback, useState } from 'react'
import Header from '../../components/Header/header'
import { realm } from '../../store/realm'
import ProductComp from '../../components/Product/Product'
import { Product } from '../../store/realm/models/Product'
import EmptyList from '../../components/EmptyList/EmptyList'
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { StackNavigation } from '../../navigation/MainNavigation'

const SearchScreen = () => {
  const navigation = useNavigation<StackNavigation>()
  const route : RouteProp<{ params: { searchKeyword: string, type: string } }>  = useRoute()
  const searchKeyword = route?.params?.searchKeyword
  const type = route?.params?.type
  const productDB = realm.objects<Product>('Product')
  const [products, setProducts] = useState([...productDB])

  const onChangeText = (searchKeyword :string) => { 
    const data = productDB.filtered(`name CONTAINS[c] "${searchKeyword}"`)

    setProducts([...data])
   }

  useFocusEffect(useCallback(() => {
      onChangeText(searchKeyword || '')
  }, [searchKeyword, type]))

  useFocusEffect(useCallback(() => {
    console.log(searchKeyword)
}, [searchKeyword]))
  return (
    <View style={{flex: 1}}>
        <Header
          isSearchBarShow
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
            onPress={() => {onChangeText('')
            navigation.setParams({searchKeyword : ''})
          }}
            />
          }
          pagingEnabled
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