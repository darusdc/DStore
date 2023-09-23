import { FlatList, Image, SafeAreaView, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Header from '../../components/Header/header'
import Colors from '../../constants/Colors'
import { LargeText, MediumText, SmallText } from '../../components/Text'
import { homeScreenStyles } from './HomeScreenStyle'
import { productData } from '../../data/productDummyData'
import { ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Button from '../../components/Button/button'
import { brands } from '../../data/brandDummyData'
import { headerStyle } from '../../components/Header/headerStyle'
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
            <Image
                style={homeScreenStyles.imageBackgroundStyle}
                source={{ uri: item.thumbnail }}
            />
            <LargeText text={item.tagline} style={{ color: Colors.SECONDARY, fontWeight: 'bold' }} />
            {/* </Image> */}
        </View>
    )

    const flatListRenderItem = ({ item }: { item: itemData }) => (
        <TouchableOpacity style={homeScreenStyles.weeklyProductContainer}>
            {/* <View  > */}
                <Image style={homeScreenStyles.flatListItem} source={{ uri: item.images[0].link }} />
                <View style={{ flexDirection: 'row', alignContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <MediumText text={`$ ${item.price.toString()}`} style={{ color: Colors.PRIMARY, fontWeight: 'bold', marginBottom: 0 }} />
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 20 }}>
                        <TouchableOpacity>
                            <Icon name='heart' size={16} />
                        </TouchableOpacity>
                    </View>
                </View>
                <SmallText text={item.name} style={{ color: Colors.SECONDARY }} />

            {/* </View> */}
        </TouchableOpacity>
    )
    return (
        <SafeAreaView style={{}}>
            <Header title='Homepage' isShowRightIcon isSearchBarShow rightIcon='heart' />
            <ScrollView>
            <View style={{ ...homeScreenStyles.container }}>
                <View style={{ flexDirection: 'row', alignContent: 'space-between' }}>
                    <View style={{ flex: 1 }}>

                        <MediumText text='Popular Item' style={{ marginLeft: 10 }} />
                    </View>
                    <Button containerStyle={{ flex: 1, alignItems: 'flex-end' }} text='Show All' textStyle={{ textDecorationLine: 'underline', color: 'blue', marginRight: 10 }} />
                    {/* <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <TouchableOpacity>
                        <MediumText text='Show All' style={{ textDecorationLine: 'underline', color: 'blue', marginRight: 10 }} />
                    </TouchableOpacity>
                </View> */}
                </View>
                <View style={homeScreenStyles.secondContainer}>
                    <FlatList
                        horizontal
                        data={productData.slice(0, 5)}
                        renderItem={flatListRenderItem}
                    />
                    <MediumText text='Shop by Brand' />
                </View>
                <FlatList
                    data={brands}
                    numColumns={3}
                    scrollEnabled={false}
                    contentContainerStyle={{ alignContent: 'space-around' }}
                    renderItem={({ item }) => (
                        <Button onPress={() => { console.log(item.brandName) }}
                            text={item.brandName}
                            containerStyle={{ ...headerStyle.button, ...headerStyle.rightButton, margin: 8, borderRadius: 5 }}
                            textStyle={{ color: Colors.SECONDARY, paddingHorizontal: 10 }} />)}
                />

                <View >

                <MediumText text="WEEKLY PRODUCT" />
                <FlatList
                    horizontal
                    data={productData.slice(0, 5)}
                    contentContainerStyle={{ padding: 0 }}
                    renderItem={flatListRenderItem}
                    />
                    </View>
                    <MediumText text='Halo'/>
            </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default HomeScreen