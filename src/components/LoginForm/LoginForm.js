import React from "react";

import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

import { TextField, Grid, Button } from "@material-ui/core";

import LoginContext from "./../../contexts/LoginContext/LoginContext";

const styles = theme => {
  return {
    loginButton: {
      height: "56px",
      paddingTop: "18.5px",
      paddingBottom: "18.5px",
      marginTop: theme.spacing.unit * 2,

      [theme.breakpoints.down("sm")]: {
        marginBottom: theme.spacing.unit * 2
      }
    },
    layout: {
      height: "auto",
      overflow: "hidden",
      marginLeft: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 2
    }
  };
};

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLoading: false,
      errors: {}
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = loginFunc => {
    let { username, password } = this.state;

    if (!username || !password) {
      this.setState({
        errors: {
          username: !username ? true : false,
          password: !password ? true : false
        }
      });
    } else {
      loginFunc(username, password).then(result => {
        console.log(result);
      });
    }
  };

  render() {
    const { username, password, errors } = this.state;
    const { classes } = this.props;

    return (
      <LoginContext.Consumer>
        {loginValue => {
          const { authService } = loginValue;
          return (
            <div
              className={
                classes.layout +
                " " +
                { width: isWidthUp("sm", this.props.width) ? "200px" : "100%" }
              }
            >
              <Grid container spacing={8}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="username"
                    name="username"
                    label="Usuário"
                    margin="normal"
                    variant="outlined"
                    valume={username}
                    error={errors.username}
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="senha"
                    label="Senha"
                    name="password"
                    type="password"
                    margin="normal"
                    variant="outlined"
                    value={password}
                    error={errors.password}
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    color="primary"
                    variant="outlined"
                    className={classes.loginButton}
                    onClick={() => this.handleSubmit(authService.login)}
                  >
                    Fazer login
                  </Button>
                </Grid>
              </Grid>
            </div>
          );
        }}
      </LoginContext.Consumer>
    );
  }
}

export default withWidth()(withRouter(withStyles(styles)(LoginForm)));
