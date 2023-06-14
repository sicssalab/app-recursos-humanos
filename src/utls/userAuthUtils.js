import * as SecureStore from "expo-secure-store";
import localstorageConstants from "../constants/localstorageConstants";

const getConexionSession = async () => {
    const result = await SecureStore.getItemAsync(localstorageConstants.AUTH)
    let aux = undefined;

    try {
      if (result !== null && result !== undefined) {
        aux = JSON.parse(result);
        if ((aux.id == null || aux.id == undefined) || aux.id <= 0)
          aux = undefined;
      }
    }
    catch (e) {
      aux = undefined;
    }

    return aux;
  }

const userAuthUtils = {
    getConexionSession
}

export default userAuthUtils;