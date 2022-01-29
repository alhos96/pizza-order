# pizza-order-composer

Pizza order composer is my first ever full MERN stack web application. The aim of the application is to provide pizza ordering and deilvery to users with a personal account. I'm very proud of it even though it's not perfect because I learned so much from it.

## technologies

In this MERN stack application the **frontend** is developed in HTML5, CSS3 and React.js with Bootstrap, while **backend** is created in Express and Node.js.
**Data** is stored in MongoDB Atlas and users can access only their data but no others.

## features

Users can:

-register their personal account
-login
-logout
-add dough and ingredients to cart
-increase amount of pizzas in cart
-add frequently used addresses
-select addres for order
-checkout
-see their own order history

## starting and using the application

#### backend

After cloning repository and opening it in terminal type command `cd server` and add your own **.env** file with following variables: **PORT** use 5000, **MONGO_URI** and **JWT_SECRET** . After that run `npm install` to install all the dependencies. After completing these steps run `npm start` script.

That runs the server part of application in the development mode on http://localhost:5000.

#### frontend

Start second terminal. Type command `cd client` and run `npm install` script to install all the dependencies. After successfull instalataion run `npm start`.

That runs the frontend part of application in the development mode.

Open http://localhost:3000 to view it in the browser.

Have fun!
