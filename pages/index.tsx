import type { NextPage } from "next";
import PageContainer from "../containers/PageContainer/PageContainer";
import { ProductList } from "../containers/ProductList/ProductList";


const Home: NextPage = () => {
  return (
    <PageContainer title='Products'>
      <ProductList />
    </PageContainer>
  );
};

export default Home;
