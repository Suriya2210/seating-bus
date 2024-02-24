import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { useSelector } from "react-redux";
import { LoginForm } from "../LoginForm";
import { Page } from "../Page";
// Import your background image
import backgroundImage from "./login-heropage.jpg"; // Replace "your-background-image.jpg" with the path to your image file



const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(6, 2),
    // backgroundImage: `url(${backgroundImage})`, // Set the background image
    // backgroundSize: "cover", // Ensure the image covers the entire container
    // zIndex:0
  },
  loginForm: {
    marginTop: theme.spacing(3),
  },
  alert: {
    marginTop: theme.spacing(2),
  },
}));

function Login() {
  const classes = useStyles();

  const auth = useSelector((state) => state.auth);

  return (
    <Page title="Book Your Seat" className={classes.root}>
      <Card>
        <CardContent>
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
