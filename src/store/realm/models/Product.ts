import { Brand } from "./Brand"
import { Category } from "./Category"

export class Product extends Realm.Object<Product> {
    id!: number
    idCategory: number
    idBrand: number
    name: string
    price: number
    images: Realm.List<ProductImage>
    description: string
    isLike: boolean
    likeNumbers?: number

    static schema : Realm.ObjectSchema = {
        name: 'Product',
        properties: {
            id: 'int',
            idCategory: 'int',
            idBrand: 'int',
            name: 'string',
            price: 'double',
            images: { type: "list", objectType: "ProductImage" },
            description: 'string',
            isLike: 'bool',
            likeNumber: 'int?'
        },
        primaryKey: 'id'
    }
}

export class ProductImage extends Realm.Object<ProductImage> {
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