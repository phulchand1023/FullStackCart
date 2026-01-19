import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, updateProduct, removeProduct } from '../store/productsSlice';
import { addToCart } from '../store/cartSlice';
import { useAuth } from '../context/AuthContext';

const ProductList = () => {
  const products = useSelector(state => state.products.items);
  const dispatch = useDispatch();
  const { isLoggedIn, role } = useAuth();
  
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '' });
  const [editingId, setEditingId] = useState(null);
  const [editProduct, setEditProduct] = useState({ name: '', price: '', category: '' });

  if (!isLoggedIn) {
    return (
      <div>
        <h3>Products</h3>
        <p>Please login to view products</p>
      </div>
    );
  }

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price && newProduct.category) {
      dispatch(addProduct({
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        category: newProduct.category
      }));
      setNewProduct({ name: '', price: '', category: '' });
    }
  };

  const handleUpdateProduct = (id) => {
    dispatch(updateProduct({
      id,
      name: editProduct.name,
      price: parseFloat(editProduct.price),
      category: editProduct.category
    }));
    setEditingId(null);
    setEditProduct({ name: '', price: '', category: '' });
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setEditProduct({
      name: product.name,
      price: product.price,
      category: product.category
    });
  };

  return (
    <div>
      <h3>Products</h3>
      
      {role === 'admin' && (
        <div>
          <h4>Add New Product</h4>
          <form onSubmit={handleAddProduct}>
            <input
              type="text"
              placeholder="Product name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
            />
            <input
              type="text"
              placeholder="Category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
            />
            <button type="submit">Add Product</button>
          </form>
        </div>
      )}

      <div>
        {products.map(product => (
          <div key={product.id}>
            {editingId === product.id ? (
              <div>
                <input
                  type="text"
                  value={editProduct.name}
                  onChange={(e) => setEditProduct({...editProduct, name: e.target.value})}
                />
                <input
                  type="number"
                  value={editProduct.price}
                  onChange={(e) => setEditProduct({...editProduct, price: e.target.value})}
                />
                <input
                  type="text"
                  value={editProduct.category}
                  onChange={(e) => setEditProduct({...editProduct, category: e.target.value})}
                />
                <button onClick={() => handleUpdateProduct(product.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <div>
                  <h4>{product.name}</h4>
                  <p>Price: Rs {product.price} | Category: {product.category}</p>
                </div>
                <div>
                  <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
                  {role === 'admin' && (
                    <>
                      <button onClick={() => startEdit(product)}>Edit</button>
                      <button onClick={() => dispatch(removeProduct(product.id))}>Delete</button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;