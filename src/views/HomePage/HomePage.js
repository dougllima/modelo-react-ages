import React from "react";
import page from "../Page";

class HomePage extends page {
  authenticated = () => (
    <React.Fragment>
      <p>Testanderson OK</p>
    </React.Fragment>
  );

  unauthenticated = () => (
    <React.Fragment>
      <p>Testanderson NOT OK</p>
    </React.Fragment>
  );
}

export default HomePage;
