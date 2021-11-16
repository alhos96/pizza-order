import React, { useEffect, useState } from "react";
import { Container, Button, Row } from "react-bootstrap";
import { loginDisplayed } from "../store/modalHandlers";
import { amountIncresed, amountDecresed } from "../store/ordersSlice";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function Cart() {
  const history = useHistory();
  const dispatch = useDispatch();

  // redux state
  const pizzas = useSelector((state) => state.orders.pizzas.pizza);
  const user = useSelector((state) => state.users.user);
  const total = useSelector((state) => state.orders.pizzas.total);

  //local state
  const delivery = 5;
  const [loggedInUser, setLoggedInUser] = useState("");

  //side effects
  useEffect(() => {
    if (user) sessionStorage.setItem("user", user);
    setLoggedInUser(sessionStorage.getItem("user"));
  }, [user]);

  //user action handlers
  function handleBuy() {
    //ako user nije logovan prikazi modal
    if (!loggedInUser) {
      dispatch(
        loginDisplayed({
          showLogin: true,
          showRegister: false,
        })
      );
    } else {
      history.push("/order/finish-order");
    }
  }
  function clickPlus(e) {
    dispatch(amountIncresed({ index: e.target.id }));
  }
  function clickMinus(e) {
    dispatch(amountDecresed({ index: e.target.id }));
  }

  return (
    <Container className="Cart">
      <h6 className="small-title">YOUR ORDER</h6>

      {/*    */}

      {pizzas.length > 0 ? (
        <>
          {pizzas.map((pizza, i) => {
            let num = 1;
            return (
              <>
                {" "}
                <Row className="cart-items" style={{ display: "flex" }}>
                  <div className="flexed item-name">
                    <h5>{pizza.dough}</h5>
                    <p>${pizza.prices.toFixed(2)}</p>
                    <div className="counter-wrapp" style={{ width: "80px" }}>
                      <Button id={i} onClick={clickMinus} size="sm">
                        -
                      </Button>

                      <input
                        className="flexed counter-input"
                        style={{ width: "80%", height: "100%", textAlign: "center" }}
                        type="text"
                        value={pizza.amount}
                        readOnly
                      ></input>
                      <Button id={i} onClick={clickPlus} id={i} size="sm">
                        +
                      </Button>
                    </div>
                  </div>
                  <p>
                    {pizza.ingredients.length > 0 &&
                      pizza.ingredients.map((ingredient, i) => {
                        return `${ingredient}, `;
                      })}
                  </p>
                </Row>
              </>
            );
          })}

          <Row className="chechkout-items" style={{ display: "flex", marginTop: "15px" }}>
            <div className="flexed">
              <p id="delivery">Delivery</p>
              <p id="price">${delivery.toFixed(2)}</p>
            </div>
            <hr></hr>
            <div className="flexed">
              <p id="total" className="bold">
                TOTAL
              </p>
              <p className="bold" id="price">
                ${total.toFixed(2)}
              </p>
            </div>
          </Row>
          <Button className="normal-size-button float-right " id="buy-button" size="sm" onClick={handleBuy}>
            Buy
          </Button>
        </>
      ) : (
        /*  */

        <div style={{ textAlign: "center" }}>
          {" "}
          <i
            onClick={() => {
              history.push("/cart");
            }}
            className="bi bi-cart-plus"
            style={{ fontSize: "10rem", display: "inline", opacity: 0.5 }}
          ></i>
        </div>
      )}

      {/* Selected dough, price and number input to increase the amount */}
    </Container>
  );
}

export default Cart;
