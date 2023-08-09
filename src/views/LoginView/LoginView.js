import * as SecureStore from "expo-secure-store";
import React, { useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import SceneName from '../../constants/SceneName';
import _ from "lodash";
import ViewLogin from "@sicssa-lab/mystique/src/views/ViewLogin";
import { useGlobalState, useDispatch } from '../../context/StoreProvider';
import userAuthAction from '../../actions/userAuthAction';
import localstorageConstants from '../../constants/localstorageConstants';
import userAuthUtils from "../../utils/userAuthUtils";

export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

const LoginView = () => {
  const navigation = useNavigation();
  const { userAuth } = useGlobalState();
  const dispatch = useDispatch();

  const conextionLogin = async (response, password) => {
    const rawValue = JSON.stringify({
      username: response.celphone,
      password: password,
    });
    //console.log(rawValue, "guarda en sesion");
    await SecureStore.setItemAsync(localstorageConstants.AUTH, rawValue).then(() => {
      //console.log("finish con login");
      navigation.navigate(SceneName.Home);
    });
  }

  const handleLogin = async (request) => {

    try {
      userAuthAction.get(request, dispatch, (response) => {
        if (response.id) {
          conextionLogin(response, request.password);
        }
      },
        (error) => {
          //console.log(typeof error)
          let messageError = error.message?.toString();
          messageError = _.isEmpty(messageError) ? "Ups! Ocurrio un error" : messageError;
          Alert.alert(
            'ER: Error de acceso',
            messageError,
          );
        });
    } catch (e) {
      Alert.alert(
        'Error Interno',
        e,
      );
    }
  };

  const goToRegister = async () => {
    navigation.navigate(SceneName.Registration);
  };

  useEffect(() => {
    const fetchData = async () => {
      const auxSession = await userAuthUtils.getLoginStoge();
      if (auxSession) {
        userAuthAction.get(auxSession, dispatch, (response) => {
          if (response.id) {
            conextionLogin(response);
          }
        });
      }
    }
    fetchData();
  }, []);

  return (
    <>
    <ViewLogin
      title="Encuentra lo que buscas cerca de ti"
      imageLogo={{
        req : require('../../assets/images/HolaTelcel.png'),
      }}
      body={{
        title: "Ingresa tu número celular",
        description: "Envíaremos un código de verificación a tu celular para confirmar el acceso.",
      }}
      hasRegistrationButton={true}
      onPressSubmit={handleLogin}
      onPressRegister={goToRegister}
      loading={userAuth.loading}
    />
    </>
  );
};

export default LoginView;
