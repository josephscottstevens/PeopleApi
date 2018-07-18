import "phoenix_html"
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import People from "./People.jsx"
import peopleReducer from "./peopleReducer"
import { Provider } from "react-redux"

// Store
const store =
  createStore(
    peopleReducer,
    applyMiddleware(thunk)
  );

ReactDOM.render(
  <Provider store={store}>
    <People />
  </Provider>,
  document.getElementById('root')
);