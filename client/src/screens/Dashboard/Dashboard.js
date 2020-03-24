import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Navbar,
  Nav,
} from 'react-bootstrap';
import $ from 'jquery';

import LeaguePoPoAPI from './../../service/api';

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
    const body = await LeaguePoPoAPI.get(`/dashboard/${this.getParams().server}/${this.getParams().summonerName}`);
    this.setState({ summonerInfoData: body.data })
  }

  loader = () => {
    $( document ).ready(() => {
      this.setState({ isLoading: false });
    })
  }

  getChampionLevelColor = () => {
    if(this.state.summonerInfoData.summonerLevel < 30) 
      return {backgroundColor: '#adc7c9'}
    else if(this.state.summonerInfoData.summonerLevel >= 30 && this.state.summonerInfoData.summonerLevel < 50) 
      return {color: '#4c8522', backgroundColor: '#adc7c9'}
    else if(this.state.summonerInfoData.summonerLevel >= 30 && this.state.summonerInfoData.summonerLevel < 50) 
      return {color: '#fff', backgroundColor: '#4c8522'}
    else if(this.state.summonerInfoData.summonerLevel >= 50 && this.state.summonerInfoData.summonerLevel < 75) 
      return {color: '#fff', backgroundColor: '#1728d7'}
    else if(this.state.summonerInfoData.summonerLevel >= 75 && this.state.summonerInfoData.summonerLevel < 100) 
      return {color: '#fff', backgroundColor: '#f49c3f'}
    else if(this.state.summonerInfoData.summonerLevel >= 100 && this.state.summonerInfoData.summonerLevel < 150) 
      return {color: '#fff', backgroundColor: '#cea651'}
    else if(this.state.summonerInfoData.summonerLevel >= 150 && this.state.summonerInfoData.summonerLevel < 175) 
      return {color: '#fff', backgroundColor: '#5ed9f9'}
    else if(this.state.summonerInfoData.summonerLevel >= 175)
      return {color: '#fff', backgroundColor: '#714f14'}
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
                <span className="summoner-level rounded-circle" style={this.getChampionLevelColor()} >{this.state.summonerInfoData.summonerLevel}</span>
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
