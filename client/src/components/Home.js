import React from "react";
import { Pizza, Cart } from "./index";
function Home() {
  return (
    <div className="container">
      <div className="row">
        <div className="col col-12 col-md-7">
          <Pizza />
        </div>

        <div className="col col-12 col-md-5">
          <Cart />
        </div>
      </div>
    </div>
  );
}

export default Home;
