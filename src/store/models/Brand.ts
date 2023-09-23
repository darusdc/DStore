class Brand extends Realm.Object<Brand> {
    id!: Realm.BSON.ObjectId
    brandName: string
    logo: string
    thumbnail: string
    isSelected: boolean

    static schema = {
        name: "Brand",
        properties: {
            id: 'objectId',
            brandName: 'string',
            logo: 'string',
            thumbnail: 'string',
            isSelected: 'bool'
        },
        primaryKey: 'id'
    }
}