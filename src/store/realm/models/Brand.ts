export class Brand extends Realm.Object<Brand> {
    id!: number
    brandName: string
    logo: string
    thumbnail: string
    isSelected: boolean

    static schema : Realm.ObjectSchema = {
        name: "Brand",
        properties: {
            id: 'int',
            brandName: 'string',
            logo: 'string',
            thumbnail: 'string',
            isSelected: 'bool',
        },
        primaryKey: 'id'
    }
}