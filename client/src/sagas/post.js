import { call, put, takeEvery, takeLatest } from '@redux-saga/core/effects';
import {
    ADD_POST,
    ADD_POST_ERROR,
    ADD_POST_SUCCESS,
    SEARCH_POSTS,
    SEARCH_POSTS_SUCCESS,
    SEARCH_POSTS_ERROR,
    REMOVE_POST,
    REMOVE_POST_SUCCESS,
    POST_ERROR,
    OPEN_SNACKBAR,
    START_LOADING,
    STOP_LOADING,
    MORE_POSTS,
    MORE_POSTS_SUCCESS,
    MORE_POSTS_ERROR
} from '../actions/types';
import { postService } from '../services/post';
import { confirmSaga } from './confirm';

function * addPost (request) {
    try {
        yield put({ type: START_LOADING });
        const response = yield call(postService.addPost, request);
        yield put({ type: OPEN_SNACKBAR, message: 'Success: Post Added', variant: 'success', duration: 1250 });
        yield put({ type: ADD_POST_SUCCESS, response });
    } catch (err) {
        yield put({ type: OPEN_SNACKBAR, message: 'Error: could not add post', variant: 'error', duration: 1500 });
        yield put({ type: ADD_POST_ERROR, err });
    }
    yield put({ type: STOP_LOADING });
}

export function * addPostSaga () {
    yield takeEvery(ADD_POST, addPost);
}

function * searchPosts (request) {
    try {
        const response = yield call(postService.searchPosts, request);
        yield put({ type: SEARCH_POSTS_SUCCESS, payload: response });
    } catch (err) {
        yield put({ type: SEARCH_POSTS_ERROR, err });
    }
}

export function * searchPostSaga () {
    yield takeLatest(SEARCH_POSTS, searchPosts);
}

function * morePosts (request) {
    try {
        const response = yield call(postService.morePosts, request);
        yield put({ type: MORE_POSTS_SUCCESS, payload: response });
    } catch (err) {
        yield put({ type: MORE_POSTS_ERROR, err });
    }
}

export function * morePostSaga () {
    yield takeLatest(MORE_POSTS, morePosts);
}

function * removePost (request) {
    const confirmed = yield call(confirmSaga, {
        title: 'Delete Post',
        message: 'Are you sure you want to delete this post?'
    });
    if (!confirmed) { return; }

    try {
        yield call(postService.removePost, request);
        yield put({ type: OPEN_SNACKBAR, message: 'Success: Post removed', variant: 'success', duration: 1250 });
        yield put({ type: REMOVE_POST_SUCCESS, post: request.post });
    } catch (err) {
        yield put({ type: OPEN_SNACKBAR, message: 'Error: could not be removed', variant: 'error', duration: 1500 });
        yield put({ type: POST_ERROR, err });
    }
}

export function * removePostSaga () {
    yield takeEvery(REMOVE_POST, removePost);
}
