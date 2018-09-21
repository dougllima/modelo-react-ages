import React from "react";

//Criando o contexto de autenticação (contexto = "state" global, pode ser acessado em todos filhos sem passar por prop).
const LoginContext = React.createContext();

export default LoginContext;
