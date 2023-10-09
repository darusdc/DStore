export class RatingData extends Realm.Object<RatingData> {
    id!: number
    idProduct: number
    rating: number
    ratingDetail: Realm.List<RatingDetail>

    static schema : Realm.ObjectSchema = {
        name: "RatingData",
        properties: {
            id: 'int',
            idBrand: 'int',
            rating: 'int',
            ratingDetail: {type: 'list', objectType: 'RatingDetail'}
        }
    }
}

export class RatingDetail extends Realm.Object<RatingDetail> {
    idUser: number
    ratingNumber: number

    static schema : Realm.ObjectSchema = {
        name: 'RatingDetail',
        embedded: true,
        properties: {
            idUser: 'int',
            ratingNumber: 'int'
        }
    }
}