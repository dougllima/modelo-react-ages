import React, { Component } from "react";

import AppContext from "./../Context/AppContext/AppContext";

import "./Loader.css";

class Loader extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {value => {
          const { isLoaded } = value;
          return (
            <React.Fragment>
              {(!isLoaded || this.props.pastDelay) && (
                <div className="preloader">
                  <div className="spinner" />
                </div>
              )}
              {this.props.children}
            </React.Fragment>
          );
        }}
      </AppContext.Consumer>
    );
  }
}

export default Loader;
