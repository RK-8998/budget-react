import { call, cancel, delay, fork, put, take, takeEvery, takeLatest } from "redux-saga/effects";

function double(number) {
  return number * 2;
}

export function* testSaga() {
  while (true) {
    console.log("Saga Start Function");
    const state = yield take("TEST_MESSAGE");
    const a = yield call(double, 2);
    console.log(a);
    const b = yield double(3);
    console.log(b);
    console.log("Saga Finish Function", state);
  }
}

function* doNothing() {
  console.log("i have been called");
  yield delay(1000);
  console.log("i am doing nothing");
}

export function* testSagaFork() {
  while (true) {
    yield take("TEST_MESSAGE_2");
    yield fork(doNothing);
    yield fork(doNothing);
    yield fork(doNothing);
  }
}

export function* testSagaTakeEveryProcess({ payload }) {
  console.log(`Process for index is ${payload}`);
  yield delay(3000);
  console.log(`Ending for index is ${payload}`);
}

export function* testSagaTakeEvery() {
  const { payload } = yield takeEvery("TEST_MESSAGE_3", testSagaTakeEveryProcess);
  console.log(`index: ${payload}`);
}

function cancelled() {}
function* infinitySaga() {
  let index = 0;
  console.log("Starting infinity saga");
  while (true) {
    index++;
    try {
      console.log(`inside infinity loop ${index}`);
      yield delay(1000);
    } catch (error) {
      console.log("A Error happened", error);
    } finally {
      console.log("The fork was cancelled", yield cancelled());
    }
  }
}

export function* testSagaCancelled() {
  yield take("TEST_MESSAGE_4");
  const handleCancel = yield fork(infinitySaga);
  yield delay(3000);
  yield cancel(handleCancel);
}

export function* testSagaLatest() {
  yield takeLatest("TEST_MESSAGE_5", infinitySaga);
}

export function* dispatchTest() {
  let index = 0;
  // yield put({ type: "TEST_MESSAGE_5", payload: index });

  while (true) {
    yield delay(500);
    yield put({ type: "TEST_MESSAGE_5", payload: index });
    index++;
  }
}
