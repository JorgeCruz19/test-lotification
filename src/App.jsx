import "./App.css";
import { useEffect, useReducer } from 'react';
import { AuthContext } from "./auth/authContext";
import { authReducer } from "./auth/authReducer";
import  AppRouter  from "./router/AppRouter";

const init = () => {
	return JSON.parse( sessionStorage.getItem('user') ) || { logged: false };
}

function App() {
	const [ user, dispatch ] = useReducer( authReducer, {}, init );

	useEffect(() => {
			if ( !user ) return;

			sessionStorage.setItem('user', JSON.stringify(user) );
	}, [ user ])

  return (
    <AuthContext.Provider
      value={{
        user,
        dispatch,
      }}
    >
      <AppRouter />
    </AuthContext.Provider>
  );
}

export default App;
