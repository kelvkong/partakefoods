import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useUpdateAtom } from "jotai/utils";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { productIdsInCartAtom } from "../../atom/cart";
import { ProductItem } from "../../components/ProductItem/ProductItem";
import useGetProductionInformation from "../../hook/useGetProductionInformation";

export function ProductList() {
  const { data } = useGetProductionInformation();
  const router = useRouter();
  const setProductIdsInCart = useUpdateAtom(productIdsInCartAtom);
  const onClick = useCallback(
    (id: string) => {
      setProductIdsInCart((ids) => {
        ids.push(id);
        return ids;
      });
      router.push("/cart");
    },
    [setProductIdsInCart, router]
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
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
