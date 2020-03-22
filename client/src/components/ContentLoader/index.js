import React, { Component } from 'react';
import {
  Spinner
} from 'react-bootstrap';
import './../style/ContentLoader.css';

export default class ContentLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() {
    return (
      <div className="content-loader">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
}
