import { atomWithStorage } from "jotai/utils";
import { ShoppingCartItem } from "../types/cart";

export const shoppingCartItemListAtom = atomWithStorage<ShoppingCartItem[]>(
  "ShoppingCartItemList",
  []
);