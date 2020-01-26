import React, { Component } from "react";
import { filterAction, filterValueAction, togglePopup } from "./itemAction";
import { connect } from "react-redux";

class Filter extends Component {
  filterPrice = () => {
    this.props.filterAction();
  };

  getslidervalue = e => {
    this.props.filterValueAction(e.target.value);
  };
  render() {
    return (
      <>
        <div className="slider-box">
          <b>Filter</b>

          <div className="slider-range">
            <div className="min">&#x20b9; 100</div>
            <div className="value">
              &#x20b9; <span>{this.props.filterValue}</span>
            </div>
            <div className="max">&#x20b9; 10000</div>
          </div>

          <input
            type="range"
            min="100"
            max="10000"
            className="slider"
            id="myRange"
            value={this.props.filterValue}
            onChange={this.getslidervalue}
          />
          <div className="btn">
            <button onClick={this.props.togglePopup}>Close</button>
            <button onClick={this.filterPrice}>Apply</button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  filterValue: state.itemReducer.filterValue
});

export default connect(mapStateToProps, {
  filterAction,
  filterValueAction,
  togglePopup
})(Filter);
