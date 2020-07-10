import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { InputLabel } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { loginRequest } from "../../../core/actions/auth";

const useStyles = makeStyles(theme => ({
  root: {
    marginRight: "auto",
    marginLeft: "auto",
    width: "700px"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    marginTop: theme.spacing(10)
  },
  control: {
    padding: theme.spacing(2)
  },
  textField: {
    textAlign: "right",
    marginBottom: theme.spacing(3)
  },
  formInput: {
    // marginRight: "20%"
  },
  button: {
    // marginRight: "75%"
  },
  header: {
    // marginRight: "20%",
    marginBottom: theme.spacing(5)
  }
}));

export default ({ dispatch, auth, history }) => {
  if (auth && auth.isAuthenticated) {
    history.push("/");
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = field => e => {
    if (field === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const submit = () => {
    dispatch(loginRequest({ email, password }));
  };
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <h3 className={classes.header}>فرم ورود</h3>
              <div className={classes.formInput}>
                <InputLabel required> ایمیل</InputLabel>
                <TextField
                  id="outlined-name"
                  className={classes.textField}
                  value={email}
                  onChange={handleChange("email")}
                  margin="normal"
                />
                <InputLabel required> رمز عبور</InputLabel>
                <TextField
                  type="password"
                  id="outlined-name"
                  className={classes.textField}
                  value={password}
                  onChange={handleChange("password")}
                  margin="normal"
                />
              </div>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={submit}
              >
                ورود
              </Button>
            </Paper>
            <Link to="/signup">ساخت حساب جدید</Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
