# E‑Commerce Frontend  
A React-based e-commerce application that uses Redux Toolkit for state management, React Query for data fetching, and sessionStorage for cart persistence. This project interacts with the FakeStoreAPI to display products, manage a shopping cart, and simulate a checkout process.

---

## 🚀 Features

### 🛍 Product Listing
- Fetches product categories and product data from **FakeStoreAPI** using **React Query**.
- Users can browse products and add items directly to the shopping cart.
- Each product displays:
  - Title  
  - Image  
  - Price  

---

## 🛒 Shopping Cart Functionality

### ✔ Add to Cart
- Users can add products from the home page.
- If a product already exists in the cart, its **quantity increases** instead of duplicating the item.

### ✔ Remove from Cart
- Each item in the cart includes a **Remove** button.
- Removing an item updates Redux state and sessionStorage.

### ✔ Cart Display
The cart shows:
- Product title  
- Quantity  
- Price  
- Total number of items  
- Total price of all items  

Totals update **dynamically** as the cart changes.

---

## 💾 Session Storage Persistence
The shopping cart is saved in `sessionStorage` so that:
- Cart contents persist across page reloads.
- Cart state is restored when the user returns.
- Cart updates automatically sync to sessionStorage.

The cart is stored as an **array of product objects**, each containing:
```json
{
  "id": 1,
  "title": "Product Name",
  "price": 29.99,
  "quantity": 2
}
##Project Structure 
ecommerce-frontend/
│
├── public/
├── src/
│   ├── features/
│   │   ├── Cart.js
│   │   ├── CartSlice.js
│   ├── App.js
│   ├── index.js
│
├── package.json
├── README.md

##To Run the application 
#Install the Dependency 
npm install
#Run the server
npm start
#The app will run at 
http://localhost:3000

Jasmine
E‑Commerce Frontend Developer