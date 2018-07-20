import "phoenix_html"
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import People from "./People.jsx"
import peopleReducer from "./peopleReducer"
import { Provider } from "react-redux"
var elmNode = document.getElementById('elmRoot');
var reactNode = document.getElementById('reactRoot');

if (elmNode) {
  Elm.Main.embed(elmNode);
} else {
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
    reactNode
  );
}