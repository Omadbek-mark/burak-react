import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setPopularDishes } from "./slice";
import { retrieveNewDishes, retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)), // bu setPopularDishes => reducer
});

const popularDishesRetriever = createSelector(
retrievePopularDishes, (popularDishes) => ({ popularDishes })
);

export default function HomePage() {
  const { setPopularDishes } = actionDispatch(useDispatch());
  /** Bu setPopularDishes esa bizning command **/
  const { popularDishes } = useSelector(popularDishesRetriever); 

  console.log(process.env.REACT_APP_API_URL)

  useEffect(() => {}, []);

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