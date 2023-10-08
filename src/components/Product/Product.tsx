import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { homeScreenStyles } from "../../screens/home/HomeScreenStyle";
import { MediumText, SmallText } from "../Text";
import Colors from "../../constants/Colors";
import Button from "../Button/button";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../navigation/MainNavigation";
import { realm } from "../../store/realm";
import { Category } from "../../store/realm/models/Category";
import { FavoriteProduct } from "../../store/realm/models/FavoriteProduct";
import { useSelector } from "react-redux";
import { RootState } from "../../../App";
import { Product } from "../../store/realm/models/Product";

type itemData = {
  id: number
  idCategory: number
  idBrand: number
  name: string
  price: number
  images: { id: number; link: string; }[]
  description: string; isLike: boolean; likeNumbers?: number
}

const ProductComp = ({ item }: { item: itemData }) => {
  const navigation = useNavigation<StackNavigation>()
  const userLoginId = useSelector<RootState>((store) => store.userLoginIdReducer.userLoginId)
  const category = realm.objects<Category>('Category').filtered(`id == ${item.idCategory}`)
  const favoriteProduct = realm.objects<FavoriteProduct>('FavoriteProduct').filtered(`idUser == ${userLoginId}`)
  const product = realm.objects<Product>('Product').filtered(`id == ${item.id}`)[0]
  const [like, setLike] = useState(product.isLike)
  const [likeNumbers, setLikeNumbers] = useState(product.likeNumber)
  const onPress = (id: number) => {
    navigation.navigate('ProductDetail', { productId: id })
  }
  const onPressHeart = (productId: number) => {
    if (userLoginId) {
      realm.write(()=> {
        product.isLike = !like
        if (!like){
          
            product.likeNumber++
        } else {
            product.likeNumber--
        }
      })
      const favoriteList = favoriteProduct[0]
      if (favoriteList){
        realm.write(()=> {
          if (favoriteList.idProducts.has(productId)){
            favoriteList.idProducts.delete(productId)
          } else {
            favoriteList.idProducts.add(productId)
          }  
        })
      } else {
        realm.write(() => {
          realm.create('FavoriteProduct',{
            id: favoriteProduct.length + 1,
            idUser: userLoginId,
            idProducts: [productId]
          })
        })
      }
      setLike(product.isLike)
      setLikeNumbers(product.likeNumber)
    } else {
      navigation.navigate('Login')
    }
  }
return (
  <TouchableOpacity style={homeScreenStyles.weeklyProductContainer} onPress={() => { onPress(item.id) }}>
    <Image
      style={homeScreenStyles.flatListItem}
      source={{ uri: item.images[0].link }}
    />
    <View
      style={[
        homeScreenStyles.containerRowSpaceBetween,
        { alignItems: "center" },
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
      <SmallText text={item.name} style={{ color: Colors.SECONDARY }} />
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
        <SmallText text={likeNumbers?.toString() || "0"} />
      </View>
    </View>
  </TouchableOpacity>
);
};

export default ProductComp;
