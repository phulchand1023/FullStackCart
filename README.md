# State Management App

A React application demonstrating state management using Context API for authentication and Redux Toolkit for product catalog and cart management.

## Features

### Authentication (Context API)
- Login/logout functionality
- User role management (admin/user)
- Token-based authentication simulation
- Persistent authentication state across components

### Product Management (Redux Toolkit)
- Product catalog with CRUD operations
- Role-based access control
- Admin can add, edit, and delete products
- Users can view products and add to cart

### Shopping Cart (Redux Toolkit)
- Add products to cart
- Update quantities
- Remove items
- Calculate total amount
- Clear entire cart

## Project Structure

```
src/
├── components/
│   ├── Login.js          # Authentication component
│   ├── ProductList.js    # Product management component
│   └── Cart.js           # Shopping cart component
├── context/
│   └── AuthContext.js    # React Context for authentication
├── store/
│   ├── store.js          # Redux store configuration
│   ├── productsSlice.js  # Products state management
│   └── cartSlice.js      # Cart state management
├── App.js                # Main application component
└── index.js              # Application entry point
```

## State Management Architecture

### Context API (Authentication)
- **Purpose**: Manages user authentication state
- **State**: `isLoggedIn`, `userName`, `role`, `token`
- **Actions**: `login()`, `logout()`
- **Usage**: Wrapped around entire app, accessible via `useAuth()` hook

### Redux Toolkit (Products & Cart)
- **Products Slice**: Manages product catalog with add/update/remove actions
- **Cart Slice**: Manages shopping cart with add/remove/update quantity actions
- **Store**: Combines both slices using `configureStore`

## User Roles

### Regular User
- View product catalog
- Add products to cart
- Manage cart items
- Cannot modify products

### Admin User
- All user permissions
- Add new products
- Edit existing products
- Delete products

## Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open http://localhost:3000 in your browser

## Usage

1. **Login**: Enter username and select role (user/admin)
2. **Browse Products**: View available products in the catalog
3. **Add to Cart**: Click "Add to Cart" for any product (requires login)
4. **Manage Products** (Admin only): Add, edit, or delete products
5. **Cart Management**: Update quantities or remove items from cart
6. **Logout**: Click logout to clear authentication state

## Key Implementation Details

### Context API Implementation
- Uses `useReducer` for state management
- Provides authentication actions through context value
- Custom hook `useAuth()` for easy access

### Redux Toolkit Implementation
- Uses `createSlice` for simplified reducer creation
- Immutable updates with Immer integration
- Type-safe action creators automatically generated

### Component Integration
- Components access auth state via Context API
- Product and cart state managed through Redux hooks
- Role-based conditional rendering for admin features

## Local Variables Used

- `userName`: Current logged-in user name
- `role`: User role (admin/user)
- `token`: Authentication token
- `isLoggedIn`: Authentication status
- `products`: Product catalog array
- `cartItems`: Shopping cart items array
- `newProduct`: Form state for adding products
- `editProduct`: Form state for editing products
- `totalAmount`: Calculated cart total