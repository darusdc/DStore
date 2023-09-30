import { View, Image, ActivityIndicator, SafeAreaView, Text } from 'react-native'
import React from 'react'
import StaggeredList from '@mindinventory/react-native-stagger-view'
import { carouselData } from '../../data/carouselDummyData'
import { WelcomeScreenStyle } from './WelcomeScreenStyle'
import Button from '../../components/Button/button'
import { LargeText } from '../../components/Text'
import { useNavigation } from '@react-navigation/native'
import { StackNavigation } from '../../navigation/MainNavigation'

const WelcomeScreen = () => {
    const navigation = useNavigation<StackNavigation>()

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
                        alwaysBounceVertical
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
                    <Button text='Sign up to DStore' 
                    containerStyle={WelcomeScreenStyle.signUpButtonContainer} 
                    textStyle={WelcomeScreenStyle.whiteTextButton}
                    onPress={() => {navigation.navigate('Register')}}
                    />
                    <Button text='I already have an account' 
                    containerStyle={WelcomeScreenStyle.accountButtonContainer} 
                    textStyle={WelcomeScreenStyle.primaryTextButton}
                    onPress={() => {navigation.navigate('Login')}}
                    />
                    <Button 
                    text='Login as guest' 
                    textStyle={[WelcomeScreenStyle.primaryTextButton, {textDecorationLine:'underline'}]}
                    onPress={() => {navigation.navigate('Home')}}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default WelcomeScreen