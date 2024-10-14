
import { Route, Routes } from "react-router-dom";

import Header from "./components/Common/Header";
import Home from "./components/Layout/Home";

import CreateProduct from "./components/Product/CreateProduct";
import ShowProduct from "./components/Product/ShowProduct";
import EditProduct from "./components/Product/EditProduct";
import Product from "./components/Product/Product";

import './App.css';

function App() {  
  return (
    <div className="App">
      <header className="container">
        <div className="">
          <Header />
          <Routes>          
            <Route path="/" element={<Home />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/show-product" element={<ShowProduct />} />
          </Routes>
          
        </div>
      </header>
    </div>
  );
}

export default App;
