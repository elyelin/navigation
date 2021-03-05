import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, Button } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
//import { createBottomTabNavigator } from "react-navigation-tabs";
import {createDrawerNavigator} from 'react-navigation-drawer';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Open </Text>
      <Button
        title="Ir a detalle"
        onPress={() => navigation.openDrawer()}
      />
    </View>
  );
};

HomeScreen.navigationOptions = {
  drawerIcon: ({tintColor}) => {
    return <Ionicons name='ios-information-circle' size={20} color={tintColor} />
  },
  title: "Home",
};

const DetalleScreen = ({ navigation }) => {
  const [cont, setCont] = useState(0);
  const incrementar = () => setCont(cont + 1);

  useEffect(() => {
    navigation.setParams({ incrementar });
  }, [cont]);
  const lala = navigation.getParam("lala", "Valor por defecto");
  return (
    <View style={styles.container}>
      <Text>Soy el Detalle {cont}</Text>
      <Button title="Volver" onPress={() => navigation.navigate("MiModal")} />
    </View>
  );
};

DetalleScreen.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam("title", "Cargando..."),
    headerRight: (
      <Button
        onPress={navigation.getParam("incrementar")}
        title="Mas 1"
        color="#555"
      />
    ),
  };
};

const AppNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Detalle: {
      screen: DetalleScreen,
    },
  },
  {
    initialRouteName: "Home",  
    }),
  

const RootStack = createStackNavigator(
  {
    Main: AppNavigator,
    MiModal: () => <Text>LALA</Text>,
  },
  {
    mode: "modal",
    headerMode: "none",
  }
);

export default createAppContainer(RootStack);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
