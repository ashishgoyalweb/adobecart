import React, { Component } from "react";
import { sortAction, togglePopup } from "./itemAction";
import { connect } from "react-redux";

class Sort extends Component {
  sorting = val => {
    this.props.sortAction(val);
  };

  render() {
    return (
      <>
        <div className="sort">
          <b>Sort By</b>
          <div className="mobileFilterHead">Sort Options</div>
          <span
            className={this.props.selected === "HIGH" ? "active" : ""}
            onClick={() => this.sorting("HIGH")}
          >
            <label>
              {" "}
              <input
                type="radio"
                name="sort"
                checked={this.props.selected === "HIGH" ? true : false}
              />
              Price -- High Low
            </label>
          </span>
          <span
            className={this.props.selected === "LOW" ? "active" : ""}
            onClick={() => this.sorting("LOW")}
          >
            <label>
              {" "}
              <input
                type="radio"
                name="sort"
                checked={this.props.selected === "LOW" ? true : false}
              />
              Price -- Low High
            </label>
          </span>
          <span
            className={this.props.selected === "DISCOUNT" ? "active" : ""}
            onClick={() => this.sorting("DISCOUNT")}
          >
            <label>
              {" "}
              <input
                type="radio"
                name="sort"
                checked={this.props.selected === "DISCOUNT" ? true : false}
              />
              Discount
            </label>
          </span>

          <button onClick={this.props.togglePopup}>Close</button>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  selected: state.itemReducer.sort
});

export default connect(mapStateToProps, { sortAction, togglePopup })(Sort);
