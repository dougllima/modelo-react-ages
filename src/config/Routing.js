import React from "react";
import { Switch, Route } from "react-router-dom";

// Wrapper para as páginas
import ViewWrapper from "../helpers/ViewWrapper";
import Exception from "../models/Exception";
import { Exceptions } from "./Constants";

// Views
// Implementado um Wrapper que substitui o import normal para adicionar loader e outras funcionalidades.
// Ver o arquivo src/helpers/ViewWrapper.js
const HomePage = ViewWrapper("HomePage/HomePage");

export default () => (
  <main>
    {/* Rotas do app */}
    <Switch>
      {/* Página inicial */}
      <Route exact path="/" component={HomePage} />

      {/* Página não encontrada (404) */}
      <Route
        render={() => {
          throw new Error(
            JSON.stringify(
              new Exception({
                ...Exceptions.NotFound
              })
            )
          );
        }}
      />
    </Switch>
  </main>
);
