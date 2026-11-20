import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const products = [
    { id: 1, nazwa: 'Notes', cena: 12.50 },
    { id: 2, nazwa: 'Długopis', cena: 3.20 },
    { id: 3, nazwa: 'Plecak', cena: 89.00 },
    { id: 4, nazwa: 'Kalkulator', cena: 45.90 },
    { id: 5, nazwa: 'Zakreślacz', cena: 4.75 }
  ];

  const [cart, setCart] = useState([]);

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + item.cena * item.ilosc, 0);
  };

  const logCartState = (updatedCart) => {
    const total = calculateTotal(updatedCart);
    console.log(`Koszyk: ${updatedCart.length} pozycji; suma: ${total.toFixed(2)}`);
  };

  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, ilosc: item.ilosc + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, ilosc: 1 }];
    }

    setCart(updatedCart);
    logCartState(updatedCart);
  };

  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    logCartState(updatedCart);
  };

  const totalSum = calculateTotal(cart);

  return (
    <div className="container mt-4">
      <h2>Sklepik szkolny</h2>
      <ul className="list-group mb-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {product.nazwa} – {product.cena.toFixed(2)} zł
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => handleAddToCart(product)}
            >
              Do koszyka
            </button>
          </li>
        ))}
      </ul>

      <h3>Koszyk ({cart.length} pozycji)</h3>
      {cart.length === 0 ? (
        <div className="alert alert-info">Koszyk jest pusty</div>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Produkt</th>
                <th scope="col">Ilość</th>
                <th scope="col">Cena</th>
                <th scope="col">Suma</th>
                <th scope="col">Akcja</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.nazwa}</td>
                  <td>{item.ilosc}</td>
                  <td>{item.cena.toFixed(2)} zł</td>
                  <td>{(item.cena * item.ilosc).toFixed(2)} zł</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      Usuń
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="fw-bold">Suma: {totalSum.toFixed(2)} zł</p>
        </>
      )}
    </div>
  );
}

export default App;