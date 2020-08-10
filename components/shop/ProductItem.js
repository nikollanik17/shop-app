import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

const ProductItem = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.product}>
      <TouchableCmp onPress={props.onSelect} useForeground>
        <View style={styles.touchable}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: props.image }} />
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
          </View>
          <View style={styles.actions}>{props.children}</View>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 6,
    borderRadius: 10,
    backgroundColor: "#fff",
    height: 300,
    margin: 20,
  },
  touchable: {
    overflow: "hidden",
    borderRadius: 10,
  },
  imageContainer: {
    overflow: "hidden",
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
    fontFamily: "open-sans-bold",
  },
  price: {
    fontSize: 14,
    color: "#888",
    fontFamily: "open-sans",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "23%",
    paddingHorizontal: 30,
  },
  details: {
    alignItems: "center",
    height: "17%",
    padding: 10,
  },
});

export default ProductItem;
