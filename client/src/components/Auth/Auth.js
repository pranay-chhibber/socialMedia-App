import React ,{useState, useEffect} from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import {GoogleLogin} from 'react-google-login'
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from './Input';
import Icon from "./icon";
import {gapi} from 'gapi-script'
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {signIn, signUp} from '../../actions/auth'


const Auth = () => {
    const initialState = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''

    }

    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [formData, setFormData] = useState(initialState) 
    const classes = useStyles();
      const dispatch = useDispatch()
    const history = useHistory()
    

  const clientId = "523770669550-qtgui73jf0ko6ugfj9e3kt1bu6vrtiqv.apps.googleusercontent.com"

  useEffect(() => {
    gapi.load("client:auth2", () =>{
      gapi.auth2.init({clientId:clientId})
    })
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(isSignUp){
        dispatch(signUp(formData,history))
      }
      else{
      dispatch(signIn(formData,history))

    }
  };

  const handleChange = (e) => {
    setFormData({...formData , [e.target.name] : e.target.value})
  };

  const handleShowPassword = () => setShowPassword((prevShowPassword)=> !prevShowPassword);
  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp)
    handleShowPassword(false)
  };
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const  token = res?.tokenId
    try {

      
      dispatch({type : 'AUTH' , data: {result, token}})

      history.push('./')

    } catch (error) {
      console.log(error);
    }

    
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessfull. Try again later");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {isSignUp ? "Sign Up" : "Sign In"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                /> 

                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
               
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type='email'
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              />
              
              {isSignUp && <Input
              name="confirmPassword"
              label="Repeat Password"
              handleChange={handleChange}
              type="password"
            /> }
          </Grid>

            

          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
          {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
         <GoogleLogin
         clientId={clientId}
         render={(renderProps) => (
           <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
             Google Sign In
           </Button>
         )}
         onSuccess={googleSuccess}
         onFailure={googleFailure}
         cookiePolicy="single_host_origin"
       />

          <Grid container justifyContent="flex-end">
                  <Grid item>
                  <Button onClick={switchMode}>
                    {isSignUp ? 'Already have an Account ? Sign In' : "Don't have an account ? Sign Up"}
                  </Button>
                  </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
