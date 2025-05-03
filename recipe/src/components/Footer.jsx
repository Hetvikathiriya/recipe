import React, { useEffect, useState } from "react";
import logo from "../assets/categoryimg/newlogo.png";

const Footer = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      setIsLogin(!!token);
    };

    checkLogin();

    window.addEventListener("login", checkLogin);
    window.addEventListener("logout", checkLogin);

    return () => {
      window.removeEventListener("login", checkLogin);
      window.removeEventListener("logout", checkLogin);
    };
  }, []);

  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        {/* left side */}
        <div className="footer-content-left">
          <img className="footer-logo" src={logo} alt="Hunger Hub Logo" />
          <p>
            Welcome to Hunger Hub – your ultimate recipe companion. Save, share,
            and discover delicious meals from around the world.
          </p>
        </div>

        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{ cursor: "pointer", marginLeft: "10px" }}
            >
              Home
            </li>

            <li>
              <a href="#explore-menu">Menu Explore</a>
            </li>
            {isLogin && (
              <>
                <li>
                  <a href="/myRecipe">My Recipe</a>
                </li>
                <li>
                  <a href="/favRecipe">Favorites</a>
                </li>
              </>
            )}
          </ul>
        </div>
         {/* Right side – contact info */}
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91-243-456-7890‬</li>
            <li>contact@hungerhub.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2025 @ hungerhub.com – All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
