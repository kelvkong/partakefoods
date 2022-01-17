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
import { useAtomValue, useResetAtom } from "jotai/utils";
import { useRouter } from "next/router";
import * as React from "react";
import { useCallback, useMemo } from "react";
import { productIdsInCartAtom } from "../../atom/cart";
import { ProductTableCell } from "../../components/ShoppingCartItem/ProductTableCell/ProductTableCell";
import useGetProductionInformation from "../../hook/useGetProductionInformation";
export function ShoppingCart() {
  const { data } = useGetProductionInformation();
  const router = useRouter();
  const productIdsInCart = useAtomValue(productIdsInCartAtom);
  const resetProductIdsInCart = useResetAtom(productIdsInCartAtom);
  const cartData = useMemo(() => {
    const idSet = new Set(productIdsInCart);
    return (data || []).filter((item) => idSet.has(item.id));
  }, [data, productIdsInCart]);
  const onCheckout = useCallback(() => {
    let total = 0;
    for (const item of cartData) {
      total += item.price;
    }
    alert(`Thanks, total price is $${total}`);
  }, [cartData]);
  const onRemoveAll = useCallback(() => {
    resetProductIdsInCart();
    router.push("/");
  }, [router, resetProductIdsInCart]);
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Typography variant="h1">Shopping Cart</Typography>
      <Stack spacing={2} direction='row'>
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
                key={item.title}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <ProductTableCell title={item.title} image={item.image} />
                </TableCell>
                <TableCell align="right">${item.price}</TableCell>
                <TableCell align="right">1</TableCell>
                <TableCell align="right">${item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
