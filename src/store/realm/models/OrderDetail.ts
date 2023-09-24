class OrderDetail extends Realm.Object<OrderDetail> {
    id!: Realm.BSON.ObjectId
    idOrder: Order
    idProduct: Product
    idInternalStorage?: InternalStorage
    idRamCapacity?: RamCapacity
    price: number
    quantity: number
    static schema : Realm.ObjectSchema = {
        name: "OrderDetail",
        properties: {
            id: 'objectId',
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