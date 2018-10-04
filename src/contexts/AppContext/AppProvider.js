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
    //Exemplo de set state que
    // altera o state apenas quando necessário
    this.setState((state, props) => {
      //Se a propriedade alterada é igual a atual, não precisa alterar nada
      if (state.isLoaded === loaded) return null;
      else return { isLoaded: loaded };
    });
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
