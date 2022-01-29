import React, { useState, useEffect } from "react";
import { Row, Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import moment from "moment";
import { getData } from "./api/getData";

function OrderHistory() {
  //redux state
  const user = useSelector((state) => state.users.user);

  //local state
  const [loggedInUser, setLoggedInUser] = useState(sessionStorage.getItem("user"));
  const [orderHistory, setOrderHistory] = useState(null);
  const [visibleOrders, setVisibleOrders] = useState(4);

  //send order to server
  useEffect(() => {
    setLoggedInUser(sessionStorage.getItem("user"));
    if (user) sessionStorage.setItem("user", user);
  }, [user]);

  useEffect(() => {
    getData("/order/order-history", setOrderHistory, loggedInUser);
    //eslint-disable-next-line
  }, []);

  return (
    <Card className="Pizza">
      <Card.Header as="h5">Order hisstory</Card.Header>
      <Card.Body>
        {orderHistory &&
          //eslint-disable-next-line
          orderHistory.map((order, i) => {
            let date = moment(order.createdAt).format("YYYY-MM-DD hh:mm");
            if (i < visibleOrders) {
              return order.pizzas.map((pizza, i) => {
                return (
                  <Row key={`${i} ${pizza.dough}`} className="chechkout-items" style={{ display: "flex", marginTop: "15px" }}>
                    <div className="d-flex">
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
                        {`${pizza.prices.toFixed(2)}$`}
                      </p>
                      <p id="date">{date}</p>{" "}
                    </div>
                    <hr></hr>
                  </Row>
                );
              });
            }
          })}
      </Card.Body>
      <Card.Footer style={{ textAlign: "center" }}>
        <Button
          style={{ marginRight: "10px" }}
          size="sm"
          onClick={() => {
            console.log(visibleOrders);
            setVisibleOrders((e) => e + 4);
          }}
        >
          Load more
        </Button>
        <Button
          style={{ marginLeft: "10px" }}
          size="sm"
          onClick={() => {
            console.log(visibleOrders);
            if (visibleOrders > 4) {
              setVisibleOrders((e) => e - 4);
            }
          }}
        >
          Show less
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default OrderHistory;
