import React from 'react';
import './App.css';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from '@redux-saga/core';
import { Provider } from 'react-redux'

import { rootSaga } from './Store/Sagas/rootSaga'
import MainView from './Views/MainView'
import dataReducer from './Store/Reducers/data';

const rootReducer = combineReducers({
  data: dataReducer
})

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
  sagaMiddleware.run(rootSaga)
  return store
}

const store = configureStore()

function App() {
  return (
    <Provider store={store}>
      <MainView />
    </Provider>
  )
}

export default App;
