import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Product.css";
import { useAuth0 } from "@auth0/auth0-react";

const EditUser = () => {
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const getUserApi = "https://localhost:7127/Product";

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

  return (
    <div className="user mt-5">
      <table className="table table-bordered">
    <thead>
      <tr>
        <th>Name</th>
        <th>Value</th>
        
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>SKUId</td>
        <td>{user.skuId}</td>
      </tr>
      <tr>
        <td>Name</td>
        <td>{user.name}</td>
      </tr>
      <tr>
        <td>Description</td>
        <td>{user.description}</td>
      </tr>
      <tr>
        <td>Price</td>
        <td>{user.price}</td>
      </tr>
      <tr>
        <td>Stock</td>
        <td>{user.stock}</td>
      </tr>
      <tr>
        <td>Category</td>
        <td>{user.category}</td>
      </tr>
    </tbody>
  </table>
    </div>
  );
};
export default EditUser;
