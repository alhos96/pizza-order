import React, { useState, useEffect } from "react";
import { Container, Card, Form, Row, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { pizzaOrdered, savePizza, infoHidden, amountIncresed, amountDecresed } from "../store/ordersSlice";
import { addAdress } from "../store/adressHandlers";
import { getData } from "./api/getData";

function Order() {
  const dispatch = useDispatch();
  const history = useHistory();

  //from redux
  const user = useSelector((state) => state.users.user);
  const addedAdress = useSelector((state) => state.adress.addedAdress);
  const pizzas = useSelector((state) => state.orders.pizzas);
  const orderInstructionsTrigger = useSelector((state) => state.orders.pizzas.orderInstructions);
  const total = useSelector((state) => state.orders.pizzas.total);
  const showOrderInfo = useSelector((state) => state.orders.showOrderInfo);

  //local states
  const [loggedInUser, setLoggedInUser] = useState("");
  const [userAdresses, setUserAdresses] = useState([]);
  //eslint-disable-next-line
  const [delivery, setDelivery] = useState(5);
  const [error, setError] = useState("");
  const [newAdress, setNewAdress] = useState({ adress: "", floor: "" });
  const [orderInstructions, setOrderInstructions] = useState({ adress: "", paymentUponDelivery: false, note: "" });

  //side effects
  useEffect(() => {
    if (user) sessionStorage.setItem("user", user);
    setLoggedInUser(sessionStorage.getItem("user"));
  }, [user]);

  useEffect(() => {
    getData("/adress/get-adresses", setUserAdresses, loggedInUser);
  }, [loggedInUser, addedAdress]);

  useEffect(() => {
    //when user ads order instructions send order to database
    if (orderInstructionsTrigger.adress !== "") dispatch(savePizza(loggedInUser, pizzas, "/order/finish-order", setError));
    //eslint-disable-next-line
  }, [orderInstructionsTrigger]);

  //user action handlers
  function onChangeForNewAdress(e) {
    setNewAdress({ ...newAdress, [e.target.name]: e.target.value });
  }
  function onAddNewAdress(e) {
    e.preventDefault();
    dispatch(addAdress(loggedInUser, newAdress, setError, "/adress/add-adress"));
    document.getElementById("add-new-adress-form").reset();
  }
  function onPickAdress(e) {
    orderInstructions.adress = e.target.id;
  }
  function onPaymentType(e) {
    orderInstructions.paymentUponDelivery = !orderInstructions.paymentUponDelivery;
  }
  function onNoteType(e) {
    setOrderInstructions({ ...orderInstructions, note: e.target.value });
  }

  function onOrder(e) {
    e.preventDefault();
    if (!orderInstructions.adress) {
      setError("Please chose adress");
    } else {
      let { adress, paymentUponDelivery, note } = orderInstructions;

      dispatch(pizzaOrdered({ adress, paymentUponDelivery, note }));
      setError("");
    }
  }

  function clickPlus(e) {
    dispatch(amountIncresed({ index: e.target.id }));
  }
  function clickMinus(e) {
    dispatch(amountDecresed({ index: e.target.id }));
  }

  return (
    <Container className="Order">
      <Form onSubmit={onOrder}>
        <div className="row">
          {/* User adresses mapped */}
          <Card className="col col-12 col-md-5 border-0">
            <h5 className="small-title">Address to deliver</h5>
            <Card.Body>
              <div key="default-radio" className="mb-3">
                {userAdresses &&
                  userAdresses.map((adress, i) => (
                    <Card className="mb-1" key={`radio-${adress.adress}; ${adress.floor}`}>
                      <Card.Body>
                        <div className="d-flex">
                          <Form.Check
                            onChange={onPickAdress}
                            type="radio"
                            id={`${adress.adress}; ${adress.floor}`}
                            name="group-radio-adress"
                            label={`Adress: ${adress.adress}; Floor: ${adress.floor}`}
                          />
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
              </div>
              {/* User adresses mapped end */}

              {/* Form for entering new adress */}
              <Card>
                <Card.Body>
                  <Form id="add-new-adress-form">
                    <label className="mb-2" htmlFor="adress">
                      Adress:
                    </label>
                    <Form.Control onChange={onChangeForNewAdress} className="mb-3" name="adress" type="text" placeholder="Add adress" />
                    <label className="mb-2" htmlFor="floor">
                      Floor:
                    </label>

                    <Form.Control onChange={onChangeForNewAdress} className="mb-2" name="floor" type="text" placeholder="Add floor" />
                    <Button onClick={onAddNewAdress} type="submit" className=" float-right normal-size-button m-1" size="sm">
                      Add
                    </Button>
                    <Button className="float-right normal-size-button m-1" size="sm">
                      Cancel
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
              {/* Form for entering new adress end*/}
            </Card.Body>
          </Card>

          <Card id="payment" className="col col-12 col-md-7 border-0">
            <Card.Header className="d-flex" as="section">
              <h5>Payment </h5>
              <div style={{ paddingLeft: "20px" }} key="default-radio" className="mb-3">
                <div className="d-flex">
                  <Form.Check
                    checked
                    onChange={onPaymentType}
                    type="checkbox"
                    id="default-checkbox-payment"
                    name="Upon delivery"
                    label="Upon delivery"
                  />
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <h6 className="small-title">YOUR ORDER</h6>

              {/* Selected dough, price and number input to increase the amount */}
              {pizzas.pizza.map((pizza, i) => {
                return (
                  <Row key={i} className="cart-items" style={{ display: "flex" }}>
                    <div className="d-flex item-name">
                      <h5>{pizza.dough}</h5>
                      <p>${pizza.prices.toFixed(2)}</p>
                      <div className="counter-wrapp" style={{ width: "80px" }}>
                        <Button onClick={clickMinus} id={i} size="sm">
                          -
                        </Button>

                        <input
                          className="d-flex counter-input"
                          style={{ width: "80%", height: "100%", textAlign: "center" }}
                          type="text"
                          value={pizza.amount}
                          readOnly
                        />

                        <Button onClick={clickPlus} id={i} size="sm">
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
                );
              })}

              {/* checkout */}
              <Row className="chechkout-items" style={{ display: "flex", marginTop: "15px" }}>
                <div className="d-flex">
                  <p id="delivery">Delivery</p>
                  <p id="price">{delivery.toFixed(2)}</p>
                </div>
                <hr></hr>
                <div className="d-flex">
                  <p id="total">
                    <strong>TOTAL</strong>
                  </p>
                  <p id="price">
                    <strong>${total.toFixed(2)}</strong>
                  </p>
                </div>
              </Row>
              <hr></hr>
              <Form.Control onChange={onNoteType} as="textarea" placeholder="Leave an optional note" />
              {error && (
                <div className="alert alert-warning" role="alert">
                  <p>{error}</p>
                </div>
              )}
              {showOrderInfo ? (
                <div className="alert alert-success" role="alert">
                  <p> Order is on it's way</p>
                  <Button
                    onClick={() => {
                      history.push("/");
                      dispatch(infoHidden());
                    }}
                    className="normal-size-button centered mt-2"
                    size="sm"
                  >
                    Home
                  </Button>
                </div>
              ) : (
                <Button onClick={onOrder} type="submit" className="normal-size-button centered mt-2" size="sm">
                  Order
                </Button>
              )}
            </Card.Body>
          </Card>
        </div>
      </Form>
    </Container>
  );
}

export default Order;
