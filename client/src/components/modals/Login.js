import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/modalHandlers";
import { Button, Modal, Form } from "react-bootstrap";
import { userLogin } from "../../store/usersSlice";

function Login() {
  const dispatch = useDispatch();

  //redux state
  const state = useSelector((state) => state.modals);
  const pizzas = useSelector((state) => state.orders.pizzas.pizza);
  const loggedIn = useSelector((state) => state.users.loggedIn);
  const isJustRegistered = useSelector((state) => state.users.registrationSuccessfull);

  //local state
  const [userInput, setUserInput] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  //side effects
  useEffect(() => {
    //ugasi llogin modal samo ako se user uspjesno logovao, cleanup ocisti potencijalni error
    loggedIn && dispatch(actions.loginClosed({ showLogin: false }));
    return setError("");
  }, [loggedIn]);

  //user action handlers
  function handleChange(e) {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(userLogin(userInput.email, userInput.password, "/users/login", setError));
  }

  return (
    <Modal
      centered
      show={state.showLogin}
      onHide={() => {
        dispatch(actions.loginClosed({ showLogin: false }));
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {
            // ako se user tek registrovao ili ako je dosao nelogovan klikom na buy dugme
            isJustRegistered ? "Registraiton successful, login" : pizzas.length > 0 ? "Login to finish order" : "Login"
          }
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={handleChange} name="email" type="email" placeholder="Enter email" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={handleChange} name="password" type="password" placeholder="Password" required />
          </Form.Group>
          <span className="error">{error}</span>
        </Modal.Body>
        <Modal.Footer>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              dispatch(actions.registerDisplayed({ showLogin: false, showRegister: true }));
            }}
          >
            No account? Register!
          </Button>
          <Button type="submit" size="sm" variant="primary">
            Login
          </Button>
        </Modal.Footer>{" "}
      </Form>
    </Modal>
  );
}

export default Login;
