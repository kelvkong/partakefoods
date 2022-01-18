import type { NextPage } from "next";
import PageContainer from "../containers/PageContainer/PageContainer";
import { ShoppingCart } from "../containers/ShoppingCart/ShoppingCart";

const Home: NextPage = () => {
  return (
    <PageContainer title="Shopping Cart">
      <ShoppingCart />
    </PageContainer>
  );
};

export default Home;
