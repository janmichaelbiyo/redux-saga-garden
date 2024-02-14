import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// this startingPlantArray should eventually be removed
// const startingPlantArray = [
//   { id: 1, name: 'Rose' },
//   { id: 2, name: 'Tulip' },
//   { id: 3, name: 'Oak' },
// ];

const plantList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PLANT':
      return action.payload;
    default:
      return state;
  }
};

function* getPlants(action) {
  try {
    const elementsResponse = yield axios({
      method: 'GET',
      url: '/api/plants',
    });
    yield put({ type: 'ADD_PLANT', payload: elementsResponse.data });
  } catch (error) {
    console.log('danger in plants', error);
  }
}

function* postPlant(action) {
  try {
    yield axios({
      method: 'POST',
      url: '/api/plants',
      data: action.payload,
    });
    yield put({ type: 'GET_PLANTS' });
  } catch (error) {
    console.log('mistake at the post', error);
  }
}

function* deletePlant(action) {
  try {
    yield axios({
      method: 'DELETE',
      url: `/api/plants/${action.payload}`,
    });
    yield put({ type: 'GET_PLANTS' });
  } catch (error) {
    console.log('mistake at delete', error);
  }
}

const sagaMiddleware = createSagaMiddleware();

function* watcherSaga() {
  yield takeEvery('GET_PLANTS', getPlants);
  yield takeEvery('POST_PLANT', postPlant);
  yield takeEvery('DELETE_PLANT', deletePlant);
}
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// Note that the store is currently not
// configured to utilize redux-saga OR
// redux logger!
const store = createStore(
  combineReducers({ plantList }),
  applyMiddleware(sagaMiddleware, logger)
);
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
sagaMiddleware.run(watcherSaga);

export default store;
