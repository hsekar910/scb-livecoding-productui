import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import { useAuth0 } from "@auth0/auth0-react";
import "./Product.css";

const EditProduct = () => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const getUserApi = "https://scb-livecoding-productservice-api-exhveca2gnaze5fp.southindia-01.azurewebsites.net/Product";
  
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: "scb-productservice-api",
            scope: "read:product write:product",
          },
        });
        console.log(token);
        const response = await fetch(getUserApi.concat("/") + id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUsers();
  }, [getAccessTokenSilently]);

  const handelInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    setUser({ ...user, [name]: value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: "scb-productservice-api",
        scope: "read:product write:product",
      },
    });
    console.log(token);
    
    fetch(getUserApi.concat("/") + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text(); // Read the response as text
      })
      .then((text) => {
        if (text) {
          return JSON.parse(text); // Parse the text if it's not empty
        }
        return {}; // Return an empty object if the response body is empty
      })
      .then((data) => {
        setIsLoading(true);
        navigate("/show-product");
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  return (
    <div className="user-form">
      <div className="heading">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <p>Edit Product Form</p>
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
        <div className="mb-3">
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
          EDIT
        </button>
      </form>
    </div>
  );
};
export default EditProduct;
