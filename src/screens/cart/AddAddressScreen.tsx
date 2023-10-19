import { View } from 'react-native'
import React from 'react'
import Header from '../../components/Header/header'
import { Formik } from 'formik'
import * as yup from 'yup'
import { ScrollView } from 'react-native'
import FormComponent from '../../components/Form/FormComponent'
import { SmallText } from '../../components/Text'
import { registerStyles } from '../onboarding/RegisterScreenStyle'
import Button from '../../components/Button/button'
import { WelcomeScreenStyle } from '../onboarding/WelcomeScreenStyle'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { StackNavigation } from '../../navigation/MainNavigation'
import { useSelector } from 'react-redux'
import { RootState } from '../../../App'
import { realm } from '../../store/realm'
import { SelectedAddress, User } from '../../store/realm/models/User'

const AddAddressScreen = () => {
    const navigation = useNavigation<StackNavigation>()
    const userLoginId = useSelector<RootState>((store) => store.userLoginIdReducer.userLoginId)
    const addressId = realm.objects<SelectedAddress>('SelectedAddress').filtered(`userId == ${userLoginId}`)[0]
    const route: RouteProp<{ params: { addressId: number, type: string } }> = useRoute()
    const routeAddress = route.params?.addressId
    const userData = realm.objects<User>('User').filtered(`id == ${userLoginId}`)[0]
    const addAddressFormValidation = yup.object().shape({
        addressLabel: yup.string().required(),
        street: yup.string().required(),
        kelurahan: yup.string().required(),
        subDistrict: yup.string().required(),
        city: yup.string().required(),
        province: yup.string().required()
    })

    const onClickAdd = (data) => {
        // const { street, kelurahan, subDistrict, city, province } = data

        realm.write(() => {
            if (routeAddress) {
                userData.addresses[routeAddress] = { ...data }
            } else {
                userData.addresses.push(
                    { ...data }
                )
                if (addressId) {
    
                    addressId.addressId = userData.addresses.length + 1
                } else {
                    realm.create('SelectedAddress', {
                        userId: userLoginId,
                        addressId: userData.addresses.length
                    })
                }
            }

        })
        alert(routeAddress? 'Successfully update address':'Successfully to add new address')
        navigation.goBack()
    }
    return (
        <View style={{ flex: 1 }}>
            <Header title='Add New Address' isStackScreen />
            <Formik initialValues={routeAddress==0 || routeAddress==undefined ? {
                addressLabel: '',
                street: '',
                kelurahan: '',
                subDistrict: '',
                city: '',
                province: ''
            } : {
                addressLabel: userData.addresses[routeAddress].addressLabel,
                street: userData.addresses[routeAddress].street,
                kelurahan: userData.addresses[routeAddress].kelurahan,
                subDistrict: userData.addresses[routeAddress].subDistrict,
                city: userData.addresses[routeAddress].city,
                province: userData.addresses[routeAddress].province
            }}
                onSubmit={(data) => onClickAdd(data)}
                validationSchema={addAddressFormValidation}
            >
                {({
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    errors,
                    touched,
                    values
                }) => (
                    <View style={{ marginHorizontal: 10, flex: 1 }}>
                        <ScrollView>
                            <FormComponent title='Label'
                                required
                                placeholder='Enter your label for this address, Ex: Home'
                                onBlur={handleBlur('addressLabel')}
                                onChangeText={handleChange('addressLabel')} 
                                textContent={values.addressLabel}    
                            />

                            {errors.addressLabel && touched.addressLabel ?
                                <SmallText
                                    text={errors.addressLabel}
                                    style={registerStyles.errorMessage}
                                />
                                :
                                null
                            }

                            <FormComponent title='Street'
                                required
                                placeholder='Enter your street, number, and RT/RW'
                                onBlur={handleBlur('street')}
                                onChangeText={handleChange('street')} 
                                textContent={values.street}
                                />

                            {errors.street && touched.street ?
                                <SmallText
                                    text={errors.street}
                                    style={registerStyles.errorMessage}
                                />
                                :
                                null
                            }

                            <FormComponent title='Kelurahan'
                                required
                                placeholder='Enter your Kelurahan here'
                                onBlur={handleBlur('kelurahan')}
                                onChangeText={handleChange('kelurahan')} 
                                textContent={values.kelurahan}
                                />

                            {errors.kelurahan && touched.kelurahan ?
                                <SmallText
                                    text={errors.kelurahan}
                                    style={registerStyles.errorMessage}
                                />
                                :
                                null
                            }

                            <FormComponent title='Kecamatan'
                                required
                                placeholder='Enter your kecamatan here'
                                onBlur={handleBlur('subDistrict')}
                                onChangeText={handleChange('subDistrict')} 
                                textContent={values.subDistrict}
                                />

                            {errors.subDistrict && touched.subDistrict ?
                                <SmallText
                                    text={errors.subDistrict}
                                    style={registerStyles.errorMessage}
                                />
                                :
                                null
                            }

                            <FormComponent title='City'
                                required
                                onBlur={handleBlur('city')}
                                onChangeText={handleChange('city')}
                                containerStyle={{ marginTop: 10 }} 
                                textContent={values.city}
                                />

                            {errors.city && touched.city ?
                                <SmallText
                                    text={errors.city}
                                    style={registerStyles.errorMessage}
                                />
                                :
                                null
                            }

                            <FormComponent title='Province'
                                required
                                onBlur={handleBlur('province')}
                                onChangeText={handleChange('province')}
                                containerStyle={{ marginTop: 10 }} 
                                textContent={values.province}
                                />

                            {errors.province && touched.province ?
                                <SmallText
                                    text={errors.province}
                                    style={registerStyles.errorMessage}
                                />
                                :
                                null
                            }
                        </ScrollView>

                        <View style={registerStyles.bottomContainer}>
                            <Button text={routeAddress? "Edit address" : 'Add address'}
                                containerStyle={WelcomeScreenStyle.primaryButtonContainer}
                                textStyle={WelcomeScreenStyle.primaryTextButton}
                                onPress={() => handleSubmit()}
                            />
                        </View>
                    </View>
                )}

            </Formik>
        </View>
    )
}

export default AddAddressScreen