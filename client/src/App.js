import "./assets/styles";
import store from "./store/store";
import { Provider } from "react-redux";
import { Header, OrderHistory, Pizza, Order, Cart, Home } from "./components";
import { Login, Register, IngredientsModal } from "./components/modals";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Container className="App">
          <Header />
          <Login />
          <Register />
          <IngredientsModal />
          <Switch>
            <Route path="/cart" component={Cart} />
            <Route path="/order/finish-order" component={Order} />
            <Route path="/order/order-history" component={OrderHistory} />
            <Route path="/pizza" component={Pizza} />
            <Route path="/" component={Home} />
          </Switch>
        </Container>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
