import axios from "axios";

export async function getData(dataType, setArray, user) {
  await axios
    .request({
      baseURL: "http://localhost:5000",
      url: dataType,
      headers: user ? { Authorization: `Bearer ${user}` } : {},
    })
    .then(function (response) {
      if (dataType === "/ingredients.json") {
        setArray(
          response.data.data.map((e) => {
            let ingredientsPrice = Math.random() * (3 - 1 + 1) + 1;

            return {
              ...e,
              checked: false,
              price: ingredientsPrice.toFixed(2),
            };
          })
        );
      } else if (dataType === "/dough.json") {
        setArray(
          response.data.data.map((e) => {
            let doughPrice = Math.random() * (15 - 6 + 1) + 6;

            return {
              ...e,
              checked: false,
              price: doughPrice.toFixed(2),
            };
          })
        );
      } else {
        setArray(response.data.data);
      }
    })
    .catch(function (error) {
      setArray([]);

      console.error(error);
    });
}
