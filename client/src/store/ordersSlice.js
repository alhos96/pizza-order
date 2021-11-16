import { createSlice } from "@reduxjs/toolkit";
import { apiRequestStarted } from "./apiActions";
import _ from "lodash";

const slice = createSlice({
  initialState: {
    dough: "",
    chosenIngredients: [],
    amount: {
      doughPrice: [],
      ingredientsPrice: [],
    },
    pizzas: {
      //delivery price
      total: 5,
      orderInstructions: {
        adress: "",
        paymentUponDelivery: false,
        note: "",
      },
      pizza: [],
    },
    showOrderInfo: false,
  },
  name: "orders",
  reducers: {
    doughChosen: (orders, { payload }) => {
      orders.dough = payload.pickedDough;
      orders.amount.doughPrice.push(payload.price);
    },
    ingredientsChosen: (orders, { payload }) => {
      orders.chosenIngredients = payload.chosenIngredients;
      orders.amount.ingredientsPrice = payload.price;
    },
    pizzaMade: (orders, { payload }) => {
      orders.dough = "";
      orders.chosenIngredients = [];
      orders.amount = {
        doughPrice: [],
        ingredientsPrice: [],
      };
      orders.pizzas.pizza = payload.pizza;
      orders.pizzas.total = orders.pizzas.pizza.map((e) => {
        let price = 5;
        return (price += e.prices);
      });
      orders.pizzas.total = _.sum(orders.pizzas.total);
    },
    pizzaOrdered: (orders, { payload }) => {
      orders.pizzas.orderInstructions.adress = payload.adress;
      orders.pizzas.orderInstructions.note = payload.note;
      orders.pizzas.orderInstructions.paymentUponDelivery = payload.paymentUponDelivery;
    },
    pizzaSavedOnServer: (orders, { payload }) => {
      orders.pizzas.total = 5;
      orders.pizzas.orderInstructions.adress = "";
      orders.pizzas.orderInstructions.note = "";
      orders.pizzas.orderInstructions.paymentUponDelivery = false;
      orders.pizzas.pizza = [];
      orders.showOrderInfo = true;
    },
    infoHidden: (orders, { payload }) => {
      orders.showOrderInfo = false;
    },

    amountIncresed: (orders, { payload }) => {
      orders.pizzas.pizza[payload.index].amount++;
      orders.pizzas.pizza[payload.index].prices =
        orders.pizzas.pizza[payload.index].amount * orders.pizzas.pizza[payload.index].priceForOne;
      orders.pizzas.total = orders.pizzas.pizza.map((e) => {
        let price = 5;
        return (price += e.prices);
      });
      orders.pizzas.total = _.sum(orders.pizzas.total);
    },
    amountDecresed: (orders, { payload }) => {
      if (orders.pizzas.pizza[payload.index].amount > 1) orders.pizzas.pizza[payload.index].amount--;
      orders.pizzas.pizza[payload.index].prices =
        orders.pizzas.pizza[payload.index].amount * orders.pizzas.pizza[payload.index].priceForOne;
      orders.pizzas.total = orders.pizzas.pizza.map((e) => {
        let price = 5;
        return (price += e.prices);
      });
      orders.pizzas.total = _.sum(orders.pizzas.total);
    },
  },
});

export const savePizza = (user, order, url, setError) => (dispatch, getState) => {
  dispatch(
    apiRequestStarted({
      user,
      order,
      url,
      setError,
      onSuccess: pizzaSavedOnServer.type,
    })
  );
};

export const { doughChosen, ingredientsChosen, pizzaMade, pizzaOrdered, pizzaSavedOnServer, infoHidden, amountIncresed, amountDecresed } =
  slice.actions;
export default slice.reducer;
