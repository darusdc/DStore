class Shipping extends Realm.Object<Shipping> {
    id!: Realm.BSON.ObjectId
    shippingName!: string
    terms!: string
    deliveryFee!: number
    isSelected?: boolean

    static schema = {
        name: 'Shipping',
        properties:{
            id: 'objectId',
            shippingName: 'string',
            terms: 'string',
            deliveryFee: 'int',
            isSelected: 'bool'
        },
        primaryKey: 'id'
    }
}