import { View, Image, ActivityIndicator, SafeAreaView, Text } from 'react-native'
import React from 'react'
import StaggeredList from '@mindinventory/react-native-stagger-view'
import { carouselData } from '../../data/carouselDummyData'
import { WelcomeScreenStyle } from './WelcomeScreenStyle'
import Button from '../../components/Button/button'
import { LargeText } from '../../components/Text'

const WelcomeScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, paddingTop: 30, marginHorizontal: 10 }}>
                {/* <View style={{ flexDirection: 'column', paddingHorizontal: 10 }}>
                    <Image source={{ uri: carouselData[0].thumbnail }} style={WelcomeScreenStyle.image} />
                    <Image source={{ uri: carouselData[0].thumbnail }} style={WelcomeScreenStyle.image} />
                    <Image source={{ uri: carouselData[0].thumbnail }} style={WelcomeScreenStyle.image} />
                </View> */}
                <View style={{ flex: 2, height: 200 }}>
                    <StaggeredList
                        animationType='SLIDE_DOWN'
                        scrollEnabled={false}
                        alwaysBounceHorizontal
                        data={carouselData}
                        centerContent
                        numColumns={3}

                        renderItem={({ item }) => (
                            <View>
                                <Image source={{ uri: item.thumbnail }} style={WelcomeScreenStyle.image}
                                />
                            </View>
                        )
                        }
                    />

                </View>

                <View style={{ flex: 1 , alignItems:'center'}}>
                    <LargeText text='Find your favorite electronic products' style={{ textAlign: 'center', fontSize:28 }} />
                    <Button text='Sign up to DStore' containerStyle={WelcomeScreenStyle.signUpButtonContainer} textStyle={WelcomeScreenStyle.whiteTextButton}/>
                    <Button text='I already have an account' containerStyle={WelcomeScreenStyle.accountButtonContainer} textStyle={WelcomeScreenStyle.primaryTextButton}/>
                    <Button text='Login as guest' containerStyle={{}} textStyle={[WelcomeScreenStyle.primaryTextButton, {textDecorationLine:'underline'}]}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default WelcomeScreen