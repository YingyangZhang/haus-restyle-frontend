import '../index.css';
import { Route, Routes } from "react-router-dom";
import Header from './header/Header';
import Home from './home/Home';
import Furnitures from './furnitures/Furnitures';
import Inspect from './furnitures/Inspect';
import Forms from './users/Forms';
import Cart from './users/Cart';
import Checkout from './users/Checkout';
import Profile from './users/Profile';
import ThankYou from './users/ThankYou';
import ScrollRestoration from './ScrollRestoration';
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState([]);
  const [cart, setCart] = useState([]);
  const [furnitures, setFurnitures] = useState([]);
  const [searchResult, setSearchResult] = useState(furnitures);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const token = localStorage.getItem("jwt");
  
  useEffect(() => {
    if (token !== null) {
    fetch("http://127.0.0.1:3000/me", {
      method: "GET",
      headers: {
      Authorization: `Bearer ${token}`,
      },
    })
    .then(r => r.json())
    .then(data => {
      setUser(data.user);
      setCart(data.user.cart_items)
      console.log(data.user);
    })
    }
  },[])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY >= 3);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:3000/furnitures')
    .then(r => r.json())
    .then(data => {
        console.log(data);
        const ascendingFurnitures = [...data].sort((a, b) =>
        a.name > b.name ? -1 : 1);
        setFurnitures(ascendingFurnitures);
        setSearchResult(ascendingFurnitures);
    })
  },[])

  return (
    <div className="App">
      <ScrollRestoration />
      <Header setIsForm={setIsForm} user={user} setUser={setUser} cart={cart} />
      {isForm ? <Forms setIsForm={setIsForm} setUser={setUser} setCart={setCart} /> : null}

      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/furnitures' 
               element={<Furnitures furnitures={furnitures} 
               isScrolled={isScrolled}
               setFurnitures={setFurnitures} 
               searchResult={searchResult} 
               setSearchResult={setSearchResult}/>} >
        </Route>

        <Route path='/furnitures/:id' 
               element={<Inspect isScrolled={isScrolled} user={user} setUser={setUser} cart={cart} setCart={setCart} />} >
        </Route>

        <Route path='/cart' 
               element={<Cart cart={cart} setCart={setCart} isScrolled={isScrolled} />} >
        </Route>

        <Route path='/checkout' 
               element={<Checkout cart={cart} setCart={setCart} user={user} setUser={setUser} isScrolled={isScrolled} />} >
        </Route>

        <Route path='/profile' 
               element={<Profile user={user} isScrolled={isScrolled} />} >
        </Route>

        <Route path='/thank_you' 
               element={<ThankYou />} >
        </Route>
      </Routes>
    </div>
  )
}

export default App;
