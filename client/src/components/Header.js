import React, { useEffect, useState } from "react";
import logo from "../assets/img/logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { loginDisplayed } from "../store/modalHandlers";
import { logOut } from "../store/usersSlice";
import { Navbar, Dropdown, DropdownButton, Image, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();

  //redux state
  const user = useSelector((state) => state.users.user);
  const pizzas = useSelector((state) => state.orders.pizzas.pizza);

  //local state
  const [loggedInUser, setLoggedInUser] = useState("");

  //side effects
  useEffect(() => {
    if (user) sessionStorage.setItem("user", user);
    setLoggedInUser(sessionStorage.getItem("user"));
  }, [user]);

  return (
    <Navbar className="Navbar" sticky="top" expand={false}>
      <Navbar.Brand href="#">
        <Image src={logo} fluid />
      </Navbar.Brand>
      <div className="icons-wrapp">
        {
          // ako nizz pizzas nije prazan nesto ima u korpi
          pizzas.length > 0 ? (
            <i
              onClick={() => {
                history.push("/cart");
              }}
              className="bi bi-cart-fill"
              style={{ fontSize: "1.5rem", display: "inline" }}
            ></i>
          ) : (
            <i
              onClick={() => {
                history.push("/cart");
              }}
              className="bi bi-cart4"
              style={{ fontSize: "1.5rem", display: "inline" }}
            ></i>
          )
        }

        {loggedInUser ? (
          <>
            <i className="bi bi-person" style={{ fontSize: "1.5rem", display: "inline" }}></i>
            <DropdownButton
              style={{ display: "inline" }}
              size="sm"
              key="start"
              id="dropdown-button-drop-start"
              drop="start"
              variant="primary"
              title=""
            >
              <Dropdown.Item
                eventKey="1"
                onClick={() => {
                  history.push("/order/order-history");
                }}
              >
                Order history
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="2"
                onClick={() => {
                  dispatch(logOut({ user: "", loggedIn: false }));
                  sessionStorage.removeItem("user");
                  setLoggedInUser("");
                }}
              >
                Logout
              </Dropdown.Item>
            </DropdownButton>
          </>
        ) : (
          <Button
            className="normal-size-button"
            variant="primary"
            size="sm"
            onClick={() => {
              dispatch(
                loginDisplayed({
                  showLogin: true,
                  showRegister: false,
                })
              );
            }}
          >
            Login
          </Button>
        )}
      </div>
    </Navbar>
  );
}

export default Header;
