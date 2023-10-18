import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useCallback, useState } from "react";
import { homeScreenStyles } from "../../screens/home/HomeScreenStyle";
import { MediumText, SmallText } from "../Text";
import Colors from "../../constants/Colors";
import Button from "../Button/button";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../navigation/MainNavigation";
import { realm } from "../../store/realm";
import { Category } from "../../store/realm/models/Category";
import { FavoriteProduct } from "../../store/realm/models/FavoriteProduct";
import { useSelector } from "react-redux";
import { RootState } from "../../../App";
import { Product, ProductImage } from "../../store/realm/models/Product";
import productStyles from "./ProductStyle";
import { generateId } from "../../utils/GenerateId";

type itemData = {
  id: number
  idCategory: number
  idBrand: number
  name: string
  price: number
  images: Realm.List<ProductImage>
  description: string; isLike: boolean; likeNumbers?: number
}

const ProductComp = ({ item }: { item: itemData }) => {
  const navigation = useNavigation<StackNavigation>()
  const userLoginId = useSelector<RootState>((store) => store.userLoginIdReducer.userLoginId)
  const category = realm.objects<Category>('Category').filtered(`id == ${item.idCategory}`)
  const [favoriteProducts, setFavoriteProducts] = useState(realm.objects<FavoriteProduct>('FavoriteProduct').filtered(`idUser == ${userLoginId}`))
  const [product, setProduct] = useState(realm.objects<Product>('Product').filtered(`id == ${item.id}`)[0])
  const [likeNumber, setLikeNumber] = useState(product.likeNumber)
  const onPress = (id: number) => {
    navigation.navigate('ProductDetail', { productId: id })
  }
  const refreshData = () => {
    const favoriteProducts = realm.objects<FavoriteProduct>('FavoriteProduct').filtered(`idUser == ${userLoginId}`)
    const product = realm.objects<Product>('Product').filtered(`id == ${item.id}`)[0]

    realm.write(()=>{
      product.isLike = favoriteProducts[0]?.idProducts.has(item.id) || false
    })

    setProduct(product)
    setFavoriteProducts(favoriteProducts)
    setLikeNumber(product.likeNumber)
  }

  const onPressHeart = (productId: number) => {
    
    if (userLoginId) {
      const favoriteList = favoriteProducts[0]
      if (favoriteList){
        realm.write(()=> {
          if (favoriteList.idProducts.has(productId)){
            favoriteList.idProducts.delete(productId)
            product.likeNumber--
            product.isLike = false
          } else {
            favoriteList.idProducts.add(productId)
            product.likeNumber++
            product.isLike = true
          }  
        })
      } else {
        realm.write(() => {
          realm.create('FavoriteProduct',{
            id: generateId('FavoriteProduct'),
            idUser: userLoginId,
            idProducts: [productId]
          })
          product.likeNumber++
          product.isLike = true
        })
      }
      refreshData()
    } else {
      navigation.navigate('Login')
    }
  }
  useFocusEffect(useCallback(() => {
    refreshData()
  }, []))
return (
  <TouchableOpacity style={[homeScreenStyles.weeklyProductContainer,{flex: 0}]} onPress={() => { onPress(item.id) }}>
    <Image
      style={homeScreenStyles.flatListItem}
      source={{ uri: item.images[0].link }}
    />
    <View
      style={[
        homeScreenStyles.containerRowSpaceBetween,
        { alignItems: "center", flex: 1 },
      ]}
    >
      <View style={{ flex: 1 }}>
        <MediumText
          text={`$ ${item.price.toString()}`}
          style={homeScreenStyles.itemPriceText}
        />
      </View>
    </View>
    <View style={{ flex: 1, flexDirection: "column" }}>
      <SmallText text={item.name} style={productStyles.textName} />
      <View
        style={[
          homeScreenStyles.containerRowSpaceBetween,
          { flex: 1, flexWrap: "wrap" },
        ]}
      >
        <SmallText
          text={category[0]?.techCategory}
          style={{ flex: 1, color: Colors.SECONDARY }}
        />
        <Button
          containerStyle={[homeScreenStyles.heartButton, { flex: 1 }]}
          iconName={product?.isLike ? 'heart' : 'heart-outlined'}
          type='entypo'
          iconSize={16}
          iconStyle={{ color: product?.isLike ? 'red' : 'black' }}
          onPress={() => onPressHeart(item.id)}
        />
        <SmallText text={likeNumber?.toString() || "0"} />
      </View>
    </View>
  </TouchableOpacity>
);
};

export default ProductComp;
