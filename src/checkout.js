import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  searchAction,
  removeCart,
  getCalculation,
  addToCart
} from "./component/itemAction";

class Checkout extends Component {
  componentDidMount() {
    this.props.searchAction("", true);
    this.props.getCalculation();
  }

  addDefaultSrc(Iurl, e) {
    e.target.src = Iurl;
  }

  remove = e => {
    this.props.removeCart(e);
  };

  notData = () => {
    return (
      <div className="emptycart">
        <h2>Your cart is empty</h2>
        <Link to="/">Shop Now</Link>
      </div>
    );
  };

  inpHandle = (item, value) => {
    item.count = value - 1;
    this.props.addToCart(item);
  };

  handleStepperChange = (item, type) => {
    if (type === "MINUS") {
      item.count = item.count - 2;
    } else {
      item.count = item.count;
    }
    this.props.addToCart(item);
  };

  CheckoutData = () => {
    let withdata = () => {
      return (
        <>
          <div className="back">
            <Link to="/">
              <i className="fa fa-arrow-left"></i> Back to home
            </Link>
          </div>
          {this.props.searchCart &&
            this.props.searchCart.map((item, index) => {
              if (item.count !== 0) {
                return (
                  <div className="checkout-item" key={index}>
                    <div className="img">
                      <img
                        src={item.img_url}
                        alt={item.name}
                        id={item.id}
                        onError={e => this.addDefaultSrc(item.img_url, e)}
                      />
                    </div>

                    <div className="item-details">
                      <div className="item-description">
                        <div className="itemName">{item.name}</div>
                        <div className="itemPrice">
                          <span className="pro-price">
                            &#x20b9;{" "}
                            {item.price - (item.price * item.discount) / 100}
                          </span>
                          <span className="pro-AP">&#x20b9; {item.price}</span>
                          <span className="pro-disc">{item.discount}% off</span>
                        </div>
                      </div>
                      <div className="item-qty">
                        <span
                          className="minus"
                          onClick={() =>
                            this.handleStepperChange(item, "MINUS")
                          }
                        ></span>
                        <span className="number">
                          <input
                            type="number"
                            value={item.count}
                            onChange={e => this.inpHandle(item, e.target.value)}
                          />
                        </span>
                        <span
                          className="plus"
                          onClick={() => this.handleStepperChange(item, "PLUS")}
                        ></span>
                      </div>
                      <div className="item-remove">
                        <span onClick={() => this.remove(item.id)}>Remove</span>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </>
      );
    };

    let withoutdata = () => {
      return (
        <div className="search-Nodata">
          Product that you are looking is not found
        </div>
      );
    };
    return (
      <>
        <div className="checkout-list">
          {this.props.searchCart.length > 0 ? withdata() : withoutdata()}
        </div>
        <div className="checkout-price">
          <div className="calculationBox">
            <div className="box">
              <b className="head">price details</b>
            </div>
            <div className="price-calulation item-Cal">
              <span>Price ({this.props.cart.length} item) </span>
              <span>&#x20b9; {this.props.totalprice}</span>
            </div>
            <div className="price-calulation item-Cal">
              <span>Discount </span>
              <span>&#x20b9; {this.props.totaldiscount}</span>
            </div>
            <div className="price-calulation total">
              <span>Total Payable </span>
              <span>
                &#x20b9; {this.props.totalprice - this.props.totaldiscount}
              </span>
            </div>
          </div>
        </div>
      </>
    );
  };

  render() {
    return (
      <div className="wrapper">
        {this.props.cart.length > 0 ? this.CheckoutData() : this.notData()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.itemReducer.cart,
  searchCart: state.itemReducer.searchCart,
  totalprice: state.itemReducer.totalPrice,
  totaldiscount: state.itemReducer.totalDiscount
});

export default connect(mapStateToProps, {
  searchAction,
  removeCart,
  getCalculation,
  addToCart
})(Checkout);
