import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { InputLabel } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { signupRequest } from "../../../core/actions/auth";

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
  const [name, setName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const handleChange = field => e => {
    if (field === "name") {
      setName(e.target.value);
    } else if (field === "phone_number") {
      setPhoneNumber(e.target.value);
    } else if (field === "type") {
      setType(e.target.value);
    } else if (field === "email") {
      setEmail(e.target.value);
    } else if (field === "password_confirmation") {
      setPasswordConfirmation(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const submit = () => {
    dispatch(
      signupRequest({
        name,
        email,
        phone_number,
        password,
        password_confirmation,
        type
      })
    );
  };
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <h3 className={classes.header}>فرم ثبت‌نام</h3>
              <div className={classes.formInput}>
                <InputLabel required> نام</InputLabel>
                <TextField
                  id="outlined-name"
                  className={classes.textField}
                  value={name}
                  onChange={handleChange("name")}
                  margin="normal"
                />
                <InputLabel required> ایمیل</InputLabel>
                <TextField
                  id="outlined-name"
                  className={classes.textField}
                  value={email}
                  onChange={handleChange("email")}
                  margin="normal"
                />
                <InputLabel required> شماره تلفن همراه</InputLabel>
                <TextField
                  id="outlined-name"
                  className={classes.textField}
                  value={phone_number}
                  onChange={handleChange("phone_number")}
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
                <InputLabel required> تکرار رمز عبور</InputLabel>
                <TextField
                  type="password"
                  id="outlined-name"
                  className={classes.textField}
                  value={password_confirmation}
                  onChange={handleChange("password_confirmation")}
                  margin="normal"
                />
                <br />
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">نوع حساب</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    className={classes.group}
                    value={type}
                    onChange={handleChange("type")}
                    row
                  >
                    <FormControlLabel
                      value="manager"
                      control={<Radio />}
                      label="مدیریت"
                    />
                    <FormControlLabel
                      value="customer"
                      control={<Radio />}
                      label="مشتری"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={submit}
              >
                ثبت‌نام
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
