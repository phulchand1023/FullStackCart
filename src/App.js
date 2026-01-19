import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <div>
          <h1>State Management Demo</h1>
          <p>Context API for Authentication + Redux Toolkit for Products & Cart</p>
          
          <Login />
          <ProductList />
          <Cart />
        </div>
      </AuthProvider>
    </Provider>
  );
}

export default App;