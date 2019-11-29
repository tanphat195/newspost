import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleWare from 'redux-saga';
import rootReducer from '../reducers';
import rootSagas from '../sagas';

const sagaMiddleWare = createSagaMiddleWare();
const store = createStore(
  rootReducer,
  applyMiddleware(
    sagaMiddleWare
  )
);

sagaMiddleWare.run(rootSagas);

export default store;