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

      <HorizontalCardProduct category={"airpodes"} heading={"Airpodes"} />
      <HorizontalCardProduct category={"watches"} heading={"Watches"} />
      <VerticalCardProduct category={"mobiles"} heading={"Mobiles"} />
      <VerticalCardProduct category={"Mouses"} heading={"Mouse"} />
      <VerticalCardProduct category={"earphones"} heading={"Earphones"} />
      <VerticalCardProduct category={"camera"} heading={"Camera"} />
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"} />
      <VerticalCardProduct category={"speakers"} heading={"Speakers"} />
      <VerticalCardProduct category={"televisions"} heading={"Televisions"} />
      <VerticalCardProduct category={"printers"} heading={"Printers"} />
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"} />
    </div>
  );
};

export default Home;
