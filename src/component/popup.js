import React, { Component } from "react";
import Sort from "./sort";
import Filter from "./filter";

export default class Popup extends Component {
  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          {this.props.filter === "SORT" ? <Sort /> : <Filter />}
        </div>
      </div>
    );
  }
}
