import { Order } from "./Order"
import { Product } from "./Product"
import { InternalStorage, RamCapacity } from "./Size"

export class OrderDetail extends Realm.Object<OrderDetail> {
    id!: number
    idOrder: number
    idProduct: number
    idInternalStorage?: number
    idRamCapacity?: number
    price: number
    quantity: number
    static schema : Realm.ObjectSchema = {
        name: "OrderDetail",
        properties: {
            id: 'int',
            idOrder: 'int',
            idProduct: 'int',
            idInternalStorage: 'int?',
            idRamCapacity: 'int?',
            price: 'float',
            quantity: 'int'
        },
        primaryKey: 'id'
    }
}