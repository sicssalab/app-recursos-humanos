import * as SecureStore from "expo-secure-store";
import React, { useState, useContext, useEffect } from 'react';
import { Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ThemeContext } from 'styled-components/native';
import SceneName from '../../constants/SceneName';
import Text from '../../components/Text';
import _ from "lodash";


import HeroText from './components/HeroText';
import { Underline } from './components/HeroText';
import PasswordInput from './components/PasswordInput';
import PhoneInput from './components/PhoneInput';
import {
    Container, LogoContainer, RegContainer,
  Title,
  Highlight,
  BottomCard,
  BottomPadding,
  LoginButton,
  Description,
  TopCard,
} from './styles';
import { useGlobalState, useDispatch } from '../../context/StoreProvider';
import userAuthAction from '../../actions/userAuthAction';
import localstorageConstants from '../../constants/localstorageConstants';
import userAuthUtils from "../../utls/userAuthUtils";

export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

const LoginView = () => {
  const themeContext = useContext(ThemeContext);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const bottomInset = useCustomBottomInset();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const {userAuth} = useGlobalState();
  const dispatch = useDispatch();

  const handlePhoneNumberChange = (phone) => {
    setPhoneNumber(phone);
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
  };

  const conextionLogin = async (response) => {
    const rawValue = JSON.stringify(response);
    await SecureStore.setItemAsync(localstorageConstants.AUTH, rawValue).then(() => {
      console.log("finish con then");
      navigation.navigate(SceneName.Home);
    });
  }

  const handleLogin = async () => {
    if (_.isEmpty(phoneNumber)) {
      Alert.alert(
        'Error de acceso',
        'Ingresa tu número telefónico',
      );
      return true;
    }

    if (_.isEmpty(password)) {
      Alert.alert(
        'Error de acceso',
        'Ingresa contraseña',
      );
      return true;
    }
    let auxPass = phoneNumber.replace("(","").replace(")","").replace(" ","").replace("-","")
    const request = {
      username: auxPass,
      password: password,
    };
    try {
      userAuthAction.get(request, dispatch, (response) => {
        if (response.id) {
          conextionLogin(response);
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
      const auxSession = await userAuthUtils.getConexionSession();
      if (auxSession)
        navigation.navigate(SceneName.Home);
    }
    fetchData();
  },[]);

  const loginButtonDisabled = Boolean(!phoneNumber || !password);

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{ flexGrow: 1 }}>
        <StatusBar style={themeContext.dark ? 'light' : 'light'} />
        <TopCard style={{ paddingTop: 20 + insets.top }}>
          <LogoContainer>
            <Image source={require('../../assets/images/HolaTelcel.png')} />
          </LogoContainer>
          <HeroText />
        </TopCard>
        <BottomCard style={{ paddingBottom: bottomInset }}>
          <Title>
            Ingresa tu número celular
          </Title>
          <Description>
            Envíaremos un código de verificación a tu celular para confirmar el
            acceso.
          </Description>
          <PhoneInput
            enablesReturnKeyAutomatically
            returnKeyType='send'
            onPhoneNumberChange={handlePhoneNumberChange}
            blurOnSubmit={false}
            placeholder='(999) 9999-999'
          />
          <PasswordInput onPasswordChange={handlePasswordChange} />
          <LoginButton
            loading={userAuth.loading}
            disabled={loginButtonDisabled}
            onPress={handleLogin}>
            Iniciar sesión
          </LoginButton>
          <TouchableOpacity activeOpacity={1} onPress={goToRegister}>
            <RegContainer>
              <Underline>
                <Text fontSize='large' fontWeight='bold'>
                  ¡Regístrate!
                </Text>
              </Underline>
            </RegContainer>
          </TouchableOpacity>
        </BottomCard>
      </KeyboardAvoidingView>
      <BottomPadding
        disabled={loginButtonDisabled}
        style={{ height: insets.bottom }}
      />
    </Container>
  );
};

export default LoginView;
