import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { headerStyle } from './headerStyle'
import { SearchBar } from '@rneui/themed'
import Button from '../Button/button'

type arg = {
    title: string,
    /**
     * The icon will shown up on the right side your header
     * <Header rightIcon='heart'/>
     */
    rightIcon?: 'heart' | 'trash',
    isShowRightIcon?: boolean,
    isStackScreen?: boolean,
    isSearchBarShow?: boolean,
    isTransparent?: boolean
}
const Header = (props: arg) => {
    const { title,
        rightIcon = 'heart',
        isShowRightIcon,
        isStackScreen,
        isSearchBarShow,
        isTransparent } = props;
    return (
        <View style={headerStyle.container}>
                {isSearchBarShow ? null :
            <View style={headerStyle.secondContainer}>
                    <Icon.Button name='arrow-left' onPress={() => { console.log('Icon') }} style={headerStyle.button} color={'black'} size={30} backgroundColor={'white'} />

            </View>
                }
                <View style={headerStyle.searchBarContainer}>
                {isSearchBarShow ?
                    <SearchBar placeholder='Search item here..'
                        inputContainerStyle={headerStyle.searchBarInnerContainer}
                        containerStyle={headerStyle.searchBarContainerStyle}
                        />
                        : <Text style={headerStyle.heading}>{title}</Text>}
                </View>


            <View style={headerStyle.secondContainer}>
                {isShowRightIcon ?
                <Button iconName={rightIcon} 
                containerStyle={{ ...headerStyle.button, ...headerStyle.rightButton }} 
                iconStyle={headerStyle.iconButton} 
                />
                    : null
                }
            </View>

        </View>
    )
}

export default Header