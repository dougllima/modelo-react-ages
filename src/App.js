import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

// CSS
import CssBaseline from "@material-ui/core/CssBaseline";

// Internal
import Routing from "./config/Routing";
import AppProvider from "./components/Context/AppContext/AppProvider";
import LoginProvider from "./components/Context/LoginContext/LoginProvider";

// Theme Imports
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import * as colors from "@material-ui/core/colors/";
import ErrorHandler from "./components/ErrorHandler/ErrorHandler";

const theme = createMuiTheme({
  palette: {
    //Utilizando a cor verde como primaria, porém um pouco mais escura.
    secondary: colors.orange,
    primary: colors.blue,
    error: colors.red,
    type: "dark"
  }
});

class App extends Component {
  render() {
    return (
      /* Aplicando o tema a todo o projeto */
      <MuiThemeProvider theme={theme}>
        {/* "Limpando" o CSS da página */}
        <CssBaseline />
        {/* Tratador de erros, para caso algum erro ocorra */}
        <ErrorHandler>
          {/* Provedor de contexto da aplicação */}
          <AppProvider>
            {/* Provedor de contexto de autenticação */}
            <LoginProvider>
              {/* Responsavel por gerenciar as rotas do app */}
              <BrowserRouter>
                {/* Componente de rotas */}
                <Routing />
              </BrowserRouter>
            </LoginProvider>
          </AppProvider>
        </ErrorHandler>
      </MuiThemeProvider>
    );
  }
}

export default App;
