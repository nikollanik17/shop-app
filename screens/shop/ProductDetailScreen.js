import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
} from "react-native";

import Colors from "../../constants/Colors";

import { useSelector, useDispatch } from "react-redux";

import * as cartActions from "../../store/actions/cart";
import cart from "../../store/reducers/cart";

const ProductDetailScreen = ({ route, ...props }) => {
  const { productId } = route.params;

  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );

  const dispach = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          title="Add to cart"
          onPress={() => {
            dispach(cartActions.addToCart(selectedProduct));
          }}
          color={Colors.primary}
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "open-sans-bold",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
    fontFamily: "open-sans",
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
});

export default ProductDetailScreen;
