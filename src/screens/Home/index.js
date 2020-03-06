/* eslint-disable no-undef */
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Nav
} from 'react-bootstrap';
import './../style/Home.css';

import Loader from './../../components/Loader';
import Logo from './../../assets/logo.png'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true
    }
  }

  gay(){
    console.log('Junio é gay');
  }

  loader = () => {
    $( document ).ready(() => {
      this.setState({ isLoading: false });
    })
  }

  componentDidMount = () => {
    this.loader();
  }

  render() { 
    return (
      this.state.isLoading ?
      <Loader/> 
      :
      <div className="App">
        {/** HEADER PART */}
        <div className="header">
          <div className="pt-2 logo-part d-inline-flex px-3">
            <h2 className="logo-text"><a href="/" title="LeaguePoPo">LeaguePoPo</a></h2>
          </div>
          <Nav className="justify-content-start navmenu" activeKey="/home">
            <Nav.Item>
              <Nav.Link href="/">Início</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-1">Melhores players</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-2">Estatisticas de campeões</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        {/** HEADER PART END */}
        <div className="content container-fluid">
          <div className="row justify-content-center">
            <div>
              <img src={Logo} width="256px" title="LeaguePoPo" alt="LeaguePoPo" />
            </div>
          </div>
          <div className="row">
            <div>
              <h1>Olá</h1>
            </div>
          </div>
        </div>
      </div>
     );
  }
}
