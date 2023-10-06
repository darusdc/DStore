import { realm } from "../store/realm"

export const insertDummyData = (modelName : string, data) => {
    const modelDB = realm.objects(modelName)

    if (!modelDB.length) {
        realm.write(() => {
            data.forEach((item) => {
                realm.create(
                    modelName,
                    item
                )
            })
        })
    }
}