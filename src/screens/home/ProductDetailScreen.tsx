import { View, Text, ImageBackground, ScrollView, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Button from '../../components/Button/button'
import Colors from '../../constants/Colors'
import productDetailScreenStyles from './ProductDetailScreenStyle'
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { realm } from '../../store/realm'
import { Product } from '../../store/realm/models/Product'
import { LargeText, MediumText, SmallText } from '../../components/Text'
import { Brand } from '../../store/realm/models/Brand'
import { Icon, Image } from '@rneui/themed'
import StarRating from 'react-native-star-rating'
import { Category } from '../../store/realm/models/Category'
import { WelcomeScreenStyle } from '../onboarding/WelcomeScreenStyle'
import { SafeAreaView } from 'react-native-safe-area-context'
import { InternalStorage, RamCapacity } from '../../store/realm/models/Size'
import { Shipping } from '../../store/realm/models/Shipping'
import { FavoriteProduct } from '../../store/realm/models/FavoriteProduct'
import { useSelector } from 'react-redux'
import { RootState } from '../../../App'

const ProductDetailScreen = () => {
  const navigation = useNavigation()
  const route: RouteProp<{ params: { productId: number } }> = useRoute()
  const { productId } = route.params
  console.log(productId)
  const userLoginId = useSelector<RootState>((store) => store.userLoginIdReducer.userLoginId)
  const product = realm.objects<Product>('Product').filtered(`id == ${productId}`)[0]
  const brand = realm.objects<Brand>('Brand').filtered(`id == ${product.idBrand}`)[0]
  const category = realm.objects<Category>('Category').filtered(`id == ${product.idCategory}`)[0]
  const internalStorage = realm.objects<InternalStorage>("InternalStorage")
  const ramCapacity = realm.objects<RamCapacity>('RamCapacity')
  const shipping = realm.objects<Shipping>('Shipping')
  const FavoriteProduct = realm.objects<FavoriteProduct>('FavoriteProduct').filtered(`idUser == ${userLoginId}`)
  console.log(FavoriteProduct)
  const [isFavoriteProduct, setIsFavoriteProduct] = useState(false)

  const checkFavoriteProduct = () => {

  }
  const productDetailData = [
    'Category',
    'Internal Storage',
    'RAM Capacity',
    'Shipping',
    ''
  ]

  const contentProductDetail = {
    'Category': category.techCategory,
    'Internal Storage': internalStorage.map((item, index) => {
      if (index != internalStorage.length-1){
        if (product.idCategory==2 && index >3){
          return `${item.size}, `
        } else {
          if(product.idCategory!=2 ){
            return `${item.size}, `
            
          }
          return null
        }
      } else {
        return `${item.size}.`
      }
    }),
    'RAM Capacity': ramCapacity.map((item, index) => {
      const maxIndex = product.idCategory!= 2? 2 : ramCapacity.length
      if (index < maxIndex){
        if (index < maxIndex-1){
          return `${item.size}, `
        } else {
          return `${item.size}.`
        }
      }
    }),
    'Shipping': shipping[0].deliveryFee,
    '':''
  }

  const accesoryDetailData = [
    'Category',
    'Shipping',
    ''
  ]
  // const getProductData = (productId : number) => {
  //   const product = realm.objects<Product>('Product').filtered(`id == ${productId}`)[0]
  //   setProduct(product)
  //   console.log(product.images[0].link)
  // }

  useEffect(()=> {

  },[])
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground style={{ height: 300 }}
        source={{ uri: product.images[0].link }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>

          <Button iconName='arrow-left' iconColor={Colors.BLACK}
          type='feather'
            containerStyle={productDetailScreenStyles.backButton}
            iconStyle={productDetailScreenStyles.iconRound}
            onPress={()=> {navigation.goBack()}}
          />
          <Button iconName='heart' iconColor={Colors.BLACK}
          type='feather'
            containerStyle={productDetailScreenStyles.loveButton}
            iconStyle={productDetailScreenStyles.iconRound} />
        </View>
      </ImageBackground>
      <ScrollView>
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
          <View style={{ marginHorizontal: 10 }}>
            <Image source={{ uri: brand?.logo }} style={{ borderRadius: 100, width: 40, height: 40, resizeMode: 'contain' }} />
          </View>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ marginTop: 10 }}>
              <SmallText text={brand?.brandName} style={{ verticalAlign: 'bottom' }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -15 }}>
              <StarRating
                starSize={16}
                halfStartEnable
                rating={3.3}
                disable={true}
                fullStarColor={Colors.STAR} />
              <SmallText text='20' style={{ paddingLeft: 10 }} />
            </View>

          </View>

        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <LargeText text={`$ ${product.price.toString()}`} style={{ marginBottom: -5 }} />
          <MediumText text={product.name} style={{ marginBottom: -5 }} />
          <View style={{ flexDirection: 'row' }}>
            <SmallText text={category.techCategory} style={{ color: Colors.GRAY }} />
            <Icon name='circle' type='fontawesome' size={5} color={Colors.GRAY} style={{ marginTop: 15, marginHorizontal: 10 }} />
            <SmallText text='8/256' style={{ color: Colors.GRAY }} />
          </View>
          <View style={{ alignItems: 'center' }}>
            <Button text='Buy Now'
              containerStyle={[WelcomeScreenStyle.primaryButtonContainer]}
              textStyle={WelcomeScreenStyle.primaryTextButton}
            />
            <Button text='Add to Cart'
              containerStyle={[WelcomeScreenStyle.secondaryButtonContainer]}
              textStyle={WelcomeScreenStyle.secondaryTextButton}
            />
          </View>
        </View>
        <View style={{ backgroundColor: Colors.DIVIDER, height: 10, marginTop: 10 }}>
        </View>
        <View>
          <SmallText text='Item Description'
            style={{ color: Colors.BLACK_TEXT, fontWeight: 'bold', marginHorizontal: 10 }} />
          <SmallText text={product.description} style={{ marginHorizontal: 10 }} />

          <FlatList
           scrollEnabled={false}
            data={product.idCategory != 4 ? productDetailData : accesoryDetailData}
            renderItem={
              ({ item }) => (
                <View style={{ 
                  flexDirection: 'row', 
                  alignContent: 'space-around', 
                  borderTopWidth:0.2,
                  borderColor:Colors.GRAY,
                  marginVertical:4,
                  alignItems:'center',
                  paddingVertical:10
                  }}>
                  <SmallText text={item} style={{flex:1, alignItems:'flex-start', marginHorizontal:10}}/>
                  <SmallText text={contentProductDetail[item]} style={{flex:1, marginHorizontal:10, textAlign:'right', color:Colors.GRAY_TEXT}}/>
                </View>
              )
            }
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default ProductDetailScreen