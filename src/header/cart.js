import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Cart extends Component {
  render() {
    return (
      <div
        className="cart"
        style={{ display: this.url === "checkout" ? "none" : "block" }}
      >
        {this.props.cart.length > 0 ? (
          <Link to="/checkout">
            <>
              <i className="fa fa-shopping-cart"></i>
              <span>{this.props.cart.length}</span>
            </>
          </Link>
        ) : (
          <>
            <i className="fa fa-shopping-cart"></i>
            <span>{this.props.cart.length}</span>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.itemReducer.cart
});

export default connect(mapStateToProps, {})(Cart);
