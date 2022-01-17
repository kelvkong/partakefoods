import { atomWithStorage } from "jotai/utils";

export const productIdsInCartAtom = atomWithStorage<string[]>(
  "productIdsInCart",
  []
);
