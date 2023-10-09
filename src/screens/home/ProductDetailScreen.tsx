import { View, ImageBackground, ScrollView, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import Button from '../../components/Button/button'
import Colors from '../../constants/Colors'
import productDetailScreenStyles from './ProductDetailScreenStyle'
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { realm } from '../../store/realm'
import { Product } from '../../store/realm/models/Product'
import { LargeText, MediumText, SmallText } from '../../components/Text'
import { Brand } from '../../store/realm/models/Brand'
import { Icon, Image } from '@rneui/themed'
import { Category } from '../../store/realm/models/Category'
import { WelcomeScreenStyle } from '../onboarding/WelcomeScreenStyle'
import { InternalStorage, RamCapacity } from '../../store/realm/models/Size'
import { Shipping } from '../../store/realm/models/Shipping'
import { FavoriteProduct } from '../../store/realm/models/FavoriteProduct'
import { useSelector } from 'react-redux'
import { RootState } from '../../../App'
import { Rating } from 'react-native-ratings'
import { StackNavigation } from '../../navigation/MainNavigation'
import { Portal } from 'react-native-portalize/lib/Portal'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Modalize } from 'react-native-modalize'
import { Host } from 'react-native-portalize'
import { RatingData } from '../../store/realm/models/Rating'
import { Cart } from '../../store/realm/models/Cart'

