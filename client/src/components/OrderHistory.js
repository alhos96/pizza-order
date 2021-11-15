import React, { useState, useEffect } from "react";
import { Row, Button, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { getData } from "./api/getData";

function OrderHistory() {
  //redux state
  const user = useSelector((state) => state.users.user);

  //local state
  const [loggedInUser, setLoggedInUser] = useState(sessionStorage.getItem("user"));
  const [orderHistory, setOrderHistory] = useState(null);

  //send order to server
  useEffect(() => {
    setLoggedInUser(sessionStorage.getItem("user"));
    if (user) sessionStorage.setItem("user", user);
  }, [user]);
  useEffect(() => {
    getData("/order/order-history", setOrderHistory, user);
  }, []);

  return (
    <Card className="Pizza">
      <Card.Header as="h5">Order history</Card.Header>
      <Card.Body>
        {orderHistory &&
          orderHistory.map((order, i) => {
            let date = moment(order.createdAt).format("YYYY-MM-DD hh:mm");

            return order.pizzas.map((pizza, i) => {
              return (
                <Row className="chechkout-items" style={{ display: "flex", marginTop: "15px" }}>
                  <div className="flexed">
                    <h5>{pizza.dough}</h5>
                  </div>
                  <p>
                    {" "}
                    {pizza.ingredients.map((ingr, i) => {
                      return ingr + ", ";
                    })}{" "}
                  </p>
                  <div style={{ flex: "2", minWidth: "90px" }}>
                    <p style={{ fontSize: "16px", fontWeight: "bold" }} id="price">
                      {`${pizza.prices}$`}
                    </p>
                    <p id="date">{date}</p>{" "}
                  </div>
                  <hr></hr>
                </Row>
              );
            });
          })}
      </Card.Body>
    </Card>
  );
}

export default OrderHistory;

/* order.pizzas.map((pizza, i) => {
  <Row className="chechkout-items" style={{ display: "flex", marginTop: "15px" }}>
    <div className="flexed">
      <h5>{pizza.dough}</h5>
    </div>
    {pizza.ingredients.map((ingr, i) => {
      <p>{`${ingr},`}</p>;
    })}
    <div style={{ flex: "2", minWidth: "90px" }}>
      <p style={{ fontSize: "16px", fontWeight: "bold" }} id="price">
        {`${pizza.prices}$`}
      </p>
      <p id="date">17.10.2021 17:10</p>{" "}
    </div>
    <hr></hr>
  </Row>;
});
 */
