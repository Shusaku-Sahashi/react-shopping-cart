import { useState } from "react";
import { useQuery } from "react-query";
// Components
import { Wrapper, StyledButton } from "./App.styles";
import LinerProgress from "@material-ui/core/LinearProgress";
import Drawer from "@material-ui/core/Drawer";
import Badge from "@material-ui/core/Badge";
import Item from "./Item/Item";
import { Grid } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import Cart from "./Cart/Cart";

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  const handleAddToCard = (clickedItem: CartItemType) =>
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      return [...prev, { ...clickedItem, amount: 1 }];
    });

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((act: number, item) => act + item.amount, 0);

  const removeFromCart = (id: number) => null;

  if (isLoading) return <LinerProgress />;
  if (error) return <div>Something went wrong ...</div>;

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClick={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCard}
          removeFromCart={removeFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error" />
        <AddShoppingCart />
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCard} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
