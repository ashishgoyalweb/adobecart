import { ItemActions } from "./itemAction";

const initialState = {
  loadingAPI: false,
  data: [],
  displayData: [],
  price: 100000,
  sort: "HIGH",
  cart: [],
  cartCheckout: [],
  search: [],
  searchText: "",
  searchCart: [],
  filterValue: "10000",
  totalPrice: 0,
  totalDiscount: 0,
  showPopup: false,
  popupText: "SORT"
};

export const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ItemActions.POSTS_STARTED:
      return { ...state, loadingAPI: true };

    case ItemActions.POSTS_SUCCESS: {
      if (state.cart.length > 0) {
        let cartData = action.payload;
        cartData = action.payload.map(d => {
          let x = state.cart.find(x => x.id === d.id);
          if (x) {
            d.btnStatus = true;
            return d;
          } else {
            d.btnStatus = false;
            return d;
          }
        });
        return {
          ...state,
          loadingAPI: false,
          data: cartData,
          displayData: action.payload
        };
      } else {
        return {
          ...state,
          loadingAPI: false,
          data: action.payload,
          displayData: action.payload
        };
      }
    }

    case ItemActions.POSTS_FAILURE:
      return { ...state, loadingAPI: false };

    case "SORT": {
      let type = action.payload;
      let newData;
      if (type === "LOW") {
        newData = state.data.slice().sort((a, b) => a.price - b.price);
      } else if (type === "HIGH") {
        newData = state.data.slice().sort((a, b) => b.price - a.price);
      } else {
        newData = state.data.slice().sort((a, b) => b.discount - a.discount);
      }
      //console.log("inside sort", state.data, " new data ", newData);
      return { ...state, data: newData, sort: action.payload };
    }

    case "FILTER_VALUE":
      return { ...state, filterValue: action.payload };

    case "FILTER": {
      let data = state.displayData
        .filter(d => d.price < state.filterValue)
        .filter(d =>
          d.name.toLowerCase().includes(state.searchText.toLowerCase())
        );
      //console.log("Filter ", data, " State ", state.data);
      let type = state.sort;
      let newData;
      if (type === "LOW") {
        newData = data.slice().sort((a, b) => a.price - b.price);
      } else if (type === "HIGH") {
        newData = data.slice().sort((a, b) => b.price - a.price);
      } else {
        newData = data.slice().sort((a, b) => b.discount - a.discount);
      }
      return {
        ...state,
        data: newData
      };
    }
    case "ADD_TO_CART": {
      let cartData = state.cart.slice();

      let item = action.payload;

      let iscart = state.cart.find(d => d.id === item.id);

      if (iscart) {
        cartData = state.cart.map(d => {
          if (d.id === iscart.id) {
            iscart.count = iscart.count + 1;
            return iscart;
          } else {
            return d;
          }
        });
      } else {
        item.count = 1;
        cartData.push(item);
      }

      return {
        ...state,
        cart: cartData.filter(d => d.count !== 0),
        cartCheckout: cartData.filter(d => d.count !== 0)
      };
    }
    case "SEARCH": {
      let search_data = state.displayData
        .filter(d =>
          d.name.toLowerCase().includes(action.payload.toLowerCase())
        )
        .filter(d => d.price < state.filterValue);

      let type = state.sort;
      let newData;
      if (type === "LOW") {
        newData = search_data.slice().sort((a, b) => a.price - b.price);
      } else if (type === "HIGH") {
        newData = search_data.slice().sort((a, b) => b.price - a.price);
      } else {
        newData = search_data.slice().sort((a, b) => b.discount - a.discount);
      }

      return {
        ...state,
        data: newData,
        searchText: action.payload
      };
    }

    case "SEARCH_CHECKOUT": {
      let search_data = state.cartCheckout.filter(d =>
        d.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        searchText: action.payload,
        searchCart: search_data
      };
    }

    case "REMOVE": {
      return {
        ...state,
        searchCart: state.searchCart.filter(d => d.id !== action.payload),
        cart: state.cart.filter(d => d.id !== action.payload),
        cartCheckout: state.cartCheckout.filter(d => d.id !== action.payload)
      };
    }

    case "INITAIL_TOTAL": {
      let price = 0;
      let discount = 0;
      state.cart.forEach(item => {
        price = price + item.price * item.count;
        discount = discount + ((item.price * item.discount) / 100) * item.count;
      });
      return { ...state, totalPrice: price, totalDiscount: discount };
    }

    case "TOGGLE_POPUP":
      return {
        ...state,
        showPopup: !state.showPopup,
        popupText: action.payload
      };

    default:
      return state;
  }
};
