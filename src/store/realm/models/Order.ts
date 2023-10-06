import { Shipping } from "./Shipping"
import { User } from "./User"

export class Order extends Realm.Object<Order> {
    id!: number
    idUser: User
    idShipping: Shipping
    totalPrice: number
    deliveryFee: number
    serviceFee: number
    date: Date

    static schema: Realm.ObjectSchema = {
        name: "Order",
        properties: {
            id: 'int',
            idUser: 'User',
            idShipping: 'Shipping',
            totalPrice: 'float',
            deliveryFee: 'float',
            serviceFee: 'float',
            date: 'date'
        },
        primaryKey: 'id'
    }
}