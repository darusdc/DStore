import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import Header from '../../components/Header/header'
import { realm } from '../../store/realm'
import { SelectedAddress, User } from '../../store/realm/models/User'
import { useSelector } from 'react-redux'
import { RootState } from '../../../App'
import { CheckBox, Icon } from '@rneui/themed'
import Colors from '../../constants/Colors'
import { SmallText } from '../../components/Text'
import Button from '../../components/Button/button'
import { registerStyles } from '../onboarding/RegisterScreenStyle'
import { WelcomeScreenStyle } from '../onboarding/WelcomeScreenStyle'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { StackNavigation } from '../../navigation/MainNavigation'

const AddressListScreen = () => {
    const userLoginId = useSelector<RootState>((store) => store.userLoginIdReducer.userLoginId)
    const [addresses, setAddresses] = useState(realm.objects<User>('User').filtered(`id == ${userLoginId}`)[0].addresses)
    const [addressId, setAddressId] = useState(realm.objects<SelectedAddress>('SelectedAddress').filtered(`userId == ${userLoginId}`)[0]?.addressId - 1 || 0)
    const navigation = useNavigation<StackNavigation>()
    const onClickCheckBox = (id: number) => {
        const selectedAddress = realm.objects<SelectedAddress>('SelectedAddress').filtered(`userId == ${userLoginId}`)[0]
        realm.write(() => {
            selectedAddress.addressId = id + 1
        })
        setAddressId(id)
    }
    const reload = () => { 
        const data = realm.objects<User>('User').filtered(`id == ${userLoginId}`)[0].addresses
        setAddresses(data)
     }
    useFocusEffect(useCallback(() => {
        reload()
    },[]))
    return (
        <View style={{flex: 1}}>
            <Header
                title='Select your address'
                isStackScreen
            />

            <FlatList
                data={addresses}
                renderItem={({ item, index }) => (
                    <View>
                        {index === 0 ? null :

                            <View style={{
                                flexDirection: 'row',
                                borderWidth: 0.5,
                                alignItems: 'center',
                                alignContent: 'space-between'
                            }}>
                                <CheckBox
                                    checked={index == addressId}
                                    containerStyle={{}}
                                    checkedColor={Colors.PRIMARY}
                                    onPress={() => onClickCheckBox(index)}
                                />
                                <View style={{}}>
                                    <SmallText text={item.addressLabel || index.toString()} style={{ fontWeight: 'bold' }} />
                                    <SmallText
                                        text={`${item.street}, ${item.kelurahan}, ${item.subDistrict}`}
                                    />
                                    <SmallText text={item.city} />
                                </View>
                                <View style={{flex:1,alignItems:'flex-end', alignContent:'flex-end', marginRight: 20}}>
                                    <TouchableOpacity style={{alignItems:'center'}} onPress={() => { navigation.navigate('AddAddress', {addressId: index}) }}>
                                    <Icon name='home' type='ionicons' size={32} />
                                        <SmallText text={"Edit"}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    </View>
                )}
            />
            <View style={registerStyles.bottomContainer}>

            <Button text='Add new address' 
            containerStyle={WelcomeScreenStyle.primaryButtonContainer}
            textStyle={WelcomeScreenStyle.primaryTextButton}
            onPress={() => { navigation.navigate('AddAddress') }}
            />
            </View>
        </View>
    )
}

export default AddressListScreen