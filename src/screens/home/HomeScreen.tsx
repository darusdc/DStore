import { FlatList, Image, SafeAreaView, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import Product from '../../components/Product/Product'
import { useNavigation } from '@react-navigation/native'
import { StackNavigation } from '../../navigation/MainNavigation'

type itemData = {
    id: number
    idCategory: number
    idBrand: number
    name: string
    price: number
    images: { id: number; link: string; }[]
    description: string; isLike: boolean; likeNumbers?: number
}

type itemBannerData = {
    thumbnail: string,
    tagline: string
}

const HomeScreen = () => {
    const navigation = useNavigation<StackNavigation>()
    const [products, setProducts] = useState([])
    const collectData = () => {
        const products = realm.objects('Product')
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
        <Product item={item}/>
    )

    useEffect(() => {
        insertDummyData('Brand', brands)
        insertDummyData('Category', categoryData)
        insertDummyData('Product', productData)
        insertDummyData('Shipping', shippingData)
        insertDummyData('InternalStorage', internalStorage)
        insertDummyData('RamCapacity', ramCapacity)
        collectData()
    },[])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title='Homepage' isShowRightIcon isSearchBarShow rightIcon='heart' />
            <ScrollView showsVerticalScrollIndicator>
                <View style={{ ...homeScreenStyles.container }}>
                    <View style={homeScreenStyles.containerRowSpaceBetween}>
                        <View style={{ flex: 1 }}>
                            <MediumText text='Popular Item' style={{ fontFamily:'Inter_500Medium', marginLeft: 10, fontWeight: 'bold' }} />
                        </View>
                        <Button containerStyle={{ flex: 1, alignItems: 'flex-end' }} text='Show All' textStyle={{fontFamily:'Inter_500Medium', textDecorationLine: 'underline', color: 'blue', marginRight: 10 }} />
                    </View>
                    <View style={homeScreenStyles.weeklyProductContainer}>
                        <FlatList
                            horizontal
                            data={products}
                            renderItem={flatListRenderItem}
                        />
                        <MediumText text='Shop by Brand' style={{fontWeight:'bold', fontFamily:'Inter_500Medium'}}/>
                    </View>
                    <FlatList
                        data={brands}
                        numColumns={3}
                        scrollEnabled={false}
                        contentContainerStyle={{ alignContent: 'space-around' }}
                        renderItem={({ item }) => (
                            <Button onPress={() => { navigation.navigate('Brand', {brandId: item.id, title: item.brandName}) }}
                                text={item.brandName}
                                containerStyle={{ ...headerStyle.button, ...headerStyle.rightButton, margin: 8, borderRadius: 5 }}
                                textStyle={{fontFamily:'Inter_500Medium', color: Colors.SECONDARY, paddingHorizontal: 10 }} />)}
                    />

                    <View
                        style={homeScreenStyles.weeklyProductContainer}
                    >

                        <MediumText text="NEW PRODUCT" style={{fontFamily:'Inter_500Medium',fontWeight:'bold'}}/>
                        <FlatList
                            horizontal
                            data={productData.slice(Math.random()*5, Math.random()*40)}
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