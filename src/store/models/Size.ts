class InternalStorage extends Realm.Object<InternalStorage> {
    id!: Realm.BSON.ObjectId
    size!: string
    priceMultiplier!: number
    isSelected?: boolean
    
    static schema = {
        name: 'InternalStorage',
        properties: {
            id: 'objectId',
            size: 'string',
            priceMultiplier: 'float',
            isSelected: 'bool'
        },
        primaryKey: 'id'
    }
}

class RamCapacity extends Realm.Object<RamCapacity> {
    id!: Realm.BSON.ObjectId
    size!: string
    priceMultiplier!: number
    isSelected?: boolean
    
    static schema = {
        name: 'RamCapacity',
        properties: {
            id: 'objectId',
            size: 'string',
            priceMultiplier: 'float',
            isSelected: 'bool'
        },
        primaryKey: 'id'
    }
}