import '../index.css';
import { Route, Routes } from "react-router-dom";
import Header from './header/Header';
import Home from './home/Home';
import Furnitures from './furnitures/Furnitures';
import Inspect from './furnitures/Inspect';
import Forms from './users/Forms';
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState([]);
  const [furnitures, setFurnitures] = useState([]);
  const [searchResult, setSearchResult] = useState(furnitures);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (token !== null) {
    fetch("https://haus-db.onrender.com/me", {
      method: "GET",
      headers: {
      Authorization: `Bearer ${token}`,
      },
    })
    .then(r => r.json())
    .then(data => {
      setUser(data.user);
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
    fetch('https://haus-db.onrender.com/furnitures')
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
      <Header setIsForm={setIsForm} user={user} setUser={setUser} />
      {isForm ? <Forms setIsForm={setIsForm} setUser={setUser} /> : null}

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
               element={<Inspect isScrolled={isScrolled} />} >
        </Route>
      </Routes>
    </div>
  )
}

export default App;
