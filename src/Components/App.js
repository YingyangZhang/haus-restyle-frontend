import '../index.css';
import { Route, Routes } from "react-router-dom";
import Header from './header/Header';
import Home from './home/Home';
import Furnitures from './furnitures/Furnitures';
import Inspect from './furnitures/Inspect';
import { useState, useEffect } from 'react';

function App() {
  const [furnitures, setFurnitures] = useState([]);
  const [searchResult, setSearchResult] = useState(furnitures);
  const [isScrolled, setIsScrolled] = useState(false);

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
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/furnitures' 
               element={<Furnitures furnitures={furnitures} 
               isScrolled={isScrolled}
               setFurnitures={setFurnitures} 
               searchResult={searchResult} 
               setSearchResult={setSearchResult}/>} />
        <Route path='/furnitures/:id' 
               element={<Inspect isScrolled={isScrolled} />} />
      </Routes>
    </div>
  )
}

export default App;
