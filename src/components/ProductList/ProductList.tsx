import { View, Image, Alert } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import { Cart } from '../../store/realm/models/Cart'
import { realm } from '../../store/realm'
import { InternalStorage, RamCapacity } from '../../store/realm/models/Size'
import { Product } from '../../store/realm/models/Product'
import ProductListStyles from './ProductListStyle'
import { MediumText, SmallText, TinyText } from '../Text'
import Button from '../Button/button'
import { OrderDetail } from '../../store/realm/models/OrderDetail'

type arg = {
    item : Cart & Realm.Object<unknown, never> | OrderDetail & Realm.Object<unknown, never>
    refreshCart?: () => void
    isCheckOut?: boolean
    isShowPrice? : boolean
}
const ProductList = (props : arg) => {
    const {item, refreshCart, isCheckOut, isShowPrice} = props
    const products = realm.objects<Product>('Product')
    const internalStorage = realm.objects<InternalStorage>('InternalStorage')
    const ramCapacity = realm.objects<RamCapacity>('RamCapacity')
    
    const getProductData = (idProduct: number) => {
        return products.filtered(`id == ${idProduct}`)[0]
    }

    const getProductPrice = (item : Cart & Realm.Object<unknown, never> | OrderDetail & Realm.Object<unknown, never>) => {
        if (getProductData(item.idProduct).idCategory != 4) {
            return ((getProductData(item.idProduct).price *
                getSizeData('internal', item.idInternalStorage)?.priceMultiplier *
                getSizeData('ram', item.idRamCapacity)?.priceMultiplier) * item.quantity)
        } else {
            return (getProductData(item.idProduct).price * item.quantity)
        }
    }

    const getSizeData = (type: 'internal' | 'ram', idSize: number) => {
        if (type === "internal") {
            return internalStorage.filtered(`id ==${idSize}`)[0]
        } else {
            return ramCapacity.filtered(`id ==${idSize}`)[0]
        }
    }

    const cartModified = (action: 'remove' | 'plus' | 'minus', item: Cart & Realm.Object<unknown, never> | OrderDetail & Realm.Object<unknown, never>) => {
        if (action === 'remove') {
            realm.write(() => {
                realm.delete(item)
            })
        } else if (action === 'minus') {
            if (item.quantity < 2) {
                Alert.alert('Remove Item', 'Do you want to remove this item?',
                    [{
                        text: 'Yes',
                        onPress: () => {
                            realm.write(() => {
                                item.quantity--
                            })
                        }
                    }, { text: 'No', style: 'cancel' }])
            } else {
                realm.write(() => {
                    item.quantity--
                })
            }
        } else {
            realm.write(() => {
                item.quantity++
            })
        }
        refreshCart()
    }
    return (
        <View>
            {isCheckOut?
              <View style={{ padding: 20, borderTopWidth: 0.5 }}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={{ uri: getProductData(item.idProduct).images[0].link }}
                  style={isShowPrice? ProductListStyles.tileImage : ProductListStyles.tileImageAlter}
                />
                <TinyText text={item.quantity > 9 ? '9+' : item.quantity.toString()}
                  style={isShowPrice? ProductListStyles.quantityText:ProductListStyles.quantityTextAlter}
                />
        
                <View style={{ paddingLeft: 10 }}>
                  <MediumText text={getProductData(item.idProduct).name} style={ProductListStyles.itemName} />
                  {getProductData(item.idProduct).idCategory != 4 ?
                    <SmallText text={
                      `${getSizeData('ram', item.idRamCapacity)?.size}/${getSizeData('internal', item.idInternalStorage)?.size}`} />
                    :
                    <SmallText text={`Liked by : ${getProductData(item.idProduct).likeNumber.toString()}`} />
                  }
                  {isShowPrice? 
                  <MediumText text={`$ ${getProductPrice(item).toFixed(2)}`} /> : null
                  }
                </View>
        
              </View>
            </View>
            :
            <View style={{ padding: 10, borderTopWidth: 5, borderColor: Colors.CONTAINER }}>
            <View style={{ flexDirection: 'row' }}>
                <Image
                    source={{ uri: getProductData(item.idProduct).images[0].link }}
                    style={ProductListStyles.tileImage}
                />

                <View style={{ paddingLeft: 10 }}>
                    <MediumText text={getProductData(item.idProduct).name} style={ProductListStyles.itemName} />
                    {getProductData(item.idProduct).idCategory != 4 ?
                        <SmallText text={
                            `${getSizeData('ram', item.idRamCapacity)?.size}/${getSizeData('internal', item.idInternalStorage)?.size}`} />
                        :
                        <SmallText text={`Liked by : ${getProductData(item.idProduct).likeNumber.toString()}`} />
                    }
                    <MediumText text={`$ ${getProductPrice(item).toFixed(2)}`}
                    />
                </View>

            </View>
            <View style={ProductListStyles.actionWrapperContainer}>
                <Button text='Remove'
                    textStyle={{ color: 'red', verticalAlign: 'middle' }}
                    containerStyle={{ alignItems: 'center' }}
                    onPress={() => cartModified('remove', item)}
                />
                <View style={ProductListStyles.buttonPlusMinusContainer}>
                    <Button text='-'
                        textStyle={ProductListStyles.itemButton}
                        containerStyle={ProductListStyles.buttonPlusMinus}
                        onPress={() => cartModified('minus', item)}
                    />
                    <TinyText text={item.quantity.toString()}
                        style={[ProductListStyles.buttonPlusMinus,
                        {
                            textAlign: 'center',
                            verticalAlign: 'middle',
                            fontSize: 14

                        }]}
                    />
                    <Button text='+'
                        textStyle={ProductListStyles.itemButton}
                        containerStyle={ProductListStyles.buttonPlusMinus}
                        onPress={() => cartModified('plus', item)}
                    />
                </View>
            </View>
            </View>
            }
        </View>
    )
}

export default ProductList