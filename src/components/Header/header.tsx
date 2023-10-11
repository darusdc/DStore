import { NativeSyntheticEvent, Text, TextInputSubmitEditingEventData, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { headerStyle } from './headerStyle'
import { SearchBar } from '@rneui/themed'
import Button from '../Button/button'
import { useNavigation } from '@react-navigation/native'
import Colors from '../../constants/Colors'

type arg = {
    title?: string,
    /**
     * The icon will shown up on the right side your header
     * <Header rightIcon='heart'/>
     */
    rightIcon?: 'heart' | 'trash-bin-outline',
    isShowRightIcon?: boolean,
    isStackScreen?: boolean,
    isSearchBarShow?: boolean,
    onChangeText?: (keyword: string) => void
    onRightIconClick?: () => void
    onSubmitEditing?: (e : NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void
    disabledRightIcon?: boolean
}
const Header = (props: arg) => {
    const { title,
        rightIcon = 'heart',
        isShowRightIcon,
        isStackScreen,
        isSearchBarShow,
        onChangeText = () => { },
        onRightIconClick,
        onSubmitEditing,
        disabledRightIcon
    } = props;

    const [keyword, setKeyword] = useState('')
    const navigation = useNavigation()
    return (
        <View style={headerStyle.container}>
            {isSearchBarShow || !isStackScreen ? null :
                <View style={headerStyle.secondContainer}>
                    <Icon.Button name='arrow-left' onPress={() => { navigation.goBack() }} style={headerStyle.button} color={'black'} size={30} backgroundColor={'white'} />
                </View>
            }
            {isSearchBarShow && title != "" ?
                <View style={headerStyle.searchBarContainer}>
                    <SearchBar placeholder='Search item here..'
                        inputContainerStyle={headerStyle.searchBarInnerContainer}
                        containerStyle={headerStyle.searchBarContainerStyle}
                        onChangeText={(text) => {
                            setKeyword(text)
                            onChangeText(text)
                        }}
                        onSubmitEditing={(e) => {
                            onSubmitEditing(e)
                            setKeyword('')
                        }}
                        value={keyword}
                    />
                </View>
                :
                <View style={[headerStyle.textTitleContainer, !isStackScreen ? { marginHorizontal: 10 } : null]}>
                    <Text style={headerStyle.heading}>{title}</Text>
                </View>
            }


            <View style={headerStyle.secondContainer}>
                {isShowRightIcon ?
                    <Button iconName={rightIcon}
                        containerStyle={[headerStyle.button, headerStyle.rightButton, rightIcon === "heart" ? { borderWidth: 1 } : { borderWidth: 0 }]}
                        type={rightIcon === "heart" ? 'feather' : 'ionicon'}
                        iconStyle={{...headerStyle.iconButton, color: disabledRightIcon? Colors.GRAY: Colors.BLACK}}
                        onPress={onRightIconClick}
                        disabled={disabledRightIcon}
                    />
                    : null
                }
            </View>

        </View>
    )
}

export default Header