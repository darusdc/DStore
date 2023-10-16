import { useSelector } from "react-redux";
import { RootState } from "../../App";
import { realm } from "../store/realm";
import { useState } from "react";
import { Cart } from "../store/realm/models/Cart";
import { Product } from "../store/realm/models/Product";
import { InternalStorage, RamCapacity } from "../store/realm/models/Size";
import { Alert } from "react-native";

const userLoginId = useSelector<RootState>(
  (store) => store.userLoginIdReducer.userLoginId
);
const [cartItems, setCartItems] = useState(
  realm.objects<Cart>("Cart").filtered(`idUser == ${userLoginId}`)
);
const products = realm.objects<Product>("Product");
const internalStorage = realm.objects<InternalStorage>("InternalStorage");
const ramCapacity = realm.objects<RamCapacity>("RamCapacity");

const refreshCart = () => {
  const carts = realm
    .objects<Cart>("Cart")
    .filtered(`idUser == ${userLoginId}`);
  return carts;
};

const getProductData = (idProduct: number) => {
  return products.filtered(`id == ${idProduct}`)[0];
};

const getProductPrice = (item) => {
  if (getProductData(item.idProduct).idCategory != 4) {
    return (
      getProductData(item.idProduct).price *
      getSizeData("internal", item.idInternalStorage)?.priceMultiplier *
      getSizeData("ram", item.idRamCapacity)?.priceMultiplier *
      item.quantity
    );
  } else {
    return getProductData(item.idProduct).price * item.quantity;
  }
};

const getAllPriceProduct = () => {
  let price = 0;
  cartItems.forEach((item) => (price = price + getProductPrice(item)));
  return price;
};

const getSizeData = (type: "internal" | "ram", idSize: number) => {
  if (type === "internal") {
    return internalStorage.filtered(`id ==${idSize}`)[0];
  } else {
    return ramCapacity.filtered(`id ==${idSize}`)[0];
  }
};

const cartModified = (
  action: "remove" | "plus" | "minus",
  item: Cart & Realm.Object<unknown, never>
) => {
  if (action === "remove") {
    realm.write(() => {
      realm.delete(item);
    });
  } else if (action === "minus") {
    if (item.quantity < 2) {
      Alert.alert("Remove Item", "Do you want to remove this item?", [
        {
          text: "Yes",
          onPress: () => {
            realm.write(() => {
              item.quantity--;
            });
          },
        },
        { text: "No", style: "cancel" },
      ]);
    } else {
      realm.write(() => {
        item.quantity--;
      });
    }
  } else {
    realm.write(() => {
      item.quantity++;
    });
  }
   return refreshCart();
};
