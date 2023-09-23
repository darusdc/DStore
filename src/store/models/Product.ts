class Product extends Realm.Object<Product> {
    id!: Realm.BSON.ObjectId
    idCategory!: Realm.Results<Category>
    idBrand!: Realm.Results<Brand>
    name!: string
    images: Realm.List<ProductImage>
    description!: string
    isLike?: boolean

    static schema = {
        name: 'Product',
        properties: {
            id: 'objectId',
            idCategory: {
                type: 'linkingObjects',
                objectType: 'Category',
                property: 'techCategory',
              },
            idBrand: {
                type: 'linkingObjects',
                objectType: 'Brand',
                property: 'brandName',
              },
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

    static schema = {
        name: 'ProductImage',
        embedded: true,
        properties: {
            id: 'int',
            link: 'string'
        }
    }
}