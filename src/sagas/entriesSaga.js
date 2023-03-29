import { call, fork, put, take } from "redux-saga/effects";
import entriesType from "../actions/entries.actions";
import axios from "axios";
import { populateEntries, populateEntryDetails } from "../actions/entries.actions";

export function* getAllEntries() {
  yield take(entriesType.GET_ENTRIES);
  console.log("i need entries data");
  const { data } = yield call(axios, "http://localhost:3001/entries");
  yield put(populateEntries(data));
}

export function* getEntryDetails(id) {
  const { data } = yield call(axios, `http://localhost:3001/values/${id}`);
  console.log(data);
  yield put(populateEntryDetails(id, data));
}

export function* getAllEntriesDetails() {
  const { payload } = yield take(entriesType.POPULATE_ENTRIES);
  for (let index = 0; index < payload.length; index++) {
    const entry = payload[index];
    yield fork(getEntryDetails, entry.id);
  }
}
