import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />

      <HorizontalCardProduct category={"airpodes"} heading={"noob airpodes"} />
      <HorizontalCardProduct category={"watches"} heading={"sasti watches"} />
      <VerticalCardProduct category={"mobiles"} heading={"su kam mobiles"} />
      <VerticalCardProduct category={"Mouses"} heading={"jinka mouse"} />
      <VerticalCardProduct category={"earphones"} heading={"earphones"} />
      <VerticalCardProduct category={"camera"} heading={"camera"} />
      <VerticalCardProduct category={"refrigerator"} heading={"refrigerator"} />
      <VerticalCardProduct category={"speakers"} heading={"speakers"} />
      <VerticalCardProduct category={"televisions"} heading={"televisions"} />
      <VerticalCardProduct category={"printers"} heading={"printers"} />
      <VerticalCardProduct category={"trimmers"} heading={"trimmers"} />
    </div>
  );
};

export default Home;
