# 🛒 E-Commerce Frontend (Firebase Version)

A React-based e-commerce application that uses **Redux Toolkit** for state management, **React Query** for data fetching, and **Firebase** for backend services. The app allows users to browse products, manage a shopping cart, and simulate a checkout experience.

---

## 🚀 Features

### 🛍 Product Listing
- Fetches product data from **Firebase Firestore**.
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
- Removing an item updates Redux state and session storage.

### ✔ Cart Display
The cart shows:
- Product title  
- Quantity  
- Price  
- Total number of items  
- Total price of all items  

Totals update **dynamically** as the cart changes.

---

## 🔥 Firebase Integration
- Product data is stored and retrieved from **Firebase Firestore**.
- Enables scalable and real-time backend functionality.
- Easily extendable for:
  - User authentication
  - Order history
  - Payment integration

---

## 💾 Session Storage Persistence
The shopping cart is saved in `sessionStorage` so that:
- Cart contents persist across page reloads.
- Cart state is restored when the user returns.
- Cart updates automatically sync to session storage.

Example cart structure:
```json
{
  "id": 1,
  "title": "Product Name",
  "price": 29.99,
  "quantity": 2
}
