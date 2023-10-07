export class Cart extends Realm.Object<Cart> {
    id!: number
    idUser!: number
    idProduct!: number
    idInternalStorage?: number
    idRamCapacity?: number
    quantity: number
    isSelected: boolean

    static schema : Realm.ObjectSchema = {
        name: "Cart",
        properties: {
            id: 'int',
            idUser: 'int',
            idProduct: 'int',
            idInternalStorage: 'int?',
            idRamCapacity: 'int?',
            quantity: 'int', 
            isSelected: 'bool',
        },
        primaryKey: 'id'
    }
}