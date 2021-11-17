import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/modalHandlers";
import { Button, Modal, Form } from "react-bootstrap";
import { userRegister } from "../../store/usersSlice";
import { loginDisplayed } from "../../store/modalHandlers";
function Register() {
  const dispatch = useDispatch();

  //redux state
  const state = useSelector((state) => state.modals);
  const registered = useSelector((state) => state.users.registrationSuccessfull);

  //local state
  const [error, setError] = useState("");
  const [userInput, setUserInput] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  //sideeffects
  useEffect(() => {
    if (registered) {
      dispatch(
        loginDisplayed({
          showLogin: true,
          showRegister: false,
        })
      );
    }
  }, [registered]);

  //user action handlers
  function handleChange(e) {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(userRegister(userInput.name, userInput.email, userInput.password, userInput.confirmPassword, "/users/register", setError));

    if (registered) {
      dispatch(
        loginDisplayed({
          showLogin: true,
          showRegister: false,
        })
      );
    }
  }

  return (
    <Modal
      centered
      show={state.showRegister}
      onHide={() => {
        dispatch(actions.registerClosed({ showRegister: false }));
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formGroupUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control required onChange={handleChange} name="name" type="username" placeholder="Username" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control required onChange={handleChange} name="email" type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control required onChange={handleChange} name="password" type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control required onChange={handleChange} name="confirmPassword" type="password" placeholder="Confirm Password" />
          </Form.Group>
          <p>{error}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              if (registered) {
                dispatch(
                  loginDisplayed({
                    showLogin: true,
                    showRegister: false,
                  })
                );
              }
            }}
          >
            Have account? Login!
          </Button>
          <Button type="submit" size="sm" variant="primary">
            Register
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default Register;
