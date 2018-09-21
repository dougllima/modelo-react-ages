import React, { Component } from "react";

class ErrorHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      code: null,
      info: null
    };
  }

  componentDidCatch(error, info) {
    let ex = null;
    try {
      // Tenta realizar o parse do erro.
      // Se ele foi lançado a mão no código, então virá como JSON.
      ex = JSON.parse(error);
    } catch (e) {
      //Se não funcionar o parse, o erro foi interno e não é um JSON.
    }

    if (ex != null)
      this.setState({
        error: ex.message,
        hasError: true,
        code: ex.code,
        info
      });
    else
      this.setState({
        hasError: true,
        code: null,
        error,
        info
      });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>{this.state.error}</h1>;
    }
    return this.props.children;
  }
}
export default ErrorHandler;
