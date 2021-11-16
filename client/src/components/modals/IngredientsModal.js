import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/modalHandlers";
import { Button, Modal, Form } from "react-bootstrap";
import glutenfree from "../../assets/img/glutenfree.svg";
import { ingredientsChosen, pizzaMade } from "../../store/ordersSlice";
import { getData } from "../api/getData";

export default function IngredientsModal() {
  const dispatch = useDispatch();

  //redux state
  const state = useSelector((state) => state.modals);
  const orders = useSelector((state) => state.orders);

  //local state
  const [ingredients, setIngredients] = useState([]);
  const [checkedState, setCheckedState] = useState([]);
  const [pizza, setPizza] = useState([]);
  const [total, setTotal] = useState(0);

  //side effects
  useEffect(() => {
    // dobavi sastojke
    ingredients.length === 0 && getData("/ingredients.json", setIngredients);
  }, []);
  useEffect(() => {
    //kada dodbijem sastojke postavim ih u checked state zato sto se ingredients niz ne smije mjenjati jer ce se i cijene mijenjati,
    setCheckedState(ingredients);
  }, [ingredients]);
  useEffect(() => {
    //nakon sto se zavrsi narudzbas dodaj sve u jednu pizzu i izracunaj ukupnu cijenus
    orders.chosenIngredients.length > 0 &&
      setTotal(+orders.amount.doughPrice + +orders.amount.ingredientsPrice.reduce((a, b) => +a + +b, 0));
    orders.chosenIngredients.length > 0 &&
      setPizza([
        ...pizza,
        {
          dough: orders.dough,
          ingredients: orders.chosenIngredients,
          //+ infront of a and b is converting string to number
          amount: 1,
          priceForOne: +orders.amount.doughPrice + +orders.amount.ingredientsPrice.reduce((a, b) => +a + +b, 0),
          prices: +orders.amount.doughPrice + +orders.amount.ingredientsPrice.reduce((a, b) => +a + +b, 0),
        },
      ]);
  }, [orders]);
  useEffect(() => {
    //kad se napravi jedna pizza ocisti orders state u reuduxu kakoo bi se sljedeca narudzba mogla napraviti i stavi pizzu i total u state
    orders.chosenIngredients.length > 0 && dispatch(pizzaMade({ pizza, total }));
  }, [pizza]);

  //user action handlers
  function handleOnChange(ingredientIndex) {
    //na svaki check sastojku obrnem stanje cekiranosti
    checkedState[ingredientIndex].checked = !checkedState[ingredientIndex].checked;
  }
  function handleOnAddToCart() {
    // kada user odabere sastojke i klikne na add to cart filtriram samo one koji su chekirani i njih i cijenu stavljam u nizove koje saljem u redux. Izbjegao sam onSubmit zato sto mi je po defaultu sve cekirano stavljao u rutu a to mi nije odgovaralo zato sto cu request slati tek na Order dugme.
    let chosenIngredients = [];
    let chosenIngredientsPrice = [];

    checkedState.map((ingredient) => {
      ingredient.checked && chosenIngredients.push(ingredient.name);
      ingredient.checked && chosenIngredientsPrice.push(ingredient.price);
    });
    dispatch(ingredientsChosen({ chosenIngredients, price: chosenIngredientsPrice }));
    //restartuj sve checkove na false.
    checkedState.map((ingredient) => {
      if (ingredient.checked === true) ingredient.checked = false;
    });
  }

  return (
    <>
      <Modal
        centered
        show={state.showIngredients}
        onHide={() => {
          dispatch(actions.ingredientsClosed({ showIngredients: false }));
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Ingredients</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            {checkedState &&
              checkedState.map((ingredient, i) => (
                <div key={`default-checkbox-${i}`} className="mb-3">
                  <div id={ingredient.price} className="flexed">
                    {ingredient.gluten_free ? (
                      <img style={{ marginRight: "4px" }} width="18px" src={glutenfree} alt="gluten_free" title="gluten free" />
                    ) : (
                      <div style={{ width: "18px", marginRight: "4px" }}></div>
                    )}
                    <Form.Check
                      onChange={() => {
                        handleOnChange(i);
                      }}
                      type="checkbox"
                      name="ingredient"
                      value={ingredient.name}
                      id={`default-checkbox-${ingredient.name}`}
                      label={ingredient.name}
                    />
                    <p id="price">${ingredient.price}</p>
                  </div>
                </div>
              ))}{" "}
          </Modal.Body>
          <Modal.Footer>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                dispatch(actions.ingredientsClosed({ showIngredients: false }));
              }}
            >
              Close
            </Button>
            <Button
              // type="submit"
              size="sm"
              variant="primary"
              onClick={() => {
                handleOnAddToCart();
                dispatch(actions.ingredientsClosed({ showIngredients: false }));
              }}
            >
              +Add to cart
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
