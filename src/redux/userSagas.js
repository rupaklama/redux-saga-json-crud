import { call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";

import * as types from "./actionTypes";
import { createUserError, loadUsersError, loadUsersSuccess } from "./actions";

import { createUserApi, loadUsersApi } from "./api";

// USERS REQUESTS
function* workerOnLoadUsers() {
  try {
    const response = yield call(loadUsersApi);
    console.log(response);

    if (response.status === 200) {
      yield put(loadUsersSuccess(response.data));
    }
  } catch (err) {
    yield put(loadUsersError(err.response.data));
  }
}

function* watchOnLoadUsers() {
  yield takeEvery(types.LOAD_USERS_START, workerOnLoadUsers);
}

// USER CREATE
function* workerOnCreateUser({ payload }) {
  try {
    const response = yield call(createUserApi, payload);

    if (response.status === 200) {
      // display updated data
      yield call(workerOnLoadUsers);
    }
  } catch (err) {
    yield put(createUserError(err.response.data));
  }
}

// NOTE - When observing Redux Actions with 'take', 'takeEvery' and 'takeLatest' effects,
// the Redux Action with its payload is actually passed into the Worker Saga above
function* watchOnCreateUser() {
  yield takeLatest(types.CREATE_USER_START, workerOnCreateUser);
}

// Fork is to run multiple sagas in the background
const userSagas = [fork(watchOnLoadUsers), fork(watchOnCreateUser)];

export default userSagas;
