import React from "react";
import { FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";

import * as cartActions from "../../store/actions/cart";

import ProductItem from "../../components/shop/ProductItem";

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);

  const dispach = useDispatch();

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetailScreen", {
      productId: id,
      productTitle: title,
    });
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price}
          image={itemData.item.imageUrl}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispach(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

export default ProductsOverviewScreen;
