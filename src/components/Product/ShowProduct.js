import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";
import { useAuth0 } from "@auth0/auth0-react";

const ShowUser = () => {
  const showUserApi = "https://scb-livecoding-productservice-api-exhveca2gnaze5fp.southindia-01.azurewebsites.net/Product";

  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { getAccessTokenSilently } = useAuth0();

  const handelDelete = async (id) => {
    console.log("id : -", id);
    setIsLoading(true);
    try {
      
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: "scb-productservice-api",
          scope: "read:product write:product",
        },
      });
      console.log(token);
      const response = await fetch(showUserApi.concat("/") + id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setUser(user.filter((item) => item.id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
        const response = await fetch(showUserApi, {
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

  if (user.length < 0) {
    return <h1>No Products found</h1>;
  } else {
    return (
      <div className="mt-5">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>SKUId</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {user?.map((item, i) => {
              return (
                <tr key={item.id}>
                  <td>{item.skuId}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>{item.stock}</td>
                  <td>
                    <Link to={`/edit-product/${item.id}`}>
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </Link>
                    <Link to={`/product/${item.id}`}>
                      <i className="fa fa-eye" aria-hidden="true"></i>
                    </Link>

                    <i
                      className="fa fa-trash-o"
                      aria-hidden="true"
                      onClick={() => handelDelete(item.id)}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default ShowUser;
