import * as SecureStore from "expo-secure-store";
import localstorageConstants from "../constants/localstorageConstants";
import _ from "lodash";

const getLoginStoge = async () => {
  const result = await SecureStore.getItemAsync(localstorageConstants.AUTH)
  let aux = undefined;
  //console.log(result, "recupero")
  try {
    if (result !== null && result !== undefined) {
      aux = JSON.parse(result);
      if ((aux.username == null || aux.username == undefined || _.isEmpty(aux.username)) ||
      (aux.password == null || aux.password == undefined || _.isEmpty(aux.password)))
        aux = undefined;
    }
  }
  catch (e) {
    aux = undefined;
  }
  //console.log(aux, "envia")
  return aux;
}

const userAuthUtils = {
  getLoginStoge,
}

export default userAuthUtils;