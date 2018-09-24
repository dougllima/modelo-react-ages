import React, { Component } from "react";

// Utilizando .js no import pois o contexto não é uma classe
import AppContext from "./AppContext.js";

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Header
      headerVisible: true,

      //Loader
      isLoaded: true,
      setLoaded: loaded => this.setLoaded(loaded)
    };
  }

  setLoaded = loaded => {
    //Alterando o state apenas quando necessário
    this.setState((state, props) => {
      return state.isLoaded === loaded ? null : { isLoaded: loaded };
    });
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }

  //Métodos de Login
}

export default AppProvider;
