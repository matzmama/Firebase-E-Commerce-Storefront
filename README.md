# 🛒 E-Commerce Frontend (Firebase + CI/CD)

A React-based e-commerce application that uses:

- ⚛️ React
- 🧠 Redux Toolkit (state management)
- 🔄 React Query (data fetching)
- 🔥 Firebase (Firestore + Auth)
- 🧪 Jest + React Testing Library (TDD)
- ⚙️ GitHub Actions (CI/CD)
- 🚀 Vercel (Deployment)

---

# 🚀 Live Demo

👉 https://firebase-e-commerce-storefront-verc.vercel.app

---

# 🧩 Features

## 🛍 Product Listing
- Fetches products from **Firebase Firestore**
- Displays:
  - Product name
  - Image
  - Price
- Users can add products to cart

---

## 🛒 Shopping Cart

### ✔ Add to Cart
- Adds product to Redux store
- If already exists → increases quantity

### ✔ Remove from Cart
- Removes item from cart
- Updates UI immediately

### ✔ Cart Display
- Shows:
  - Product name
  - Quantity
  - Price
  - Total items
  - Total price

---

## 🔥 Firebase Integration
- Uses **Firestore** for:
  - Products
  - Orders
- Easily extendable for:
  - Authentication
  - Payments

---

## 📦 Order System
- Users can checkout
- Orders are stored in Firestore (`orders` collection)
- Order history is displayed in UI

---

## 💾 Session Storage
- Cart persists using `sessionStorage`
- Survives page refresh

---

# 🧪 Test-Driven Development (TDD)

## ✅ Unit Tests

Located in:
src/features/Cart.test.js
src/App.test.js


Tests include:
- Component rendering
- UI structure
- State behavior

---

## 🔗 Integration Test

Located in:

src/integration.test.js


Tests:
- Full app rendering
- User interaction
- Cart behavior

Uses:
- React Testing Library
- Mocked product service

---

## ▶ Run Tests Locally

```bash
npm test
⚙️ Continuous Integration (CI)

GitHub Actions workflow:

.github/workflows/main.yml
What it does:
Runs on push to main
Installs dependencies
Runs tests
If tests fail:

❌ Deployment is blocked

🚀 Continuous Deployment (CD)
Deployment platform:

👉 Vercel

Workflow:
After CI passes → deploy runs automatically
Uses Vercel CLI inside GitHub Actions
🔐 Required GitHub Secrets

Add in:

GitHub → Settings → Secrets → Actions
Name	Description
VERCEL_TOKEN	Vercel API token
VERCEL_ORG_ID	Your Vercel org ID
VERCEL_PROJECT_ID	Your Vercel project ID
🔧 CI/CD Workflow Example
name: CI/CD Pipeline

on:
  push:
    branches:
      - main

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test -- --watchAll=false

  deploy:
    runs-on: ubuntu-latest
    needs: build-and-test

    steps:
      - uses: actions/checkout@v3

      - name: Install Vercel CLI
        run: npm install -g vercel

      - name: Deploy to Vercel
        run: |
          vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
          vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
          vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
🖥️ Local Setup
1. Clone repo
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd ecommerce-frontend
2. Install dependencies
npm install
3. Set up environment variables

Create .env file:

REACT_APP_API_KEY=your_key
REACT_APP_AUTH_DOMAIN=your_domain
REACT_APP_PROJECT_ID=your_project
REACT_APP_STORAGE_BUCKET=your_bucket
REACT_APP_MESSAGING_SENDER_ID=your_id
REACT_APP_APP_ID=your_app_id
4. Run app
npm start
📂 Project Structure
src/
 ├── features/
 │   ├── Cart.js
 │   ├── CartSlice.js
 │   └── Cart.test.js
 ├── services/
 │   ├── productService.js
 │   ├── orderService.js
 ├── pages/
 │   ├── ProductsPage.js
 │   ├── OrderHistory.js
 ├── integration.test.js
 ├── App.js