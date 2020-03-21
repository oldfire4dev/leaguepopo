import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Button,
  Spinner
} from 'react-bootstrap';

import './../style/Loader.css';
class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = { 

    }
  }
  render() { 
    return ( 
      <div className="loader">
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="sr-only">Loading...</span>
        </Button>
      </div>
     );
  }
}
 
export default Loader;
