import { call, fork, put, takeEvery } from "redux-saga/effects";

import * as types from "./actionTypes";
import { loadUsersApi } from "./api";

// USERS REQUESTS
function* workerOnLoadUsers() {
  try {
    const result = yield call(loadUsersApi);
    console.log(result);

    yield put(types.LOAD_USERS_SUCCESS(result.data));
  } catch (err) {
    yield put(types.LOAD_USERS_ERROR(err.response.data));
  }
}

function* watchOnLoadUsers() {
  yield takeEvery(types.LOAD_USERS_START, workerOnLoadUsers);
}

const userSagas = [fork(watchOnLoadUsers)];

export default userSagas;
