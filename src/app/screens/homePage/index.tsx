import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setPopularDishes } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)), // bu setPopularDishes => reducer
});

export default function HomePage() {
  const { setPopularDishes } = actionDispatch(useDispatch());   /** Bu setPopularDishes esa bizning command **/

  useEffect(() => {
    const product = new ProductService();
    product.getProducts({
      page: 1,
      limit: 4,
      order: "productViews",
      productCollection: ProductCollection.DISH,
    })
      .then((data) => {
        setPopularDishes(data);
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}


/** 
  yuqorida biz kiritgan malumotlar yani backend dan kelishi kerak bolgan malumotlar reducer ga dispatch lar orqali kirib kelyapti, va biz dispatch lar orqali setPopularDishes reducerga malumot ni payload qilyabmiz, va biz yuklagan malumot actionni payload qismidan qabul qilinyapti va state dagi setPopularDishes ni qiymatini ozgartiryapti.
  Selector esa bizga eng oxirgi ozgargan qiymatni olib beryapti
**/