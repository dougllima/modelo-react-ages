import React from "react";

import Loadable from "react-loadable";

import Loader from "../components/Loader/Loader";

import AppContext from "./../components/Context/AppContext/AppContext";

import LoginContext from "./../components/Context/LoginContext/LoginContext";

// Criando um componente de Wrapper para as views, que adiciona o loader e o contexto no import.
const ViewWrapper = path =>
  Loadable({
    // Componente de loading das telas (o mesmo do resto do sistema)
    loading: Loader,

    // Delay para exibir o loader ao carregar uma página,
    //se o carregamento não demorar mais do que esse tempo, o loader não é exibido.
    delay: 200,

    // Página sendo carregada
    loader: () => import(`../views/${path}`),

    // Renderização custom da página sendo carregada, usada para passar os contextos para as páginas
    render(loaded, props) {
      let Component = loaded.default;
      return (
        <AppContext.Consumer>
          {appState => {
            return (
              <LoginContext.Consumer>
                {LoginValue => {
                  const { setLoaded, isLoaded, headerVisible } = appState;
                  const { isAuthenticated, userData } = LoginValue;

                  return (
                    <Component
                      isAuthenticated={isAuthenticated}
                      headerVisible={headerVisible}
                      setLoaded={setLoaded}
                      isLoaded={isLoaded}
                      userData={userData}
                      {...props}
                    />
                  );
                }}
              </LoginContext.Consumer>
            );
          }}
        </AppContext.Consumer>
      );
    }
  });

export default ViewWrapper;

/**
 * Exemplo de uso:
 *
 * Trocar:
 * import HomePage from "views/HomePage/HomePage"
 *
 * por:
 *
 * const HomePage = ViewWrapper("HomePage/HomePage")
 *
 * Todos os paths para o ViewWrapper são a partir da pasta 'views/'
 */
