import { FlatList, Image, SafeAreaView, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Header from '../../components/Header/header'
import Colors from '../../constants/Colors'
import { LargeText, MediumText, SmallText } from '../../components/Text'
import { homeScreenStyles } from './HomeScreenStyle'
import { productData } from '../../data/productDummyData'
import { ScrollView } from 'react-native'
import Button from '../../components/Button/button'
import { brands } from '../../data/brandDummyData'
import { headerStyle } from '../../components/Header/headerStyle'
import { insertDummyData } from '../../utils/insertDummyData'
import { categoryData } from '../../data/categoryDummyData'
import { shippingData } from '../../data/shippingDummyData'
import { internalStorage, ramCapacity } from '../../data/sizeDummyData'
import { realm } from '../../store/realm'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { StackNavigation } from '../../navigation/MainNavigation'
import ProductComp from '../../components/Product/Product'
import { Product, ProductImage } from '../../store/realm/models/Product'
import { Brand } from '../../store/realm/models/Brand'

type itemData = {
    id: number
    idCategory: number
    idBrand: number
    name: string
    price: number
    images: Realm.List<ProductImage>
    description: string; isLike: boolean; likeNumbers?: number
}

type itemBannerData = {
    thumbnail: string,
    tagline: string
}

const HomeScreen = () => {
    const navigation = useNavigation<StackNavigation>()
    const Brands = realm.objects<Brand>('Brand')
    const [allProduct, setAllProduct] = useState(realm.objects<Product>('Product'))
    const [products, setProducts] = useState([])
    const collectData = () => {
        const products = allProduct
        const maxIndex = Math.random() * (products.length - 4)

        setProducts(products.slice(maxIndex - 4, maxIndex))
    }
    const swiperFlatListRenderItem = ({ item }: { item: itemBannerData }) => (
        <View style={homeScreenStyles.container}>
            <Image
                style={homeScreenStyles.imageBackgroundStyle}
                source={{ uri: item.thumbnail }}
            />
            <LargeText text={item.tagline} style={{ color: Colors.SECONDARY, fontWeight: 'bold' }} />
            {/* </Image> */}
        </View>
    )

    const flatListRenderItem = ({ item }: { item: itemData }) => (
        <ProductComp item={item} />
    )

    const refreshAllData = () => {
        const allProduct = realm.objects<Product>('Product')
        setAllProduct(allProduct)
    }

    useEffect(() => {
        insertDummyData('Brand', brands)
        insertDummyData('Category', categoryData)
        insertDummyData('Product', productData)
        insertDummyData('Shipping', shippingData)
        insertDummyData('InternalStorage', internalStorage)
        insertDummyData('RamCapacity', ramCapacity)
        collectData()
    }, [])

    useFocusEffect(useCallback(
        () => {
            refreshAllData()
        }, []
    ))
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title='Homepage'
                isShowRightIcon
                isSearchBarShow
                rightIcon='heart'
                onRightIconClick={() => { navigation.navigate('FavoriteProduct') }}
                onSubmitEditing={(e) => {
                    navigation.navigate('Search',
                        { searchKeyword: e.nativeEvent.text })
                }}
            />
            <ScrollView showsVerticalScrollIndicator>
                <View style={{ ...homeScreenStyles.container }}>
                    <View style={homeScreenStyles.containerRowSpaceBetween}>
                        <View style={{ flex: 1, marginHorizontal: 10 }}>
                            <MediumText text='Popular Item' style={homeScreenStyles.headerText} />
                        </View>
                        <Button
                            containerStyle={{ flex: 1, alignItems: 'flex-end' }}
                            text='Show All'
                            textStyle={homeScreenStyles.showAllText}
                            onPress={() => { navigation.navigate('Search', {searchKeyword:''}) }}
                        />
                    </View>
                    <View style={homeScreenStyles.weeklyProductContainer}>
                        <FlatList
                            horizontal
                            data={products}
                            renderItem={flatListRenderItem}
                        />
                        <MediumText text='Shop by Brand' style={[homeScreenStyles.headerText, {marginHorizontal: 10}]} />
                    </View>
                    <FlatList
                        data={Brands}
                        numColumns={3}
                        scrollEnabled={false}
                        contentContainerStyle={{ alignContent: 'space-around' }}
                        renderItem={({ item }) => (
                            <Button onPress={() => { navigation.navigate('Brand', { brandId: item.id, title: item.brandName }) }}
                                text={item.brandName}
                                containerStyle={{ ...headerStyle.button, ...headerStyle.rightButton, margin: 8, borderRadius: 5 }}
                                textStyle={{ fontFamily: 'Inter_500Medium', color: Colors.SECONDARY, paddingHorizontal: 10 }} />)}
                    />

                    <View
                        style={homeScreenStyles.weeklyProductContainer}
                    >
                        <View style={homeScreenStyles.containerRowSpaceBetween}>
                            <MediumText text="New Product" style={[homeScreenStyles.headerText, {marginHorizontal: 10}]} />
                            <Button
                                containerStyle={{ flex: 1, alignItems: 'flex-end' }}
                                text='Show All'
                                textStyle={homeScreenStyles.showAllText}
                                onPress={() => { navigation.navigate('Search', {searchKeyword:''}) }} />
                        </View>
                        <FlatList
                            horizontal
                            data={[...allProduct].slice(Math.random() * 5, Math.random() * 40)}
                            contentContainerStyle={{ padding: 0 }}
                            renderItem={flatListRenderItem}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default HomeScreen