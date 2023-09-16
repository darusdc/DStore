import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import  Icon   from 'react-native-vector-icons/EvilIcons'
import React from 'react'
import Colors from '../constants/Colors'
type arg = {
    headerCustomStyle?: StyleSheet,
    isShowRightIcon?: boolean,
    title: string,
    isWhiteTitle?: boolean,
    isStackScreen?: boolean,
    isShowLogo?: boolean
}

const Header = (prop: arg) => {
    const sizeIcon = 28;
    return (
        <View style={styles.container}>
            <View style={styles.secondContainer}>
                {prop.isStackScreen ?
                    <TouchableOpacity>
                        <Icon name='chevron-left' size={sizeIcon}/>
                    </TouchableOpacity>
                    :
                    null
                }
            </View>
            <View style={{ flexDirection: "row" }}>
                {prop.isShowLogo ?
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.heading}>D</Text><Text style={{ ...styles.heading, backgroundColor: Colors.GRAY, color:Colors.WHITE }}>STORE</Text>
                    </View> : null
                }
                <Text style={[styles.heading, { backgroundColor: Colors.SECONDARY, color: Colors.BLACK }]}>{prop.isShowLogo ? "-" : ""} {prop.title}</Text>
            </View>
            <View style={styles.secondContainer}>
                {prop.isShowRightIcon ?
                    <View style={{flexDirection:'row', margin: 8}}>
                        <TouchableOpacity>
                            <Icon name="cart" size={sizeIcon}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name="search" size={sizeIcon}/>
                        </TouchableOpacity>
                    </View>
                    :
                    null}
            </View>
        </View >
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.SECONDARY,
        height: 60,
        justifyContent: 'space-between'
    },
    heading: {
        fontSize: 20,
        color: Colors.WHITE, backgroundColor: "#0F0F0F",
        padding: 8,
        alignItems: 'center',
        textAlignVertical:'center'
    },
    secondContainer: {
        flexDirection: 'row',
        padding: 8,
        alignItems: 'center',
    }
})