export const ItemActions = {
  POSTS_STARTED: "POSTS_STARTED",
  POSTS_SUCCESS: "POSTS_SUCCESS",
  POSTS_FAILURE: "POSTS_FAILURE"
};

export function itemAction() {
  return async dispatch => {
    try {
      dispatch({ type: ItemActions.POSTS_STARTED });
      fetch("https://api.myjson.com/bins/qzuzi")
        .then(res => {
          if (res.status === 200 || res.status === 304) {
            return res.json();
          }
        })
        .then(res => {
          dispatch({ type: ItemActions.POSTS_SUCCESS, payload: res });
          dispatch({ type: "SORT", payload: "HIGH" });
        });
    } catch (error) {
      console.log("error ", error);
      dispatch({ type: ItemActions.POSTS_FAILURE });
    }
  };
}

/*Filter*/

export function filterAction() {
  return dispatch => {
    dispatch({ type: "FILTER" });
  };
}

export function filterValueAction(price) {
  return dispatch => {
    dispatch({ type: "FILTER_VALUE", payload: price });
  };
}

/*Sorting */

export function sortAction(type) {
  return dispatch => {
    dispatch({ type: "SORT", payload: type });
  };
}

/*Add to Cart */
export function addToCart(item) {
  return dispatch => {
    dispatch({ type: "ADD_TO_CART", payload: item });
    dispatch(getCalculation());
  };
}

/*Search */
export function searchAction(search, isCheckoutPage) {
  return dispatch => {
    if (isCheckoutPage) {
      dispatch({ type: "SEARCH_CHECKOUT", payload: search });
    } else {
      dispatch({ type: "SEARCH", payload: search });
    }
  };
}

export function removeCart(id) {
  return dispatch => {
    dispatch({ type: "REMOVE", payload: id });
    dispatch(getCalculation());
  };
}

export function getCalculation(item) {
  return dispatch => {
    dispatch({ type: "INITAIL_TOTAL", payload: item });
  };
}

export function togglePopup(text) {
  return dispatch => {
    dispatch({ type: "TOGGLE_POPUP", payload: text });
  };
}
