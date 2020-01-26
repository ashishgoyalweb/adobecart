import React, { Component } from "react";
import Filter from "./component/filter";
import Sort from "./component/sort";
import Products from "./component/productlist";
import Popup from "./component/popup";
import { connect } from "react-redux";
import { togglePopup } from "./component/itemAction";

class Cartpage extends Component {
  handlePopup = text => {
    this.props.togglePopup(text);
  };
  render() {
    return (
      <div className="wrapper">
        <aside className="lft showOnDesktop">
          <Filter />
        </aside>
        <aside className="rgt">
          <div className="showOnDesktop">
            <Sort />
          </div>
          <div className="showOnMobile">
            <span
              className="MobileSort"
              onClick={() => this.handlePopup("SORT")}
            >
              <i className="fa fa-sort"></i>Sort
            </span>
            <span
              className="MobileFilter"
              onClick={() => this.handlePopup("FILTER")}
            >
              <i className="fa fa-filter"></i>Filter
            </span>
          </div>
          <Products />
        </aside>
        {this.props.showPopup ? <Popup filter={this.props.popupText} /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  showPopup: state.itemReducer.showPopup,
  popupText: state.itemReducer.popupText
});

export default connect(mapStateToProps, { togglePopup })(Cartpage);
