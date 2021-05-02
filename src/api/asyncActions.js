const redux = require('redux');
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const initialState = {
  loading: false,
  users: [],
  error: '',
};

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    axios
      .get(
        'https://app-transfer.com:3001/api/driver/deliveries?status=1&sorting=1&page=1&limit=10',
        {
          headers: {
            accept: 'application/json',
            Authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJpZCI6MjEsImFwcF92ZXJzaW9uIjoxfSwiaWF0IjoxNjE5NDIzNjM4fQ.KxBcSb7Hs-uwIDhy5J5RTS6dZw6_tJLKPzRmTQm4afw',
          },
        },
      )
      .then(response => {
        // response.data is the users
        const users = response.data;
        dispatch(fetchUsersSuccess(users));
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchUsersFailure(error.message));
      });
  };
};

const reducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: '',
      };
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(fetchUsers());
