// import { createStore } from 'redux';

// const initialState = {
//   isAuthenticated: !!localStorage.getItem("token"), 
//   token: localStorage.getItem("token"),
// };

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'LOGIN':
//       return {
//         ...state,
//         isAuthenticated: true,
//         token: action.payload.token,
//       };
//     case 'REGISTER':
//       return {
//         ...state,
//         isAuthenticated: true,
//         token: action.payload.token,
//       };
//     case 'LOGOUT':
//       return {
//         ...state,
//         isAuthenticated: false,
//         token: null,
//       };
//     default:
//       return state;
//   }
// };

// const store = createStore(authReducer);

// export default store;































import { createStore } from 'redux';

const initialState = {
  isAuthenticated: false,
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
      };
      case 'REGISTER':
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      };
    default:
      return state;
  }
};

const store = createStore(authReducer);

export default store;