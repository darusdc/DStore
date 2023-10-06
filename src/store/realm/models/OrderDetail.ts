import { Order } from "./Order"
import { Product } from "./Product"
import { InternalStorage, RamCapacity } from "./Size"

export class OrderDetail extends Realm.Object<OrderDetail> {
    id!: number
    idOrder: Order
    idProduct: Product
    idInternalStorage?: InternalStorage
    idRamCapacity?: RamCapacity
    price: number
    quantity: number
    static schema : Realm.ObjectSchema = {
        name: "OrderDetail",
        properties: {
            id: 'int',
            idOrder: 'Order',
            idProduct: 'Product',
            idInternalStorage: 'InternalStorage?',
            idRamCapacity: 'RamCapacity?',
            price: 'float',
            quantity: 'int'
        },
        primaryKey: 'id'
    }
}