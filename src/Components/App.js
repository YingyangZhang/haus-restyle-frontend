import '../index.css';
import { Route, Routes } from "react-router-dom";
import Header from './header/Header';
import Home from './home/Home';
import Furnitures from './furnitures/Furnitures';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/furnitures' element={<Furnitures />} />
      </Routes>
    </div>
  )
}

export default App;
