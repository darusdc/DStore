import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { homeScreenStyles } from "../../screens/home/HomeScreenStyle";
import { MediumText, SmallText } from "../Text";
import Colors from "../../constants/Colors";
import Button from "../Button/button";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../navigation/MainNavigation";
import { realm } from "../../store/realm";
import { Category } from "../../store/realm/models/Category";
type itemData = {
  id: number
  idCategory: number
  idBrand: number
  name: string
  price: number
  images: { id: number; link: string; }[]
  description: string; isLike: boolean; likeNumbers?: number
}

const Product = ({item} : {item : itemData}) => {
  const navigation = useNavigation<StackNavigation>()
  const category = realm.objects<Category>('Category').filtered(`id == ${item.idCategory}`)
  const onPress = (id : number) => {
    navigation.navigate('ProductDetail', {productId: id})
  }
  const onPressHeart = (id : number) => {

  }
  return (
    <TouchableOpacity style={homeScreenStyles.weeklyProductContainer} onPress={() => {onPress(item.id)}}>
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
            iconName="heart"
            iconSize={14}
            onPress={() => onPressHeart(item.id)}
          />
          <SmallText text={item.likeNumbers?.toString() || "0"} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Product;
