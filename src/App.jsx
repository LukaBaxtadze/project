import { useState } from "react";
import "./App.css";

function App() {
  const images = ["1.png", "2.png", "3.png", "4.png"];
  const [Img, setImg] = useState(images[0]);
  const [count, setCount] = useState(1);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false); // Cart toggle state

  let product = {
    id: 1,
    title: "SNEAKER COMPANY",
    name: "Fall Limited Edition Sneakers",
    desc: "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
    price: 125,
  };

  
  function forwardPhoto() {
    const currentIndex = images.indexOf(Img);
    const nextIndex = (currentIndex + 1) % images.length;
    setImg(images[nextIndex]);
  }

  function reversePhoto() {
    const currentIndex = images.indexOf(Img);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setImg(images[prevIndex]);
  }


  function addToCart() {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + count,
                total: item.price * (item.quantity + count),
              }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            ...product,
            quantity: count,
            total: product.price * count,
            image: Img, 
          },
        ];
      }
    });
    setCount(1); 
  }


  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  return (
    <>
    
      <header className="navbar">
        <div className="navbar-logo">MyShop</div>
        <nav className="navbar-links">
          <span className="nav-link">Collection</span>
          <span className="nav-link">Men</span>
          <span className="nav-link">Women</span>
          <span className="nav-link">About</span>
          <span className="nav-link">Contact</span>
        </nav>
        <div className="profile-section">
          <img
            src="shopping-cart.png" 
            className="profile-pic"
          />
          <div className="cart-icon" onClick={() => setShowCart(!showCart)}>
            🛒 Cart ({cart.length})
          </div>
        </div>
      </header>


      {showCart && (
        <div className="cart-popup">
          <h2 className="cart-popup-title">Shopping Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="cart-info">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={`/assets/${item.image}`}
                    alt="cart-item"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "5px",
                    }}
                  />
                  <h4 style={{ marginLeft: "10px" }}>{item.name}</h4>
                </div>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${item.total}</p>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))
          )}
        </div>
      )}

    
      <div className="product-container">
        <img src={`/assets/${Img}`} alt="product" width={300} />
        <div className="thumbnail-section">
          {images.map((photo, index) => (
            <img
              key={index}
              onClick={() => setImg(photo)}
              src={`/assets/${photo}`}
              alt={`thumbnail-${index}`}
              width={100}
              style={{ cursor: "pointer", margin: "5px" }}
            />
          ))}
        </div>
        <div>
          <button onClick={reversePhoto}>Previous</button>
          <button onClick={forwardPhoto} style={{ marginLeft: "10px" }}>
            Next
          </button>
        </div>
      </div>

     
      <div className="product-details">
        <h1>{product.title}</h1>
        <p>{product.desc}</p>
        <p>Price: ${product.price}</p>
        <div>
          <button disabled={count <= 1} onClick={() => setCount(count - 1)}>
            -
          </button>
          <span style={{ margin: "0 10px" }}>{count}</span>
          <button onClick={() => setCount(count + 1)}>+</button>
        </div>
        <button onClick={addToCart} style={{ marginTop: "10px" }}>
          Add to Cart
        </button>
      </div>
    </>
  );
}

export default App;
