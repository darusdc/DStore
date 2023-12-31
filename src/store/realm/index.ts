import Realm from "realm";
import { Address, SelectedAddress, User, UserLoginId } from "./models/User";
import { Brand } from "./models/Brand";
import { Category } from "./models/Category";
import { Order } from "./models/Order";
import { OrderDetail } from "./models/OrderDetail";
import { Product, ProductImage } from "./models/Product";
import { Shipping } from "./models/Shipping";
import { InternalStorage, RamCapacity } from "./models/Size";
import { FavoriteProduct } from "./models/FavoriteProduct";
import { Cart } from './models/Cart'
import { RatingData, RatingDetail } from "./models/Rating";
const realmConfig : Realm.Configuration = {
  schema: [
    Brand,
    User,
    Address,
    UserLoginId,
    Category,
    Order,
    OrderDetail,
    Product,
    ProductImage,
    Shipping,
    InternalStorage,
    RamCapacity,
    FavoriteProduct,
    Cart,
    SelectedAddress,
    RatingData,
    RatingDetail
  ],
  deleteRealmIfMigrationNeeded: true,
};

export const realm = new Realm(realmConfig)

// export const {RealmProvider, useRealm, useObject, useQuery} =
//   createRealmContext(realmConfig);


