class Product extends Realm.Object<Product> {
    id!: Realm.BSON.ObjectId
    idCategory: Category
    idBrand: Brand
    name: string
    images: Realm.List<ProductImage>
    description: string
    isLike: boolean

    static schema : Realm.ObjectSchema = {
        name: 'Product',
        properties: {
            id: 'objectId',
            idCategory: 'Category',
            idBrand: 'Brand',
            name: 'string',
            images: { type: "list", objectType: "ProductImage" },
            description: 'string',
            isLike: 'bool'
        },
        primaryKey: '_id'
    }
}

class ProductImage extends Realm.Object<ProductImage> {
    id: number
    link: string

    static schema : Realm.ObjectSchema = {
        name: 'ProductImage',
        embedded: true,
        properties: {
            id: 'int',
            link: 'string'
        }
    }
}