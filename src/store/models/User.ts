import Realm from "realm"

class User extends Realm.Object<User> {
    id!: Realm.BSON.ObjectId
    fullname!: string
    email!: string
    phone!: string
    password!: string
    profileImage?: string    
    addresses!: Realm.List<Address>
    
    static schema = {
        name : "User",
        properties: {
            id: 'objectId',
            fullname: 'string',
            email: 'string',
            phone: 'string',
            password: 'string',
            profileImage: 'string',
            addresses: { type: "list", objectType: "Address" },
        },
        primaryKey: 'id'    
    }
}

class Address extends Realm.Object<Address>{
    street!: string
    kelurahan!: string
    subDistrict!: string
    city!: string
    province!: string
    
    static schema = {
        name: 'Address',
        embedded: true,
        properties: {
            street: 'string',
            kelurahan: 'string',
            subDistrict: 'string',
            city: 'string',
            province: 'string'
        },
    }
}