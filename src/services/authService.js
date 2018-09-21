import axios from "axios";
import * as crypto from "crypto-js";
import { api } from "./../config/Urls";
import { HTTPStatusCodes } from "./../config/Constants";
//import * as querystring from 'querystring'

export const login = async (username, password, encrypt_password) => {
  const params = {
    username: username,
    //TODO - Utilizar sempre senha encriptada, precisamos alterar a API para não encriptar de novo.
    password: encrypt_password ? crypto.SHA256(password).toString() : password
  };

  axios({
    method: "post",
    url: `${api}/login`,
    data: params,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response) {
        const api_response = response.data;

        if (api_response.data) {
          const token = api_response.data.token;

          if (api_response.data.token) {
            localStorage.setItem("token", token);
            return api_response;
          }
        }
        return api_response.error;
      } else {
        return {
          statusDesc: "Erro obtendo resposta do servidor.",
          statusCode: HTTPStatusCodes.InternalServerError
        };
      }
    })
    .catch(error => {
      throw error;
    });
};

export const logout = () => {
  console.log("Deslogado...");
  localStorage.removeItem("token");
};

export const validToken = async () => {
  const token = localStorage.getItem("token");
  axios({
    method: "get",
    url: `${api}/login/token`,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}` // Passando o token de autorização
    }
  })
    .then(response => {
      debugger;
      if (response) {
        const responseData = response.data;
        //TODO - Passas essas constantes para o projeto da API também, para não usar 0 nesses casos.
        const isAuthenticated = responseData.statusCode === 0;
        //console.log('Valid token response:', responseData)
        return isAuthenticated;
      } else {
        return {
          statusDesc: "Erro obtendo resposta do servidor.",
          statusCode: HTTPStatusCodes.InternalServerError
        };
      }
    })
    .catch(error => {
      debugger;
      throw error;
    });
};
