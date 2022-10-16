import { call, fork, put, take, takeEvery, takeLatest } from "redux-saga/effects";

import * as types from "./actionTypes";
import {
  createUserError,
  deleteUserError,
  filterUserError,
  filterUserSuccess,
  loadUsersError,
  loadUsersSuccess,
  searchUserError,
  searchUserSuccess,
  updateUserError,
} from "./actions";

import { createUserApi, deleteUserApi, filterUserApi, loadUsersApi, searchUserApi, updateUserApi } from "./api";

// USERS REQUESTS
function* workerOnLoadUsers() {
  try {
    const response = yield call(loadUsersApi);
    console.log(response);

    if (response.status === 200) {
      yield put(loadUsersSuccess(response.data));
    }
  } catch (err) {
    console.log(err.response);
    yield put(loadUsersError(err.response.statusText));
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
      // fetch to update our store & display updated data
      yield call(workerOnLoadUsers);
    }
  } catch (err) {
    yield put(createUserError(err.response.statusText));
  }
}

// NOTE - When observing Redux Actions with 'takeEvery' and 'takeLatest' effects,
// the Redux Action with its payload is actually passed into the Worker Saga above
function* watchOnCreateUser() {
  yield takeLatest(types.CREATE_USER_START, workerOnCreateUser);
}

// USER DELETE
function* workerOnDeleteUser(userId) {
  try {
    const response = yield call(deleteUserApi, userId);

    if (response.status === 200) {
      // fetch to update our store & display updated data
      yield call(workerOnLoadUsers);
    }
  } catch (err) {
    yield put(deleteUserError(err.response.statusText));
  }
}

function* watchOnDeleteUser() {
  while (true) {
    const { payload: userId } = yield take(types.DELETE_USER_START);

    yield call(workerOnDeleteUser, userId);
  }
}

// USER UPDATE
function* workerOnUpdateUser({ payload: { id, formValue } }) {
  // const { id, formValue } = payload;

  try {
    const response = yield call(updateUserApi, id, formValue);

    if (response.status === 200) {
      // fetch to update our store & display updated data
      yield call(workerOnLoadUsers);
    }
  } catch (err) {
    yield put(updateUserError(err.response.statusText));
  }
}

function* watchOnUpdateUser() {
  yield takeLatest(types.UPDATE_USER_START, workerOnUpdateUser);
}

// SEARCH USER
function* workerOnSearchUser({ payload: query }) {
  try {
    const response = yield call(searchUserApi, query);

    if (response.status === 200) {
      yield put(searchUserSuccess(response.data));
    }
  } catch (err) {
    yield put(searchUserError(err.response.statusText));
  }
}

function* watchOnSearchUser() {
  yield takeLatest(types.SEARCH_USER_START, workerOnSearchUser);
}

// FILTER USER
function* workerOnFilterUser({ payload: value }) {
  try {
    const response = yield call(filterUserApi, value);
    console.log(response);

    if (response.status === 200) {
      yield put(filterUserSuccess(response.data));
    }
  } catch (err) {
    yield put(filterUserError(err.response.statusText));
  }
}

function* watchOnFilterUser() {
  yield takeLatest(types.FILTER_USER_START, workerOnFilterUser);
}

// Fork is to run multiple sagas in the background
const userSagas = [
  fork(watchOnLoadUsers),
  fork(watchOnCreateUser),
  fork(watchOnDeleteUser),
  fork(watchOnUpdateUser),
  fork(watchOnSearchUser),
  fork(watchOnFilterUser),
];

export default userSagas;
