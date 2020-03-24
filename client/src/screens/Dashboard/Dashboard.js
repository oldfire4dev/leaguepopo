import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Navbar,
  Nav,
} from 'react-bootstrap';
import $ from 'jquery';

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
          <div>
            <div>
              <div>
                <img className="rounded-circle summoner-img" src={this.state.summonerInfoData.ImgURL} alt="Summoner Profile Icon" />
              </div>
            </div>
            <h2>{this.getParams().server}</h2>
            <h2>{this.getParams().summonerName}</h2>
            <h2>Level: {this.state.summonerInfoData.summonerLevel}</h2>
          </div>
        </div>
        {/** CONTENT PART END */}
      </div>
    );
  }
}
