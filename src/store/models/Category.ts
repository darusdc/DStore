class Category extends Realm.Object<Category> {
    id!: Realm.BSON.ObjectId
    techCategory!: string
    thumbnail: string
    isSelected?: boolean

    static schema = {
        name: 'Category',
        properties: {
            id: 'objectId',
            techCategory: 'string',
            thumbnail: 'string',
            isSelected: 'bool'
        },
        primaryKey: 'id'
    }
}