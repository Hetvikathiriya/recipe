 
import { useEffect, useState } from "react";
import Modal from "./Modal";
import InputForm from "./InputForm";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo2.png"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  let token = localStorage.getItem("token");
  const [isLogin, setisLogin] = useState(token ? false : true);

  useEffect(() => {
    setisLogin(token ? false : true);
  }, [token]);

  const checkLogin = () => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setisLogin(true);
      window.dispatchEvent(new Event("logout"));
    } else {
      setIsOpen(true);
    }
  };

  // Scroll to footer function
  const scrollToFooter = () => {
    const footerElement = document.getElementById("footer");
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="navbar">
        {/* <h2>Testify</h2> */}
        <img src={logo} alt="logo" />
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li onClick={() => isLogin && setIsOpen(true)}>
            <NavLink to={!isLogin ? "/myRecipe" : "/"}>My Recipe</NavLink>
          </li>
          <li onClick={() => isLogin && setIsOpen(true)}>
            <NavLink to={!isLogin ? "favRecipe" : "/"}>Favorites</NavLink>
          </li>
          <li onClick={scrollToFooter} className="navbarcontact">
            <p >Contact</p>
          </li>
          <li onClick={checkLogin}>
            <p className="login">{isLogin ? "Login" : "Logout"}</p>
          </li>
        </ul>
      </header>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
}
