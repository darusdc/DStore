export class FavoriteProduct extends Realm.Object<FavoriteProduct> {
  id!: number;
  idUser: number;
  idProducts: [];

  static schema: Realm.ObjectSchema = {
    name: "FavoriteProduct",
    properties: {
      id: "int",
      idUser: "int",
      idProducts: "int<>",
    },
    primaryKey: "id",
  };
}
