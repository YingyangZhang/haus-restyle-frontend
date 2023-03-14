import '../index.css';
import { Route, Routes } from "react-router-dom";
import Header from './header/Header';
import Home from './home/Home';
import Furnitures from './furnitures/Furnitures';
import { useState, useEffect } from 'react';

function App() {
  const [furnitures, setFurnitures] = useState([]);
  const [searchResult, setSearchResult] = useState(furnitures);

  useEffect(() => {
    fetch('https://haus-backend-hde3.onrender.com/furnitures')
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
        <Route path='/furnitures' element={<Furnitures furnitures={furnitures} setFurnitures={setFurnitures} searchResult={searchResult} setSearchResult={setSearchResult}/>} />
      </Routes>
    </div>
  )
}

export default App;
