import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Header from '../../components/Header/header'
import { realm } from '../../store/realm'
import { SelectedAddress, User } from '../../store/realm/models/User'
import { useSelector } from 'react-redux'
import { RootState } from '../../../App'
import { CheckBox } from '@rneui/themed'
import Colors from '../../constants/Colors'
import { SmallText } from '../../components/Text'

const AddressListScreen = () => {
    const userLoginId = useSelector<RootState>((store) => store.userLoginIdReducer.userLoginId)
    const [...addresses] = realm.objects<User>('User').filtered(`id == ${userLoginId}`)[0].addresses
    const addressId = realm.objects<SelectedAddress>('SelectedAddress').filtered(`userId == ${userLoginId}`)[0]?.addressId - 1 || 0
    return (
        <View>
            <Header
                title='Select your address'
                isStackScreen
            />

            <FlatList
                data={addresses}
                renderItem={({ item, index }) => (
                    <View>
                        {index === 0? null: 
                        
                        <View style={{flexDirection:'row', borderWidth:0.5}}>
                            <CheckBox
                                checked={index==addressId}
                                containerStyle={{}}
                                checkedColor={Colors.PRIMARY}
                                // onPress={() => onClickCheckBox(item.id, item.isSelected)}
                            />
                            <View style={{}}>
                                <SmallText text={item.addressLabel || index.toString()} />
                                <SmallText
                                    text={item.street}
                                />
                                <SmallText text={item.kelurahan} />
                            </View>
                        </View>
                        }
                    </View>
                )}
            />
        </View>
    )
}

export default AddressListScreen