import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HeaderButton from "../components/UI/HeaderButton";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";

import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

import PRODUCTS from "../data/dummy-data";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "#fff" : Colors.primary,
};

const ProductsNavStack = createStackNavigator();

const ProductsNavigator = () => {
  return (
    <ProductsNavStack.Navigator screenOptions={defaultNavOptions}>
      <ProductsNavStack.Screen
        name="ProductsOverviewScreen"
        component={ProductsOverviewScreen}
        options={({ route, navigation }) => ({
          title: "All products",
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Cart"
                iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                onPress={() => {
                  navigation.navigate("CartScreen");
                }}
              />
            </HeaderButtons>
          ),
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <ProductsNavStack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={({ route }) => ({
          title: route.params.productTitle,
        })}
      />
      <ProductsNavStack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{ title: "Your Cart" }}
      />
    </ProductsNavStack.Navigator>
  );
};

const OrdersStackNav = createStackNavigator();

const OrdersNavigator = () => {
  return (
    <OrdersStackNav.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNav.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={({ route, navigation }) => ({
          title: "Your Orders",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
    </OrdersStackNav.Navigator>
  );
};

const UserProductsStack = createStackNavigator();

const AdminNavigator = () => {
  return (
    <UserProductsStack.Navigator screenOptions={defaultNavOptions}>
      <UserProductsStack.Screen
        name="UserProductsScreen"
        component={UserProductsScreen}
        options={({ route, navigation }) => ({
          title: "Your Products",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Add"
                iconName={
                  Platform.OS === "android" ? "md-create" : "ios-create"
                }
                onPress={() => {
                  navigation.navigate("EditProductScreen");
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <UserProductsStack.Screen
        name="EditProductScreen"
        component={EditProductScreen}
        options={({ route, navigation }) => ({
          title: route.params
            ? route.params.productId
              ? "Edit Product"
              : "Add Product"
            : "Add Product",
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Save"
                iconName={
                  Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
                }
                onPress={() => {
                  navigation.navigate("EditProductScreen");
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
    </UserProductsStack.Navigator>
  );
};

const ShopStackNav = createDrawerNavigator();

const ShopNavigator = () => {
  return (
    <NavigationContainer>
      <ShopStackNav.Navigator
        drawerContentOptions={{
          activeTintColor: Colors.primary,
        }}
      >
        <ShopStackNav.Screen
          name="Shop"
          component={ProductsNavigator}
          options={{
            drawerIcon: (drawerConfing) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                size={23}
                color={drawerConfing.activeTintColor}
              />
            ),
          }}
        />
        <ShopStackNav.Screen
          name="Orders"
          component={OrdersNavigator}
          options={{
            drawerIcon: (drawerConfing) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-list" : "ios-list"}
                size={23}
                color={drawerConfing.activeTintColor}
              />
            ),
          }}
        />
        <ShopStackNav.Screen
          name="Admin"
          component={AdminNavigator}
          options={{
            drawerIcon: (drawerConfing) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-create" : "ios-create"}
                size={23}
                color={drawerConfing.activeTintColor}
              />
            ),
          }}
        />
      </ShopStackNav.Navigator>
    </NavigationContainer>
  );
};

export default ShopNavigator;
