import * as types from "./actionTypes";

const initialState = {
  users: [],
  loading: false,
  error: "",
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_USERS_START:
    case types.CREATE_USER_START:
    case types.DELETE_USER_START:
    case types.UPDATE_USER_START:
    case types.SEARCH_USER_START:
    case types.FILTER_USER_START:
      return {
        ...state,
        loading: true,
      };

    case types.LOAD_USERS_SUCCESS:
    case types.SEARCH_USER_SUCCESS:
    case types.FILTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: "",
      };

    // case types.CREATE_USER_SUCCESS:
    // case types.UPDATE_USER_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //   };

    // case types.DELETE_USER_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     users: state.users.filter(i => i.id !== action.payload),
    //   };

    case types.LOAD_USERS_ERROR:
    case types.CREATE_USER_ERROR:
    case types.DELETE_USER_ERROR:
    case types.UPDATE_USER_ERROR:
    case types.SEARCH_USER_ERROR:
    case types.FILTER_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