const ProductDetailScreen = () => {
  const navigation = useNavigation<StackNavigation>()
  const route: RouteProp<{ params: { productId: number } }> = useRoute()
  const { productId } = route.params
  const userLoginId = useSelector<RootState>((store) => store.userLoginIdReducer.userLoginId)
  const product = realm.objects<Product>('Product').filtered(`id == ${productId}`)[0]
  const brand = realm.objects<Brand>('Brand').filtered(`id == ${product.idBrand}`)[0]
  const category = realm.objects<Category>('Category').filtered(`id == ${product.idCategory}`)[0]
  const [internalStorage, setInternalStorage] = useState(realm.objects<InternalStorage>("InternalStorage"))
  const [ramCapacity, setRamCapacity] = useState(realm.objects<RamCapacity>('RamCapacity'))
  const shipping = realm.objects<Shipping>('Shipping')
  const favoriteProducts = realm.objects<FavoriteProduct>('FavoriteProduct').filtered(`idUser == ${userLoginId}`)
  const [isFavoriteProduct, setIsFavoriteProduct] = useState(favoriteProducts[0]?.idProducts.has(productId))
  const [showItemOption, setShowItemOption] = useState(false)
  const showItemRef = useRef<Modalize>()
  const ratingData = realm.objects<RatingData>('RatingData').filtered(`idBrand == ${product.idBrand}`)[0]
  const ratingRate = (ratingData?.rating / ratingData?.ratingDetail.length) | 0
  const [addCartSuccess, setaddCartSuccess] = useState(false)
  const showAddCartSuccessRef = useRef<Modalize>()

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
      if (index != internalStorage.length - 1) {
        if (product.idCategory == 2 && index > 3) {
          return `${item.size}, `
        } else {
          if (product.idCategory != 2) {
            return `${item.size}, `

          }
          return null
        }
      } else {
        return `${item.size}.`
      }
    }),
    'RAM Capacity': ramCapacity.map((item, index) => {
      const maxIndex = product.idCategory != 2 ? 2 : ramCapacity.length
      if (index < maxIndex) {
        if (index < maxIndex - 1) {
          return `${item.size}, `
        } else {
          return `${item.size}.`
        }
      }
    }),
    'Shipping': shipping[0].deliveryFee,
    '': ''
  }

  const accesoryDetailData = [
    'Category',
    'Shipping',
    ''
  ]

  const resetSelected = () => {
    ['internal', 'ram'].forEach((item: 'internal' | 'ram') => {
      const filteredData = filterSize(item)
      realm.write(() => {
        filteredData.forEach((item) => {
          item.isSelected = false
        })
        filteredData[0].isSelected = true
      })
    })
  }
  const filterSize = (type: 'internal' | 'ram') => {
    if (type === 'internal') {
      const filteredData = internalStorage.filter((item, index) => {
        if (index != internalStorage.length - 1) {
          if (product.idCategory == 2 && index > 3) {
            return item
          } else {
            if (product.idCategory != 2) {
              return item
            }
          }
        } else {
          return item
        }
      })
      return filteredData
    } else {
      const filteredData = ramCapacity.filter((item, index) => {
        const maxIndex = product.idCategory != 2 ? 2 : ramCapacity.length
        if (index < maxIndex) {
          if (index < maxIndex - 1) {
            return item
          } else {
            return item
          }
        }
      })
      return filteredData
    }
  }

  const onClickAddCart = () => {
    if (product.idCategory != 4) {
      const internalStorageId = filterSize('internal').filter((item) => {
        if (item.isSelected === true) { return item }
      })
      [0].id
      const ramCapacityId = filterSize('internal').filter((item) => {
        if (item.isSelected === true) { return item }
      })
      [0].id
      const cart = realm.objects<Cart>('Cart')
      const existingData = cart.filtered(`
      idUser == ${userLoginId} AND
      idProduct == ${product.id} AND
      idInternalStorage == ${internalStorageId} AND
      idRamCapacity == ${ramCapacityId}`)[0]

      if (existingData) {
        realm.write(() => {
          existingData.quantity++
        })
      showAddCartSuccessRef.current?.open()
      } else {
        realm.write(() => {
          realm.create("Cart", {
            id: cart.length + 1,
            idUser: userLoginId,
            idProduct: product.id,
            idInternalStorage: internalStorageId,
            idRamCapacity: ramCapacityId,
            quantity: 1,
            isSelected: false
          })
        })
        showAddCartSuccessRef.current?.open()
      }

    } else {
      const cart = realm.objects<Cart>('Cart')
      const existingData = cart.filtered(`
      idUser == ${userLoginId} AND
      idProduct == ${product.id}`)[0]

      if (existingData) {
        realm.write(() => {
          existingData.quantity++
        })
        showAddCartSuccessRef.current?.open()
      } else {
        realm.write(() => {
          realm.create("Cart", {
            id: cart.length + 1,
            idUser: userLoginId,
            idProduct: product.id,
            quantity: 1,
            isSelected: false
          })
        })
        showAddCartSuccessRef.current?.open()
      }
    }
  }

 
  const onClickHeart = () => {
    if (userLoginId) {
      const favoriteList = favoriteProducts[0]
      if (favoriteList) {
        realm.write(() => {
          if (favoriteList.idProducts.has(productId)) {
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
          realm.create('FavoriteProduct', {
            id: favoriteProducts.length + 1,
            idUser: userLoginId,
            idProducts: [productId]
          })
          product.likeNumber++
          product.isLike = true
        })
      }
      setIsFavoriteProduct(product.isLike)
    } else {
      navigation.navigate('Login')
    }
  }
  type sizeArg = {
    type: 'internal' | 'ram'
    id: number
  }
  const onClickSize = (props: sizeArg) => {
    const { type, id } = props

    if (type === 'internal') {
      realm.write(() => {
        internalStorage.forEach((item) => {
          item.isSelected = id === item.id
        })
      })
      setInternalStorage(realm.objects<InternalStorage>("InternalStorage"))
    } else {
      realm.write(() => {
        ramCapacity.forEach((item) => {
          item.isSelected = id === item.id
        })
      })
      setRamCapacity(realm.objects<RamCapacity>("RamCapacity"))
    }
  }
  // useEffect(() => {

  // }, [])
  useFocusEffect(useCallback(() => {
    resetSelected()
  }, []))
  
  return (
    <Host>


      <View style={{ flex: 1 }}>
        <ImageBackground style={{ height: 300 }}
          source={{ uri: product.images[0].link }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>

            <Button iconName='arrow-left' iconColor={Colors.BLACK}
              type='feather'
              containerStyle={productDetailScreenStyles.backButton}
              iconStyle={productDetailScreenStyles.iconRound}
              onPress={() => { navigation.goBack() }}
            />
            <Button iconName={isFavoriteProduct ? 'heart' : 'heart-outlined'}
              iconColor={isFavoriteProduct ? 'red' : Colors.BLACK}
              type='entypo'
              containerStyle={productDetailScreenStyles.loveButton}
              iconStyle={productDetailScreenStyles.iconRound}
              onPress={() => onClickHeart()}
            />
          </View>
        </ImageBackground>
        <ScrollView>
          <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
            <View style={{ marginHorizontal: 10 }}>
              <Image source={{ uri: brand?.logo }}
                style={{ borderRadius: 100, width: 40, height: 40, resizeMode: 'contain', marginTop: 10 }} />
            </View>
            <View style={{ flexDirection: 'column' }}>
              <View style={{ marginTop: 10 }}>
                <SmallText text={brand?.brandName} style={{ verticalAlign: 'bottom' }} />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -15 }}>
                <Rating
                  imageSize={16}
                  startingValue={ratingRate}
                  readonly
                  ratingColor={Colors.STAR} />
                <SmallText text={`(${ratingData?.ratingDetail.length > 999 ? '999+' : ratingData?.ratingDetail.length.toString() || 0})`} style={{ paddingLeft: 10 }} />
              </View>

            </View>

          </View>
          <View style={{ paddingHorizontal: 10 }}>
            <LargeText text={`$ ${product.price.toString()}`} style={{ marginBottom: -5 }} />
            <MediumText text={product.name} style={{ marginBottom: -5 }} />
            <View style={{ flexDirection: 'row' }}>
              <SmallText text={category.techCategory} style={{ color: Colors.GRAY }} />
              <Icon name='circle' type='fontawesome' size={5} color={Colors.GRAY} style={{ marginTop: 15, marginHorizontal: 10 }} />
              {product.idCategory != 4 ?
                <SmallText text={`${filterSize('ram')[0].size}/${filterSize('internal')[0].size}`} style={{ color: Colors.GRAY }} />
                : <SmallText text={`Liked by ${product.likeNumber > 999 ? '999+' : product.likeNumber}`} style={{ color: Colors.GRAY }} />
              }
            </View>
            <View style={{ alignItems: 'center' }}>
              <Button text='Buy Now'
                containerStyle={[WelcomeScreenStyle.primaryButtonContainer]}
                textStyle={WelcomeScreenStyle.primaryTextButton}
              />
              <Button text='Add to Cart'
                containerStyle={[WelcomeScreenStyle.secondaryButtonContainer]}
                textStyle={WelcomeScreenStyle.secondaryTextButton}
                onPress={() => { product.idCategory!=4 ? showItemRef.current?.open() : onClickAddCart() }}
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
                    borderTopWidth: 0.2,
                    borderColor: Colors.GRAY,
                    marginVertical: 4,
                    alignItems: 'center',
                    paddingVertical: 10
                  }}>
                    <SmallText text={item} style={{ flex: 1, alignItems: 'flex-start', marginHorizontal: 10 }} />
                    <SmallText text={contentProductDetail[item]} style={{ flex: 1, marginHorizontal: 10, textAlign: 'right', color: Colors.GRAY_TEXT }} />
                  </View>
                )
              }
            />
          </View>
        </ScrollView>

        <Portal>
          <GestureHandlerRootView style={{ flex: showItemOption ? 1 : 0 }}>
            <Modalize
              ref={showItemRef}
              onOpen={() => setShowItemOption(true)}
              onClose={() => setShowItemOption(false)}
              adjustToContentHeight
            >
              <View style={{
                flex: 1,
                padding: 16,
                alignItems: 'center'
              }}>
                <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.DIVIDER, width: Dimensions.get('window').width, alignItems: 'center' }}>
                  <LargeText text='Select your device specification' />
                </View>

                <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.DIVIDER, alignItems: 'flex-start' }}>
                  <LargeText text='Internal Storage:' />
                </View>

                <FlatList
                  horizontal
                  data={filterSize('internal')}
                  ListHeaderComponentStyle={{}}
                  renderItem={({ item }) => (

                    <View style={{ margin: 10 }}>
                      <TouchableOpacity style={{ backgroundColor: item.isSelected ? Colors.PRIMARY : null, borderRadius: 100 }}
                        onPress={() => onClickSize({ type: 'internal', id: item.id })}
                      >
                        <MediumText text={item.size} />
                      </TouchableOpacity>
                    </View>
                  )}
                />

                <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.DIVIDER, alignItems: 'flex-start' }}>
                  <LargeText text='RAM Capacity:' />
                </View>

                <FlatList
                  horizontal
                  data={filterSize('ram')}
                  ListHeaderComponentStyle={{}}
                  renderItem={({ item }) => (

                    <View style={{ margin: 10 }}>
                      <TouchableOpacity style={{ backgroundColor: item.isSelected ? Colors.PRIMARY : null, borderRadius: 100 }}
                        onPress={() => onClickSize({ type: 'ram', id: item.id })}
                      >
                        <MediumText text={item.size} />
                      </TouchableOpacity>
                    </View>
                  )}
                />
                <View style={{ flexDirection: 'row' }}>
                  <LargeText text='Current price: $' />
                  <LargeText text={`${(product.price *
                    filterSize('internal').filter((item) => {
                      if (item.isSelected === true) { return item }
                    })
                    [0]?.priceMultiplier *
                    filterSize('ram').filter((item) => {
                      if (item.isSelected === true) { return item }
                    })
                    [0]?.priceMultiplier).toFixed(2)}`} />
                </View>
                <Button text='Add to cart!'
                  containerStyle={WelcomeScreenStyle.primaryButtonContainer}
                  textStyle={WelcomeScreenStyle.primaryTextButton}
                  onPress={() => onClickAddCart()}
                />
                <Button text='Cancel'
                  containerStyle={WelcomeScreenStyle.secondaryButtonContainer}
                  textStyle={WelcomeScreenStyle.secondaryTextButton}
                  onPress={() => { showItemRef.current?.close() }}
                />
              </View>

            </Modalize>
          </GestureHandlerRootView>
        </Portal>

        <Portal>
          <GestureHandlerRootView style={{ flex: addCartSuccess ? 1 : 0 }}>
            <Modalize
              ref={showAddCartSuccessRef}
              onOpen={() => setaddCartSuccess(true)}
              onClose={() => setaddCartSuccess(false)}
              adjustToContentHeight
            >
              <View style={{margin: 5}}>
              <Button iconName='close'
                  containerStyle={{alignItems:'flex-start', alignContent:'center', marginBottom:-50, paddingLeft:5, paddingTop:5}}
                  onPress={() => { showAddCartSuccessRef.current?.close() }}
                />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginHorizontal: 10 }}>
                  <Image source={{ uri: product.images[0].link }}
                    style={{ borderRadius: 100, width: 64, height: 64, resizeMode: 'contain', marginTop: 10 }} />
                </View>
                <View style={{paddingHorizontal:10}}>
                  <View style={{}}>
                    <MediumText text='Item added to cart' style={{ verticalAlign: 'bottom', fontWeight: 'bold' }} />
                    <SmallText text={product.name} style={{ verticalAlign: 'bottom', marginTop:-5}} />
                  </View>
                </View>
              </View>
                <Button text='View Cart'
                  containerStyle={WelcomeScreenStyle.secondaryButtonContainer}
                  textStyle={WelcomeScreenStyle.secondaryTextButton}
                  onPress={() => { navigation.navigate('HomeTab') }}
                />
              </View>
            </Modalize>
          </GestureHandlerRootView>
        </Portal>
      </View>
    </Host>
  )
}

export default ProductDetailScreen