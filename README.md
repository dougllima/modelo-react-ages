## Indice

- [Estrutura](#estrutura)
  - [Configurações](#configura%C3%A7%C3%B5es)
    - [Constantes](#constantes)
    - [Ambiente](#ambiente)
    - [Rotas](#rotas)
    - [URLs](#urls)
  - [Modelos](#modelos)
  - [Views](#views)
  - [Componentes](#componentes)
    - [Contexto](#contexto)
  - [Helpers](#helpers)
    - [ModelValidator()](#modelvalidator)
    - [ViewWrapper()](#viewwrapper)
  - [Serviços](#servi%C3%A7os)

# Estrutura

## Configurações

### Constantes

Constantes que auxiliam na padronização do sistema. Servem para substituir valores por um nome que facilite sua identificação.

- [Respostas HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status);
- Respostas da API;
- Exceções da Aplicação.

### Ambiente

Indicação do **ambiente** que o sistema está rodando, se é **produção**, **homologação** ou **desenvolvimento**.

A configuração é feita atraves da váriavel de ambiente `NODE_ENV`.

### Rotas

Configurações de **rotas do sistema**, onde são cadastradas todas as páginas e as suas respectivas **URLs**, utilizando o componente [`<Route>`](https://reacttraining.com/react-router/core/api/Route) do [react-router-dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)

**Quando criada uma nova rota**, usar o helper [`ViewWrapper()`](#viewwrapper):

- Ao inves de realizar um import normal, criar uma constante para receber o valor da função [`ViewWrapper()`](#viewwrapper), que recebe como parametro o caminho para o componente desejado **(relativo a pasta [`/views`](#views))**.

```javascript
// Path completo = ./views/HomePage/HomePage
const HomePage = ViewWrapper("HomePage/HomePage");
```

Rotas atuais:

- `/` - HomePage - Tela inicial do sistema.
- Demais Rotas - Teka de erro 404.

### URLs

Responsável por definir as URLs do sistema com base no ambiente atual.

## Modelos

**Objetos** que serão utilizados para a **representação de dados** do sistema.
Todos os modelos devem apresentar a seguinte estrutura:

Import obrigatorio para realizar as validações de schema da classe.

```javascript
import ModelValidator from "./../lib/ModelValidator";
```

**Schema** do objeto que será iniciado
com as **propriedades da classe e seus [tipos](https://github.com/epoberezkin/ajv/blob/master/KEYWORDS.md#type)**, conforme [biblioteca de validação](https://github.com/epoberezkin/ajv).

```javascript
let schema = {
properties: {
  data: { type: "object" },
  error: { type: "object" },
  status: { type: "string" }
},
required: ["data", "error", "status"]
}
```

Declaração do objeto com suas propriedades (atributos) e com o **construtor que realizara a validação**.

```javascript
class Objeto {
propriedade;
outraPropriedade;

// Construtor da classe, recebendo o objeto que deve ser inicializado.
  constructor(obj){
    // Método que valida o objeto de acordo com o schema
    //e inicializa uma nova instancia dele
    ModelValidator(obj, schema, this);
  }
}
```

## Views

**Componentes** que representam uma tela a ser renderizada para o usuário. Todas as páginas devem **extender uma página default `<Page>`**.

O componente `<Page>` possui os métodos:

- **`isAuthenticated()`** - Retorna se o usuário está autenticado ou não.
- **`setLoaded(bool)`** - Define se o loader deve ou não aparecer na tela.

Além disso possui também os métodos que **devem ser sobreescritos** em cada página:

- **`authenticated()`** - Retorna [JSX](https://reactjs.org/docs/introducing-jsx.html) para ser renderizado caso o usuário esteja autenticado.
- **`unauthenticated()`** - Retorna [JSX](https://reactjs.org/docs/introducing-jsx.html) para ser renderizado caso o usuário não esteja autenticado.

A menos que a página em questão altere esse comportamento, o componente `<Page>` renderiza na tela o seguinte:

```javascript
render() {
  return (
    <React.Fragment>
      <Header />
      {this.props.isAuthenticated()
        ? this.authenticated()
        : this.unauthenticated()}
    </React.Fragment>
  );
}
```

## Componentes

### Contexto

Os **[contextos do React](https://reactjs.org/docs/context.html)** são utilizados como **"estados globais"** da aplicação, podendo serem acessados em qualquer componente sem que se precise passar os valores como props por vários niveis.

Cada Contexto possui **2 arquivos**:

- Arquivo responsável por **criar o contexto** com seu [Provider](https://reactjs.org/docs/context.html#provider) e [Consumer](https://reactjs.org/docs/context.html#consumer):

```javascript
import React from "react";

const AppContext = React.createContext();

export default AppContext;
```

- Componente que guardara no seu state o valor do contexto, **encapsulando o Provider original**:

```javascript
import React, { Component } from "react";

// Import do contexto criado anteriormente
import AppContext from "./AppContext.js";

class AppProvider extends Component {

  // Construtor com o estado inicial do componente
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      {/* Renderização do Provider original criado pelo Contexto */}
      {/* definindo que o valor dele corresponde ao state do componente atual */}

      <AppContext.Provider value={this.state}>

        {/* Renderizando os componentes filhos dentro do Provider do contexto */}
        {/* Para que eles tenham acesso ao valor quando chamarem o Consumer */}
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
```

Depois desses arquivos criados, o componente `<AppProvider>` deve **englobar a aplicação**, como no arquivo [App.js, linha 37](https://github.com/dougllima/modelo-react-ages/blob/9e555b22e96ea3e45e35471307864e6fde859456/src/App.js#L37).

**IMPORTANTE: O componente que deve englobara aplicação é o criado com base no contexto (neste caso `<AppProvider>`) e não Provider do proprio contexto (neste caso `<AppContext.Provider>`)**

Agora para acessar o valor em qualquer componente da aplicação, basta chamar o **Consumer** do contexto desejado:

```javascript
import AppContext from "./Context/AppContext/AppContext";

// ...

render(){
  return (
    <AppContext.Consumer>
    {appValue => {
      return (
        <div>
          Valor do contexto atual: {appValue}
        </div>
      )
    }}
    </AppContext.Consumer>
  )
}
```

## Helpers

### ModelValidator()

Responsável por válidar os objetos criados de acordo com o schema informado.

Utiliza o modulo [**ajv**](https://github.com/epoberezkin/ajv).

### ViewWrapper()

Responsável por receber o path de uma [View](#views) e retornar o componente da tela referente, porém dentro de um **componente Loadable** do modulo [react-loadable](https://github.com/jamiebuilds/react-loadable), que possui algumas vantagens:

- Import dinâmico dos componentes;
- Loader inserido automaticamente;
- Injeção dos contexto de `App` e `Login` através das props.

## Serviços
