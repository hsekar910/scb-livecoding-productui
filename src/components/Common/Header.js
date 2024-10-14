import React from "react";
import { Link } from "react-router-dom";
import "./Common.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { useAuth0 } from "@auth0/auth0-react";

export default function Header() {
  const { loginWithPopup, logout, user, isAuthenticated } = useAuth0();

    console.log(user)
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" href="#">
            <span className="navbar-text">Product Services</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              {isAuthenticated && (
                <li className="nav-item">
                  <Link className="nav-link" to="create-product">
                    Create Product
                  </Link>
                </li>
              )}
              {isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="show-product">
                  Show Products
                </Link>
              </li>
              )}
              {!isAuthenticated && (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/"
                    onClick={() => loginWithPopup()}
                  >
                    Login
                  </Link>
                </li>
              )}
              {isAuthenticated && (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="Logout"
                    onClick={() => logout()}
                  >
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
