import { createContext, useState } from "react";
import PropTypes from 'prop-types'
import Cookies from "js-cookie";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const auth = Cookies.get('token') ? true : false;
  const [isAuth, setIsAuth] = useState(auth);
  return (
    <AuthContext.Provider value={[isAuth, setIsAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
    children: PropTypes.node,
}

export default AuthContextProvider;
