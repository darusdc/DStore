import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { homeScreenStyles } from './HomeScreenStyle'
import Header from '../../components/Header/header'
import { realm } from '../../store/realm'
import ProductComp from '../../components/Product/Product'

const SearchScreen = () => {
  const [products, setProducts] = useState([])

  const collectData = () => {
    const productDB = realm.objects('Product')
    const maxIndex = productDB.length
    setProducts(productDB.slice(0, maxIndex))
  }

  useEffect(() => {
    collectData()
  }, [])
  return (
    <View>
        <Header
          isSearchBarShow
          title='all Pro'
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

export default SearchScreen