import React, { Component } from "react";
import PropTypes from "prop-types";

import Header from "./../components/Header/Header";
import Exception from "../models/Exception";
import { Exceptions } from "../config/Constants";

class Page extends Component {
  static propTypes = {
    //Props default de todas páginas:
    //Loader
    isLoaded: PropTypes.bool.isRequired,
    setLoaded: PropTypes.func.isRequired,

    //Header
    headerVisible: PropTypes.bool.isRequired,

    //Auth
    userData: PropTypes.oneOf([PropTypes.null, PropTypes.object]),
    isAuthenticated: PropTypes.func.isRequired
  };

  authenticated = () => <p>Testanderson Quase OK</p>;

  unauthenticated = () => {
    let ex = new Exception({
      ...Exceptions.Unauthorized
    });
    throw Error(JSON.stringify(ex));
  };

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
}

export default Page;
