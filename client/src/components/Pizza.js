import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../store/modalHandlers";
import { Container, Button, Row } from "react-bootstrap";
import { getData } from "./api/getData";
import { doughChosen } from "../store/ordersSlice";

function Pizza() {
  const dispatch = useDispatch();

  //local state
  const [dough, setDough] = useState([]);
  const [pickedDough, setPickedDough] = useState([]);
  const [price, setPrice] = useState("");

  //side effects
  useEffect(() => {
    dough.length === 0 && getData("/dough.json", setDough);
  }, []);
  useEffect(() => {
    //kada user odabere tijesto u redux saljen tijesto i cijenu osim prvi put kad se izrenda komponenta. Tada je ovaj niz manji od 0
    pickedDough.length > 0 && dispatch(doughChosen({ pickedDough, price }));
  }, [pickedDough]);

  //user action handlers
  function handleClick(e) {
    //stavio sam tijesto da bude id diva u kojem je dugme. Na promjenu ovih nizova dispatcam akciju
    setPickedDough(e.target.parentElement.id);
    //stavio sam cijenu da bude id dugmeta
    setPrice(e.target.id);
    dispatch(actions.ingredientsDisplayed({ showIngredients: true }));
  }

  return (
    <Container className="Pizza">
      <h6 className="small-title">PICK A DOUGH</h6>

      {dough &&
        dough.map((dough, index) => {
          return (
            <Row className="pizza-type" key={dough.name}>
              <h5>{dough.name}</h5>
              <p>{dough.desc}</p>
              <div id={dough.name}>
                <Button id={dough.price} className="float-right normal-size-button " size="sm" onClick={handleClick}>
                  +Add
                </Button>
                <p style={{ textAlign: "right", marginTop: "7px", marginRight: "75px" }}>{`$${dough.price}`}</p>
              </div>
              <hr></hr>
            </Row>
          );
        })}
    </Container>
  );
}

export default Pizza;
