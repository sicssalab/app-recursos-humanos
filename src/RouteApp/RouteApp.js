import * as SecureStore from "expo-secure-store";
import React, { useContext, useEffect } from "react";
import { ThemeContext } from "styled-components/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";
import SceneName from "../constants/SceneName";
import { Text, View } from "react-native";
import StoryView from "../views/StoryView/StoryView";
import GroupUrbanView from "../views/GroupUrbanView";

import ProfileUrbanView from "../views/ProfileUrbanView/ProfileUrbanView";
import useModalRadio from "../hooks/useModalRadio";
import { Audio } from "expo-av";
import LoginView from "../views/LoginView/LoginView";
import RegistrationView from "../views/RegistrationView";
import HomeView from "../views/HomeView/HomeView";
import SettingView from "../views/SettingView/SettingView";
import MallView from "../views/MallView";
import localstorageConstants from "../constants/localstorageConstants";
import { useDispatch, useGlobalState } from "../context/StoreProvider";
import userAuthAction from "../actions/userAuthAction";
import userAuthUtils from "../utls/userAuthUtils";
import _ from "lodash";
const Stack = createStackNavigator();
const RouteApp = () => {
  const theme = useContext(ThemeContext);
  const sound = React.useRef(new Audio.Sound());
  const { userAuth } = useGlobalState();
  const dispatch = useDispatch();
  useModalRadio(sound);

  const setConexionSession = async () => {
    await SecureStore.deleteItemAsync(localstorageConstants.AUTH)

  }
  useEffect(() => {
    const fetchData = async () => {
      const auxSession = await userAuthUtils.getConexionSession();
      if (auxSession) {
        if(!userAuth.complete)
          userAuthAction.update(auxSession, dispatch);
      }
      else
        console.log("invalid key");
    }
    fetchData().catch(console.error);
  }, []);


  /**
   * TODO logeo por
   */

  return (
    <Stack.Navigator
      initialRouteName={SceneName.Authentication}
      screenOptions={{
        headerShown: false,
        headerBackTitle: "Volver",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: theme.colors.headerBackground,
        },
        headerTitleStyle: {
          fontFamily: theme.typography.fontFamily.bold,
          fontSize: 20,
          color: theme.colors.text,
        },
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
      }}
    >
      <Stack.Group>
        <Stack.Screen name={SceneName.Authentication} component={LoginView} />
        <Stack.Screen name={SceneName.Registration} component={RegistrationView} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name={SceneName.Home} component={HomeView} />
        <Stack.Screen name={SceneName.Setting} component={SettingView} />
        <Stack.Screen name={SceneName.ProfileScreen} component={ProfileUrbanView} />
        <Stack.Screen name={SceneName.Malls} component={MallView} />
        {/* <Stack.Screen name={SceneName.Notifications} component={Notifications} />
              <Stack.Screen name={SceneName.Settings} component={Settings} /> */}
        <Stack.Screen name={SceneName.Story} component={StoryView} />
        <Stack.Screen name={SceneName.GroupProfile} component={GroupUrbanView} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RouteApp;
