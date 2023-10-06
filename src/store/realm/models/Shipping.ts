export class Shipping extends Realm.Object<Shipping> {
    id!: number
    shippingName!: string
    terms!: string
    deliveryFee!: number
    isSelected?: boolean

    static schema = {
        name: 'Shipping',
        properties:{
            id: 'int',
            shippingName: 'string',
            terms: 'string',
            deliveryFee: 'double',
            isSelected: 'bool'
        },
        primaryKey: 'id'
    }
}