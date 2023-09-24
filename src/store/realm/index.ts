import Realm from "realm"

const realm = new Realm({
    schema: [
            Brand,
            Category,
            Shipping,
            Product,
            ProductImage,
            Order,
            OrderDetail,
            InternalStorage,
            RamCapacity,
            User,
            Address
    ],
    deleteRealmIfMigrationNeeded: true
})