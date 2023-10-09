import { View, Image, ActivityIndicator, SafeAreaView, Text, Dimensions } from 'react-native'
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
    
    //Font Section
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={WelcomeScreenStyle.staggerFirstContainer}>
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
                                <Image source={{ uri: item.thumbnail }} style={[WelcomeScreenStyle.image, {height:Dimensions.get('screen').height / 3 - (150 * Math.random())}]}
                                />
                            </View>
                        )
                        }
                    />

                </View>

                <View style={{ flex: 1 , alignItems:'center'}}>
                    <LargeText text='Find your favorite electronic products' style={WelcomeScreenStyle.captionText} />
                    <Button text='Sign up to DStore' 
                    containerStyle={WelcomeScreenStyle.primaryButtonContainer} 
                    textStyle={WelcomeScreenStyle.primaryTextButton}
                    onPress={() => {navigation.navigate('Register')}}
                    />
                    <Button text='I already have an account' 
                    containerStyle={WelcomeScreenStyle.secondaryButtonContainer} 
                    textStyle={WelcomeScreenStyle.secondaryTextButton}
                    onPress={() => {navigation.navigate('Login')}}
                    />
                    <Button 
                    text='Login as guest' 
                    textStyle={[WelcomeScreenStyle.secondaryTextButton, {textDecorationLine:'underline', marginTop:20}]}
                    onPress={() => {navigation.navigate('HomeTab')}}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default WelcomeScreen