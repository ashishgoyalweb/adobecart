import React, { Component } from "react";
import { itemAction, addToCart, searchAction } from "./itemAction";
import { connect } from "react-redux";
import spinner from "../spinner.gif";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      data: this.props.data,
      btnDisable: []
    };
  }

  componentDidMount() {
    this.props.itemAction();
    this.props.searchAction("", false);
  }

  manageButton = item => {
    if (item.btnStatus !== undefined) {
      return item.btnStatus === false ? (
        <button onClick={e => this.addtocart(item, e)}>Add to cart</button>
      ) : (
        <button disabled>Product added</button>
      );
    } else {
      return (
        <button onClick={e => this.addtocart(item, e)}>Add to cart</button>
      );
    }
  };

  addtocart = (item, e) => {
    // store to reduxs
    console.log("item ", item);
    this.props.addToCart(item);
    e.target.innerHTML = "Product added";
    e.target.setAttribute("disabled", "disabled");
  };

  addDefaultSrc(Iurl, e) {
    e.target.src = Iurl;
  }
  searchWithData = () => {
    return this.props.data.map((item, index) => {
      return (
        <div className="pBox" key={index}>
          <img
            src={item.img_url}
            alt={item.name}
            id={item.id}
            onError={e => this.addDefaultSrc(item.img_url, e)}
          />
          <div className="pName">{item.name}</div>
          <div className="proPrice">
            <span className="item-price">
              {item.price - (item.price * item.discount) / 100}
            </span>
            <span className="item-AP">{item.price}</span>
            <span className="item-disc">{item.discount}% off</span>
          </div>
          <div className="btn"> {this.manageButton(item)}</div>
        </div>
      );
    });
  };

  searchWithoutData = () => {
    return <div className="search-Nodata">No products found</div>;
  };

  render() {
    if (this.props.loading) {
      return (
        <div className="loading">
          <img src={spinner} alt="loadding" />
        </div>
      );
    } else {
      return (
        <div className="products">
          {this.props.data.length > 0
            ? this.searchWithData()
            : this.searchWithoutData()}
        </div>
      );
    }
  }
}
const mapStateToProps = state => ({
  loading: state.itemReducer.loadingAPI,
  data: state.itemReducer.data,
  cart: state.itemReducer.cart
});

export default connect(mapStateToProps, {
  itemAction,
  addToCart,
  searchAction
})(Products);
