import {
  takeEvery,
  delay,
  takeLatest,
  buffers,
  channel,
  eventChannel,
  END
} from 'redux-saga'
import {
  put,
  call,
  take,
  fork,
  select,
  actionChannel,
  cancel,
  cancelled
} from 'redux-saga/effects'

import moment from 'moment'
import handleRequest from './servers'
import {
  REQUEST_POSTS,
  RECEIVE_POSTS
} from '../actions/actionsTypes'

const list = ()=>{
  var  defered = handleRequest("https://api.github.com/users",{a:1});
  var  posts  =  defered.then(json => json.map(item => item.url))
    .then(url => url.map(item => handleRequest(item)))
    .then(pro => {
      return Promise.all(pro)
    })
    .catch(err=> console.log(err));
  return posts;
};

function* fetchPosts() {
  yield call(delay, 3000);
  const posts = yield list();
  yield put({type: RECEIVE_POSTS, posts, receivedAt: moment().format("HH:mm:ss")})
}

export function* watchPost() {
  while( yield take(REQUEST_POSTS) ){
    yield fork(fetchPosts)
  }
}