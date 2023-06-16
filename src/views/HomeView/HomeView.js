import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import { Dimensions, Image, View, Text, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import SceneName from "../../constants/SceneName";
import EntertainmentView from "../../views/EntertainmentView";
import AvenuesView from "../../views/AvenuesView";
import ExperienceView from "../../views/ExperienceView";
import MagicTownsView from "../../views/MagicTownsView";
import EditProfileView from "../../views/EditProfileView";
import MallView from "../MallView";
import NavbarTabHeader from "../../components/NavbarTabHeader/NavbarTabHeader";
import TopHeader from "../../components/TopHeader/TopHeader";

import EntertainmentIconActive from "../../assets/icons/menu/home-active.svg";
import EntertainmentIcon from "../../assets/icons/menu/home.svg";
import AvenuesIcon from "../../assets/icons/menu/capacitacion.svg";

import ExperienceIconActive from "../../assets/icons/menu/experience-active.svg";
import ExperienceIcon from "../../assets/icons/menu/beneficios.svg";
import MagicTownsIcon from "../../assets/icons/menu/premiun.svg";
import MallsIcon from "../../assets/icons/menu/directorio.svg";

const Tab = createMaterialTopTabNavigator();
const screenWidth = Dimensions.get("window").width;

const HomeView = () => {
  const themeContext = useContext(ThemeContext);
  //TODO render al abrir para que no carge los videos iniciando
  const RenderMagicTowns = (props) => {
    return props.navigation.isFocused() ? <MagicTownsView /> : <></>;
    //return props.navigation.isFocused() ? <></> : <></>;
  };

  const RenderEntertainment = (props) => {
    return props.navigation.isFocused() ? <EntertainmentView /> : <></>;
    //return props.navigation.isFocused() ? <></> : <></>;
  };
  
  const RenderExperience = (props) => {
    return props.navigation.isFocused() ? <ExperienceView /> : <></>;
    //return props.navigation.isFocused() ? <></> : <></>;
  };

  return (
    <>
      <TopHeader />
      <Tab.Navigator
        tabBar={(props) => <NavbarTabHeader {...props} />}
        initialLayout={{ width: screenWidth }}
        screenOptions={{
          tabBarInactiveTintColor: themeContext.colors.text,
        }}
        initialRouteName={SceneName.Entertainment}
      >
        <Tab.Screen
          name={SceneName.Entertainment}
          options={{
            mostrarok: true,
            tabBarIcon: ({ focused, color }) =>
              <View style={styles.viewMenu}>
                {focused ? (
                  <EntertainmentIconActive width="30" height="30" />
                ) : (
                  <EntertainmentIcon fill={color} width="30" height="30"/>
                )}
                <Text style={{...styles.textMenu, color: focused ? "gold" : "white"}}>Inicio</Text>
              </View>
          }}
          component={RenderEntertainment}
        />
        <Tab.Screen
          name={SceneName.Avenues}
          options={{
            tabBarIcon: ({ focused, color }) =>
              <View style={styles.viewMenu}>
                {focused ? <AvenuesIcon fill={"gold"} width="25" height="25" /> : <AvenuesIcon fill={color} width="30" height="30" />}
                <Text style={{...styles.textMenu, color: focused ? "gold" : "white"}}>Cursos</Text>
              </View>
          }}
          component={AvenuesView}
        />
        <Tab.Screen
          name={SceneName.Experience}
          options={{
            tabBarIcon: ({ focused, color }) =>
              <View style={styles.viewMenu}>
                {focused ? (
                  <ExperienceIcon fill={"gold"} width="30" height="30"/>
                ) : (
                  <ExperienceIcon fill={color} width="30" height="30"/>
                )}
                <Text style={{...styles.textMenu, color: focused ? "gold" : "white"}}>Descuentos</Text>
              </View>
          }}
          component={RenderExperience}
        />
        <Tab.Screen
          name={SceneName.MagicTowns}
          options={{
            tabBarIcon: ({ focused, color }) =>
              <View style={styles.viewMenu}>
                {focused ? (
                  <MagicTownsIcon fill={"gold"} width="30" height="30"/>
                ) : (
                  <MagicTownsIcon fill={color} width="30" height="30"/>
                )}
                <Text style={{...styles.textMenu, color: focused ? "gold" : "white"}}>Premium</Text>
              </View>
          }}
          component={RenderMagicTowns}
        />
        <Tab.Screen
          name={SceneName.Malls}
          options={{
            tabBarIcon: ({ focused, color }) => 
              <View style={styles.viewMenu}>
                {focused ? (
                  <MallsIcon fill={"gold"} width="30" height="30" />
                ) : (
                  <MallsIcon fill={color} width="30" height="30" />
                )}
                <Text style={{...styles.textMenu, color: focused ? "gold" : "white"}}>Directorio</Text>
              </View>
          }}
          component={MallView}
        />
      </Tab.Navigator>
    </>
  );
};
const styles = StyleSheet.create({
  textMenu: {
    fontSize: 8, textAlign: "center", paddingTop: 3
  },
  viewMenu: {
    alignItems: "center",
  }
});
export default HomeView;
