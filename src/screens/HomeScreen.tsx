import { FlatList, Image, ImageBackground, View } from 'react-native'
import React from 'react'
import Header from '../components/header'
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import { carouselData } from '../data/carouselDummyData'
import Colors from '../constants/Colors'
import { LargeText, MediumText, SmallText } from '../components/Text'
import { homeScreenStyles } from './HomeScreenStyle'
import { productData } from '../data/productDummyData'
import { ScrollView } from 'react-native'

const HomeScreen = () => {

    type itemData = {
        id: number
        idCategory: number
        idBrand: number
        name: string
        price: number
        images: { id: number; link: string; }[]
        description: string; isLike: boolean;
    }

    type itemBannerData = {
        thumbnail: string,
        tagline: string
    }

    const swiperFlatListRenderItem = ({ item }: { item: itemBannerData }) => (
        <View style={homeScreenStyles.container}>
            <ImageBackground
                style={homeScreenStyles.imageBackgroundStyle}
                source={{ uri: item.thumbnail }}
            >
                <LargeText text={item.tagline} style={{ color: Colors.SECONDARY, fontWeight: 'bold' }} />
            </ImageBackground>
        </View>
    )

    const flatListRenderItem = ({ item }: { item: itemData }) => (
        <View style={ homeScreenStyles.weeklyProductContainer } >
            <Image style={homeScreenStyles.flatListItem} source={{ uri: item.images[0].link }} />
            <MediumText text={item.name} />
            <SmallText text={`$ ${item.price.toString()}`} />
        </View>
    )
    return (
        <View style={{ }}>
            <Header title='Homepage' isShowLogo isShowRightIcon />
            <View style={homeScreenStyles.container}>
                <SwiperFlatList
                    data={carouselData}
                    autoplay
                    autoplayDelay={3}
                    autoplayLoop
                    showPagination
                    paginationStyle={homeScreenStyles.pagination}
                    paginationActiveColor={Colors.PRIMARY}
                    renderAll
                    renderItem={swiperFlatListRenderItem}
                />
            </View>
            <MediumText text="WEEKLY PRODUCT"/>
            <ScrollView style={{ marginHorizontal: 8}}>
                <FlatList
                    horizontal
                    data={productData.slice(0, 5)}
                    contentContainerStyle={{ padding: 0 }}
                    renderItem={flatListRenderItem}
                />
            </ScrollView>
        </View>
    )
}

export default HomeScreen