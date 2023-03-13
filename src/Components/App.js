import '../index.css';
import { Route, Routes } from "react-router-dom";
import Header from './header/Header';
import Home from './home/Home';

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
    </div>
  )
}

export default App;
