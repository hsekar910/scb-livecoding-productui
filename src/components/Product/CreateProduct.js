import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import { useAuth0 } from "@auth0/auth0-react";
import "./Product.css";

const CreateProduct = () => {
  const navigate = useNavigate();
  const createUserApi = "https://scb-livecoding-productservice-api-exhveca2gnaze5fp.southindia-01.azurewebsites.net/Product";
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    skuId: "",
    name: "",
    category: "",
    price: "",
    stock: "",
    description: ""
  });
  
  const { getAccessTokenSilently } = useAuth0();

  const handelInput = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(name, value);
    setUser({ ...user, [name]: value });
  };

  const handelSubmit = async (event) => {
    event.preventDefault();
    console.log(user);
    try {
      setIsLoading(true);
      
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: "scb-productservice-api",
          scope: "read:product write:product",
        },
      });

      const response = await fetch(createUserApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        console.log("Form submitted successfully!");
        setUser({
          skuId: "",
          name: "",
          category: "",
          price: "",
          stock: "",
          description: ""
        });
        navigate("/show-product");
      } else {
        console.error("Form submission failed!");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="user-form">
      <div className="heading">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <p>Create Product Form</p>
      </div>
      <form onSubmit={handelSubmit}>
        <div className="mb-3">
          <label for="Name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="Name"
            name="name"
            value={user.name}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label for="SKUId" className="form-label">
            SKUId
          </label>
          <input
            type="text"
            className="form-control"
            id="SKUId"
            name="skuId"
            value={user.skuId}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label for="Description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="Description"
            name="description"
            value={user.description}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="Price" className="form-label">
            Price
          </label>
          <input
            type="text"
            className="form-control"
            id="Price"
            name="price"
            value={user.price}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label for="Stock" className="form-label">
            Stock
          </label>
          <input
            type="text"
            className="form-control"
            id="Stock"
            name="stock"
            value={user.stock}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label for="Category" className="form-label">
            Category
          </label>
          <input
            type="text"
            className="form-control"
            id="Category"
            name="category"
            value={user.category}
            onChange={handelInput}
          />
        </div>
        <button type="submit" className="btn btn-primary submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
