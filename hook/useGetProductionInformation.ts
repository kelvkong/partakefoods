import axios from "axios";
import { useQuery } from "react-query";
import { ProductType } from "../types/product";

export const useGetProductionInformation = () => {
  return useQuery(
    "products",
    async () => {
      const res = await axios.get("/api/products");
      return res.data as ProductType[];
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
};

export default useGetProductionInformation;
