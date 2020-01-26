import React, { Component } from "react";
import { searchAction } from "../component/itemAction";
import { connect } from "react-redux";

class Search extends Component {
  search = e => {
    let { isCheckoutPage } = this.props;
    this.props.searchAction(e.target.value, isCheckoutPage);
  };
  render() {
    return (
      <div className="search">
        <input
          type="text"
          className="srch"
          value={this.props.searchText}
          onChange={this.search}
          placeholder="Search"
        />
        <i className="fa fa-search"></i>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchText: state.itemReducer.searchText
});

export default connect(mapStateToProps, { searchAction })(Search);
