import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import TestStore from './store/TestsStore';
import UserStore from './store/UserStore';

export const Context = createContext(null)

console.log(process.env.REACT_APP_API_URL);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    user : new UserStore(),
    test : new TestStore()
  }}>
    <App />
  </Context.Provider>
);
