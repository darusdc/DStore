export class InternalStorage extends Realm.Object<InternalStorage> {
    id!: number
    size!: string
    priceMultiplier!: number
    isSelected?: boolean
    
    static schema = {
        name: 'InternalStorage',
        properties: {
            id: 'int',
            size: 'string',
            priceMultiplier: 'float',
            isSelected: 'bool'
        },
        primaryKey: 'id'
    }
}

export class RamCapacity extends Realm.Object<RamCapacity> {
    id!: number
    size!: string
    priceMultiplier!: number
    isSelected?: boolean
    
    static schema = {
        name: 'RamCapacity',
        properties: {
            id: 'int',
            size: 'string',
            priceMultiplier: 'float',
            isSelected: 'bool'
        },
        primaryKey: 'id'
    }
}