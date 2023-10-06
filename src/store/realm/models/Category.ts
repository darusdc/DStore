export class Category extends Realm.Object<Category> {
    id!: number
    techCategory!: string
    thumbnail: string
    isSelected?: boolean

    static schema = {
        name: 'Category',
        properties: {
            id: 'int',
            techCategory: 'string',
            thumbnail: 'string',
            isSelected: 'bool'
        },
        primaryKey: 'id'
    }
}