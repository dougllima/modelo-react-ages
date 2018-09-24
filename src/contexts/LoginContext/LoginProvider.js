import React, { Component } from "react";

//Utilizando .js no import pois o contexto não é uma classe
import LoginContext from "./LoginContext";

import { login, logout, validToken } from "./../../services/authService";

//Provedor do Contexto da aplicação, todos componentes abaixo desse tem acesso ao state dele, atravez de um Consumidor de contexto
class LoginProvider extends Component {
  constructor(props) {
    super(props);

    //Estado inicial da aplicação
    this.state = {
      // Ultima vez que o token foi validado.
      lastTokenCheck: null,
      // Qual usuário está logado atualmente
      userData: null,
      // Token do usuário
      token: localStorage.getItem("token"),

      //Método para verificar se o usuário está autenticado (usar no lugar do validToken).
      isAuthenticated: this.isAuthenticated,
      //Métodos da classe auth
      authService: {
        login: this.login,
        logout: this.logout,
        validToken
      }
    };
  }

  render() {
    return (
      /* Renderizando o Provedor do contexto com os outros componentes dentro */
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    );
  }

  //Verifica se o usuário está logado
  isAuthenticated = forceValidation => {
    const { lastTokenCheck, token, authService } = this.state;

    //Verifica se existe um token salvo.
    if (token) {
      //Verifica se o token já foi checado.
      if (lastTokenCheck) {
        const timeNow = new Date().getTime();
        const timeDif =
          Math.abs(timeNow - lastTokenCheck.getTime()) / 1000 / 60;

        //Verifica se faz mais de 5 minutos que o token foi checado
        if (timeDif > 5 || forceValidation) {
          //Checa o token do usuário logado.
          if (authService.validToken()) {
            this.setState({ lastTokenCheck: new Date() });
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      } else if (authService.validToken()) {
        this.setState({ lastTokenCheck: new Date() });
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  login = async (username, password) => {
    login(username, password)
      .then(result => {
        if (result && result.data) {
          this.setState({
            token: result.data.token,
            userData: result.data.userData
          });
          return result.data;
        } else {
          throw result.error;
        }
      })
      .catch(error => {
        throw Error(error);
      });
  };

  logout = () => {
    this.setState({ token: null, userData: null }, logout());
  };
}

export default LoginProvider;
