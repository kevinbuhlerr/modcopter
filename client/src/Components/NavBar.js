import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { useStateValue } from "../contexts/StateProvider";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import "../css/NavBar.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function NavBar() {
  const [{ cart }] = useStateValue();
  const [data, setData] = useState(null);

  const getUser = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/user",
    }).then((res) => {
      // setData(res.data);
      console.log("LOCAL STORAGE WORKS");
      const storage = localStorage.getItem("user");
      if (storage) {
        setData(JSON.parse(JSON.stringify(res.data)));
      }
    });
  };

  const openMenu = () => {
    console.log("SIDEBAR OPENED!!!!!!!!!!!!!!");
    document.querySelector(".nav__sidebar").classList.add("open");
  };
  const closeMenu = () => {
    console.log("SIDEBAR CLOSED!!!!!!!!!!!!!!");
    document.querySelector(".nav__sidebar").classList.remove("open");
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <nav className="nav">
      <div className="nav__logo">
        <Link to="/">
          <span className="nav__logoText">MODCOPTER</span>
          {/* <img src="https://raw.githubusercontent.com/kevinbuhlerr/LED-LIGHTS/master/client/src/ledlogo.png" alt="." /> */}
        </Link>
      </div>

      <div className="nav__search">
        <SearchIcon fontSize="inherit" className="nav__searchIcon" />
        <input
          type="text"
          className="nav__searchInput"
          placeholder="Search..."
        />
        <button className="nav__button" onClick={openMenu}>
          <MenuIcon className="nav__searchIcon" />
        </button>
      </div>
      <aside className="nav__sidebar">
        <div className="nav__sidebarLinks">
          <button onClick={closeMenu} className="nav__buttonClose">
            X
          </button>
          <Link to="/shop" onClick={closeMenu} className="nav__sidebarLink">
            <span>Info</span>
          </Link>
          <Link to="/faqs" onClick={closeMenu} className="nav__sidebarLink">
            <span>FAQs</span>
          </Link>
          <Link to="/contact" onClick={closeMenu} className="nav__sidebarLink">
            <span>Contact</span>
          </Link>
          <Link to="/checkout" onClick={closeMenu} className="nav__sidebarLink">
            <span>Cart: {cart?.length}</span>
          </Link>
          {data ? (
            <Link
              to="/account"
              onClick={closeMenu}
              className="nav__sidebarLink"
            >
              <span className="nav__mobileLogos">
                <AccountBoxIcon className="nav__accountMobile" />
                {data.username}
              </span>
            </Link>
          ) : (
            <Link
              to="/users/login"
              onClick={closeMenu}
              className="nav__sidebarLink"
            >
              <span>Login</span>
            </Link>
          )}
        </div>
      </aside>

      <div className="nav__links hide">
        {/* <Link to="/" className="nav__link">
          <div className="nav__options">
            <span className="nav__optionLineTwo big">Home</span>
          </div>
        </Link> */}

        <Link to="/shop" className="nav__link">
          <div className="nav__options">
            <span className="nav__optionLineTwo big">Info</span>
          </div>
        </Link>

        <Link to="/faqs" className="nav__link">
          <div className="nav__options">
            <span className="nav__optionLineOne big">FAQs</span>
          </div>
        </Link>

        {/* <Link to="/about" className="nav__link">
          <div className="nav__options">
            <span className="nav__optionLineOne big">About Us</span>
          </div>
        </Link> */}

        <Link to="/contact" className="nav__link">
          <div className="nav__options">
            <span className="nav__optionLineOne big">Contact</span>
          </div>
        </Link>

        <div className="nav__icons">
          <Link to="/checkout">
            <div className="nav__shoppingBasketIcon big">
              <ShoppingBasketIcon />
              <span className="nav__cartLength">{cart?.length}</span>
            </div>
          </Link>

          {data ? (
            <Link to="/account">
              <div className="nav__accountBoxIcon big">
                <div className="nav__accountBoxDiv">
                  <AccountBoxIcon />
                  <div className="nav__dataWords">
                    <span> {data.username}</span>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <Link to="/users/login" className="nav__link">
              <div className="nav__options">
                <span className="nav__optionLineOne big">Login</span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
