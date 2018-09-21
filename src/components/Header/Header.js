import React from "react";
import logo from "./logo_ages.svg";
import { withRouter, Redirect } from "react-router-dom";

// Biblioteca de Componentes
import Menu from "@material-ui/core/Menu";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

// Importando o Contexto de autenticação, não tratamos mais com os services.
import LoginForm from "../LoginForm/LoginForm";
import LoginContext from "../Context/LoginContext/LoginContext";
import { SwipeableDrawer } from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  appLogo: {
    cursor: "pointer",
    height: "50px",
    width: "50px",
    margin: "2px",
    float: "left"
  },
  layout: {
    width: "200px",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },
  loginDrawer: {
    width: "200px"
  }
});

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorLogin: null
    };
  }

  redirect = path => {
    const { history } = this.props;
    history.push(path);
  };

  handleMenuOpen = name => {
    this.setState({ [name]: true });
  };

  handleMenuClose = name => {
    this.setState({ [name]: false });
  };

  // Renderizando botão de Login
  renderLogin = anchorLogin => {
    const { classes } = this.props;
    let open = Boolean(anchorLogin);

    return (
      <React.Fragment>
        <Button
          color="inherit"
          id="loginBtn" // Colocar ids diferentes para os automatores de software poderem encontrar esse elemento da pagina
          onClick={e => this.handleMenuOpen("anchorLogin")}
        >
          Logar-se
        </Button>
        <SwipeableDrawer
          open={open}
          anchor="right"
          onOpen={() => this.handleMenuOpen("anchorLogin")}
          onClose={() => this.handleMenuClose("anchorLogin")}
        >
          <LoginForm />
        </SwipeableDrawer>
      </React.Fragment>
    );
  };

  // Renderizando botão de logout
  // Passando função de logout por parametro pois ela vem do Contexto
  renderLogout = logout => {
    return (
      <Button
        color="inherit"
        id="logoutBtn"
        onClick={() => {
          logout();
        }}
      >
        Deslogar
      </Button>
    );
  };

  // Renderizando Menu
  renderMenu = () => {
    const { classes } = this.props;

    return (
      <IconButton
        className={classes.menuButton}
        color="inherit"
        aria-label="Menu"
      >
        <MenuIcon />
      </IconButton>
    );
  };

  // Renderizando Icone do sistema
  renderIcon = () => {
    const { classes } = this.props;
    return (
      <img
        className={classes.menuButton + " " + classes.appLogo}
        src={logo}
        alt="logo"
        onClick={() => <Redirect to="/" />}
      />
    );
  };

  // Renderizando Titulo da página
  renderTitle = () => {
    const { classes } = this.props;

    return (
      <Typography variant="title" color="inherit" className={classes.flex}>
        Titulo
      </Typography>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      /* Chamando o Consumidor do Contexto de autencicação, para ter acesso ao state dele (pela variavel value) */
      <LoginContext.Consumer>
        {value => {
          //Abrindo a variavel value em constantes, só para facilitar o uso.
          const { isAuthenticated, authService } = value;
          return (
            <div className={classes.root}>
              <AppBar position="static">
                <Toolbar>
                  {/* Renderizando Menu */}
                  {this.renderMenu()}
                  {/* Renderizando Logo da AGES */}
                  {this.renderIcon()}
                  {/* Renderizando o titulo da página */}
                  {this.renderTitle()}
                  {/* Verificando se o usuário está logado, mais pratico que o método de usar um render no state. */}
                  {isAuthenticated()
                    ? this.renderLogout(authService.logout)
                    : this.renderLogin(this.state.anchorLogin)}
                </Toolbar>
              </AppBar>
            </div>
          );
        }}
      </LoginContext.Consumer>
    );
  }
}

export default withStyles(styles)(withRouter(Header));
