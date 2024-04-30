import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faHome, faAddressCard, faBookOpen, faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Logo from "../images/logo.png";
import { Link } from "react-router-dom";
import decode from "jwt-decode";

function CustomNavbar(props) {
  const [Toggle, setToggle] = useState(false);
  const user = JSON.parse(window.localStorage.getItem("profile"));
  const navigate = useNavigate();
  const location = useLocation();

  function logout() {
    window.localStorage.clear();
    navigate('/');
  }

  useEffect(() => {
    const token = user?.data?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime())
        logout();
    }
  }, [location]);

  return (props.FixedVal === true) && <div>
    {props.winWidth > 750 && <div className="nav_row1">
      <div className="DisplayFlex">
        <Link to="/" className="TextDecoration"><img src={Logo} alt="MySeniorCircle" className="logo_img" /></Link>
        <Link to="/" className="TextDecoration"><div className="Logo_title">MySeniorCircle</div></Link>
      </div>
      <div className="DisplayFlex">
        <div className="pages_option">
          <Link to="/" className="TextDecoration"><div className="nav_options">Home</div></Link>
          <Link to="/about" className="TextDecoration"><div className="nav_options">About</div></Link>
          <Link to="/blogs" className="TextDecoration"><div className="nav_options">Blogs</div></Link>
          {user && <Link to="/user/profile" className="TextDecoration"><div className="nav_options">My Profile</div></Link>}
        </div>
        <div className="button_class">
          {!user && <Link to="/login" className="TextDecoration"><button className="button_login">Login</button></Link>}
          {!user && <Link to="/signup" className="TextDecoration"><button className="button_signup">Sign up</button></Link>}
          {user && <button className="button_signup" onClick={() => logout()}>Log Out</button>}
        </div>
      </div>
    </div>}
    {props.winWidth <= 750 && (<div className={"nav_row1 " + (Toggle === true ? "selectiveNav" : "")}>
      <div className="DisplayFlex">
        <Link to="/" className="TextDecoration"><img src={Logo} className="logo_img" /></Link>
        <Link to="/" className="TextDecoration"><div className="Logo_title">MySeniorCircle</div></Link>
      </div>
      <div className="FlexRowReverse">
        <div className={"SideNav " + (Toggle === true ? "Nav1" : "Nav2")} style={{ height: props.winHeight }}>
          <FontAwesomeIcon icon={faTimes} onClick={() => setToggle(false)} className="cross" />
          {!user && <Link to="/login" className="TextDecoration"><div className="nav_options2" onClick={() => setToggle(false)}>Login</div></Link>}
          {!user && <Link to="/signup" className="TextDecoration"><div className="nav_options2" onClick={() => setToggle(false)}>Sign up</div></Link>}
          <Link to="/" className="TextDecoration"><div className="nav_options2"><div onClick={() => setToggle(false)}><FontAwesomeIcon icon={faHome} />&nbsp;&nbsp;Home</div></div></Link>
          <Link to="/about" className="TextDecoration"><div className="nav_options2"><div onClick={() => setToggle(false)}><FontAwesomeIcon icon={faAddressCard} />&nbsp;&nbsp;About</div></div></Link>
          <Link to="/blogs" className="TextDecoration"><div className="nav_options2"><div onClick={() => setToggle(false)}><FontAwesomeIcon icon={faBookOpen} />&nbsp;&nbsp;Blogs</div></div></Link>
          {user && <Link to="/user/profile" className="TextDecoration"><div className="nav_options2"><div onClick={() => setToggle(false)}><FontAwesomeIcon icon={faUser} />&nbsp;&nbsp;My Profile</div></div></Link>}
          {user && <div className="nav_options2" onClick={() => logout()}><div onClick={() => setToggle(false)}><FontAwesomeIcon icon={faSignOutAlt} />&nbsp;&nbsp;Log Out</div></div>}
        </div>
      </div>
      {Toggle === false && <div><FontAwesomeIcon icon={faBars} className="NavButton" onClick={() => setToggle(true)} /></div>}
    </div>)}
  </div>;
}
export default CustomNavbar;