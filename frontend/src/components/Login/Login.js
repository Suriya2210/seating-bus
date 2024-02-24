import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { useSelector } from "react-redux";
import { LoginForm } from "../LoginForm";
import { Page } from "../Page";
// Import your background image
// import bckImg from "./VioletFlower.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundImage:`url(https://i.ibb.co/3CZv0S1/purple-Petal.jpg)`,
    height: "100%",
    display: "flex",
    alignItems: "center", 
    justifyContent: "center",
    padding: theme.spacing(6, 2),
    // backgroundImage: `url(${backgroundImage})`, // Set the background image
    backgroundSize: "cover", // Ensure the image covers the entire container
    // zIndex:0
  },
  loginForm: {
    marginTop: theme.spacing(3),
  },
  alert: {
    marginTop: theme.spacing(2),
  },
  card: {
    background: 'rgba(255, 255, 255, 0.2)', // Transparent white background
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )', // Box shadow for glassy effect
    backdropFilter: 'blur(10px)', // Blur effect for glassy effect
    borderRadius: '10px', // Rounded corners
    border: '1px solid rgba( 255, 255, 255, 0.18 )', // White border with transparency
    padding: theme.spacing(2), // Adjust padding as needed
    margin: theme.spacing(2), // Add some margin for spacing
  },
}));

function Login() {
  const classes = useStyles();

  const auth = useSelector((state) => state.auth);

  return (
    <Page title="Veralto|Book Your Seat" className={classes.root}>
      <Card>
        <CardContent >
          <Typography gutterBottom variant="h3">
            Sign In
          </Typography>
          {auth.error && (
            <Alert severity="error" className={classes.alert}>
              {auth.error.message || auth.error}
            </Alert>
          )}

          <LoginForm className={classes.loginForm} />
          
        </CardContent>
      </Card>
    </Page>
  );
}

export default Login;
