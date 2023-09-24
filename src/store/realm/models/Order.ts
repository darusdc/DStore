class Order extends Realm.Object<Order> {
    id!: Realm.BSON.ObjectId
    idUser: User
    idShipping: Shipping
    totalPrice: number
    deliveryFee: number
    serviceFee: number
    date: Date

    static schema: Realm.ObjectSchema = {
        name: "Order",
        properties: {
            id: 'objectId',
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