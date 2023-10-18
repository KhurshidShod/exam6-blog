import styles from "./Header.module.scss";
import Logo from "../../assets/images/logo.svg";
import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { HiBars3BottomRight, HiXMark } from "react-icons/hi2";
import { AuthContext } from "../../context/isAuthContext";

const Header = () => {
  const [isAuth, setIsAuth] = useContext(AuthContext);
  const [navShrink, setNavShrink] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset >= 100) {
        setNavShrink(true);
      } else {
        setNavShrink(false);
      }
    });
  }, []);
  return (
    <header className={navShrink ? styles.shrink : null}>
      <div className="container">
        <nav>
          <div className={styles.logo}>
            {isAuth ? <Link style={{
              fontSize: '18px',
              color: 'white'
            }} to="/myposts">
              My blogs
            </Link> : <Link to="/">
              <img src={Logo} alt="" />
            </Link>}
          </div>
          <div className={styles.right}>
            <ul
              className={`${styles.nav_menu} ${
                navOpen ? styles.navOpen : null
              }`}
            >
              <li onClick={() => setNavOpen(false)}>
                <NavLink to="/">Home</NavLink>
              </li>
              <li onClick={() => setNavOpen(false)}>
                <NavLink to="aboutus">About Us</NavLink>
              </li>
              <li onClick={() => setNavOpen(false)}>
                <NavLink to="/posts">Blog</NavLink>
              </li>
              <li onClick={() => setNavOpen(false)}>
                <NavLink to="/register">Register</NavLink>
              </li>
              <li
                onClick={() => setNavOpen(false)}
                className={styles.login_accaunt}
              >
                {isAuth ? <Link to="/account">
                  <button>Account</button>
                </Link> : <Link to="/login">
                  <button>Login</button>
                </Link>}
              </li>
              <li className={styles.closeNav} onClick={() => setNavOpen(false)}>
                <HiXMark color="white" size={35} />
              </li>
            </ul>
            <button className={styles.openNav} onClick={() => setNavOpen(true)}>
              <HiBars3BottomRight color="white" size={35} />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
