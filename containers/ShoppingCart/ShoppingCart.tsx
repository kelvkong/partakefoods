import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import { useRouter } from "next/router";
import * as React from "react";
import { useCallback, useMemo } from "react";
import { shoppingCartItemListAtom } from "../../atom/cart";
import { ProductTableCell } from "../../components/ShoppingCartItem/ProductTableCell/ProductTableCell";
import { QuantityTableCell } from "../../components/ShoppingCartItem/QuantityTableCell/QuantityTableCell";
import useGetProductionInformation from "../../hook/useGetProductionInformation";
import { ShoppingCartItem } from "../../types/cart";

interface ShoppingCartItemWithDetail {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  total: number;
}

export function ShoppingCart() {
  const { data } = useGetProductionInformation();
  const router = useRouter();
  const [shoppingCartItemList, setShoppingCartItemList] = useAtom(
    shoppingCartItemListAtom
  );
  const resetShoppingCartItemList = useResetAtom(shoppingCartItemListAtom);
  const cartData: ShoppingCartItemWithDetail[] = useMemo(() => {
    const cartMap = new Map<string, ShoppingCartItem>();
    for (const item of shoppingCartItemList) {
      cartMap.set(item.id, item);
    }
    return (data || [])
      .filter((item) => cartMap.has(item.id))
      .map((item) => {
        const cartItem = cartMap.get(item.id); // wont happen
        return {
          id: item.id,
          title: item.title,
          image: item.image,
          price: item.price,
          quantity: cartItem?.quantity || 0,
          total: item.price * (cartItem?.quantity || 0),
        };
      });
  }, [data, shoppingCartItemList]);
  const onCheckout = useCallback(() => {
    let total = 0;
    for (const item of cartData) {
      total += Math.max(0, item.total);
    }
    alert(`Thanks, total price is $${total}`);
  }, [cartData]);
  const onRemoveAll = useCallback(() => {
    resetShoppingCartItemList();
    router.push("/");
  }, [router, resetShoppingCartItemList]);
  const onQuantityChange = useCallback(
    (id: string, val: number) => {
      setShoppingCartItemList((itemList) => {
        const targetItem = itemList.find((item) => item.id === id);
        if (targetItem) {
          targetItem.quantity = val;
          return [...itemList]; // to return new array to trigger re-render...
        }
        return itemList;
      });
    },
    [setShoppingCartItemList]
  );
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Typography variant="h1">Shopping Cart</Typography>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={onCheckout}>
          Checkout
        </Button>
        <Button variant="outlined" onClick={onRemoveAll}>
          Remove all
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartData.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <ProductTableCell title={item.title} image={item.image} />
                <TableCell align="right">{item.price}</TableCell>
                <QuantityTableCell
                  value={item.quantity}
                  onChange={(val) => onQuantityChange(item.id, val)}
                />
                <TableCell align="right">{item.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
