import React, { Component } from "react";
import "./header.scss";
import Cart from "./cart";
import Search from "./search";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    let isCheckoutPage = this.props.location.pathname === "/checkout";
    return (
      <header>
        <Link to="/">
          <i className="fa fa-star"></i>
        </Link>
        <div className="compo">
          <Search isCheckoutPage={isCheckoutPage} />
          {!isCheckoutPage && <Cart {...this.props} />}
        </div>
      </header>
    );
  }
}

export default Header;
