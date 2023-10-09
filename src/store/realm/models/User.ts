export class User extends Realm.Object<User> {
    id!: number
    fullname!: string
    email!: string
    phone?: string
    password!: string
    username: string
    profileImage?: string    
    addresses!: Realm.List<Address>
    
    static schema : Realm.ObjectSchema = {
        name : "User",
        properties: {
            id: 'int',
            fullname: 'string',
            email: 'string',
            phone: 'string',
            username: 'string',
            password: 'string',
            profileImage: 'string',
            addresses: { type: "list", objectType: "Address" },
        },
        primaryKey: 'id'    
    }
}

export class Address extends Realm.Object<Address>{
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

export class UserLoginId extends Realm.Object<UserLoginId>{
    userId!: number 
    
    static schema = {
        name: "UserLoginId",
        properties: {
            userId: 'int'
        },
        primaryKey: 'userId'
    }

}

export class SelectedAddress extends Realm.Object<SelectedAddress>{
    addressId!: number
    userId!:number

    static schema = {
        name: 'SelectedAddress',
        properties: {
            addressId: 'int',
            userId:'int'
        },
    }
}