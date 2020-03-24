import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Navbar,
  Nav,
} from 'react-bootstrap';
import $ from 'jquery';

import './../style/Dashboard.css';
import Loader from './../../components/Loader';
import Logo from './../../assets/logo.png'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true,
      summonerInfoData: [],
    }
  }

  getParams = () => {
    let server = this.props.query.get('server');
    let summonerName = this.props.query.get('summonerName');
    return { server, summonerName }
  }

  getSummonerInfo = async () => {
    const response = await fetch(`/dashboard/${this.getParams().server}/${this.getParams().summonerName}`);
    const body = await response.json();
    this.setState({ summonerInfoData: body })
  }

  loader = () => {
    $( document ).ready(() => {
      this.setState({ isLoading: false });
    })
  }

  componentDidMount = () => {
    this.loader();
    this.getSummonerInfo();
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
          <Navbar expand="lg" className="justify-content-start navmenu" activeKey="/home">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Início</Nav.Link>
                <Nav.Link eventKey="link-1">Melhores players</Nav.Link>
                <Nav.Link eventKey="link-2">Estatisticas de campeões</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        {/** HEADER PART END */}
        {/** CONTENT PART */}
        <div className="content container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-11 col-sm-11 col-12 summoner-info-area">
              <div className="row">
                <img className="rounded-circle summoner-img" src={this.state.summonerInfoData.ImgURL} alt="Summoner Profile Icon" />
                <span className="summoner-level rounded-circle">{this.state.summonerInfoData.summonerLevel}</span>
              </div>
              <div>
                <h3 className="summoner-name" >{this.state.summonerInfoData.summonerName}</h3>
              </div>
            </div>
            
          </div>
        </div>
        {/** CONTENT PART END */}
      </div>
    );
  }
}
