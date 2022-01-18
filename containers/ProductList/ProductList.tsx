import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";
import { useCallback } from "react";
import { shoppingCartItemListAtom } from "../../atom/cart";
import { ProductItem } from "../../components/ProductItem/ProductItem";
import useGetProductionInformation from "../../hook/useGetProductionInformation";

export function ProductList() {
  const { data } = useGetProductionInformation();
  const [shoppingCartItemList, setShoppingCartItemList] = useAtom(
    shoppingCartItemListAtom
  );
  const onClick = useCallback(
    (id: string) => {
      setShoppingCartItemList((items) => {
        const arr = [...items, { id, quantity: 1 }];
        return arr;
      });
    },
    [setShoppingCartItemList]
  );
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Typography variant="h1">All Cookies</Typography>
      <Grid container spacing={2}>
        {data?.map((item, index) => {
          return (
            <Grid key={`p-${index}`} item xs={6} md={4}>
              <ProductItem
                image={item.image}
                tag={item.tag}
                title={item.title}
                price={`$${item.price}`}
                onClick={() => onClick(item.id)}
                disabled={
                  shoppingCartItemList.findIndex(
                    (cartItem) => cartItem.id === item.id
                  ) !== -1
                }
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
