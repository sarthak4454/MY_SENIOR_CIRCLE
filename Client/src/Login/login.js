import React from "react";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { InputAdornment, IconButton } from "@material-ui/core";
import { signin, googleauth, updateMsg } from "../Actions/user";
import { UPDATE_MESSAGE } from "../constants/actionTypes";
import { Visibility } from "@material-ui/icons";
import { VisibilityOff } from "@material-ui/icons";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { GoogleLogin } from "react-google-login";
import "./login_style.css";

function Login(props) {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const { message } = useSelector((state) => state.posts);
  const [winWidth, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const FormFormat = {
    firstname: "",
    lastname: "",
    emailid: "",
    password: ""
  }

  const [form, setForm] = useState(FormFormat);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    if (form.emailid === "") {
      dispatch(updateMsg("Email Id can't be empty"));
      return;
    }
    else if (form.password === "") {
      dispatch(updateMsg("Password field can't be empty"));
      return;
    }
    dispatch(signin(form, navigate));
  }

  const googleSuccess = async (res) => {
    const result = res?.profileObj;

    form.firstname = result.givenName;
    form.lastname = result.familyName;
    form.emailid = result.email;
    form.password = result.googleId;

    try {
      dispatch(googleauth(form, navigate));
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');

  return (<div className="backg_sign">
    <div className="box-sign">
      {(winWidth > 767) &&
        <Row className="m-0">
          <Col className="sign_form" lg={8} md={8}>
            <div className="data-3">Login to Senior Circle</div>
            {message != "" && <div className="animated fadeOut errorLogin" style={{ animationDelay: "1s" }}>{message}</div>}
            <div className="form_style">
              <input className="input_style2" onChange={(e) => handleChange(e)} required type="email" name="emailid" placeholder="Email id" /><br />
              <input className="input_style2" onChange={(e) => handleChange(e)} required handleShowPassword={handleShowPassword} type={showPassword ? "text" : "password"} name="password" placeholder="Password" />
              <InputAdornment className="eye">
                <IconButton onClick={handleShowPassword} >
                  {showPassword === true ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            </div>
            <div className="forgotpass">Forgot password?</div>
            <button className="sign_but3" onClick={handleSubmit}>LOG IN</button>
            <div className="OrStyle">
              --------- OR ---------
            </div>
            <div className="googleLogin">
              <GoogleLogin
                clientId="348438982756-1sii29uv02r004hm3vqemk8l761arkop.apps.googleusercontent.com"
                render={(renderProps) => (
                  <div className="googleStyle" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    <GoogleIcon className="googleIcon" />
                    Sign in with Google</div>)}
                onSuccess={googleSuccess}
                onFailure={googleError}
                cookiePolicy="single_host_origin"
              />
            </div>
          </Col>
          <Col className="sign2_detail" lg={4} md={4}>
            <div className="data-1">Hello There!</div>
            <div className="data-2">Enter your details and start your journey with us.</div>
            <Link to="/signup">
              <button size="md" className="sign_but1" onClick={() => {
                props.formtype(true);
                dispatch({ type: UPDATE_MESSAGE, payload: "" });
              }}>SIGN UP</button>
            </Link>
          </Col>
        </Row>}
      {(winWidth < 768) &&
        <Row className="m-0">
          <Col className="sign2_detail" lg={4} md={4} sm={12} xs={12}>
            <div className="data-1">Hello There!</div>
            <div className="data-2">Enter your details and start your journey with us.</div>
            <Link to="/signup">
              <button size="md" className="sign_but1" onClick={() => {
                props.formtype(true);
                dispatch({ type: UPDATE_MESSAGE, payload: "" });
              }}>SIGN UP</button>
            </Link>
          </Col>
          <Col className="sign_form" lg={8} md={8} sm={12} xs={12}>
            <div className="data-3">Login to Senior Circle</div>
            <div className="form_style">
              <input className="input_style2" onChange={handleChange} required type="text" name="emailid" placeholder="Email id" /><br />
              <input className="input_style2" onChange={handleChange} required handleShowPassword={handleShowPassword} type={showPassword ? "text" : "password"} name="password" placeholder="Password" />
              <InputAdornment className="eye">
                <IconButton onClick={handleShowPassword} >
                  {showPassword === true ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            </div>
            <div className="forgotpass"></div>
            <button size="md" className="sign_but3" onClick={handleSubmit}>LOG IN</button>
            <div className="OrStyle">
              --------- OR ---------
            </div>
            <div className="googleLogin">
              <GoogleLogin
                clientId="348438982756-1sii29uv02r004hm3vqemk8l761arkop.apps.googleusercontent.com"
                render={(renderProps) => (
                  <div className="googleStyle" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    <GoogleIcon className="googleIcon" />
                    Sign in with Google</div>)}
                onSuccess={googleSuccess}
                onFailure={googleError}
                cookiePolicy="single_host_origin"
              />
            </div>
          </Col>
        </Row>}
    </div>
  </div>
  )
}
export default Login;