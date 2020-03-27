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
import ContentLoader from './../../components/ContentLoader';
import Logo from './../../assets/logo.png'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true,
      contentIsLoading: true,
      summonerInfoData: [],
      summonerData: null
    }
  }

  getQuery = () => {
    let server = this.props.query.get('server');
    let summonerName = this.props.query.get('summonerName');
    return { server, summonerName }
  }

  getParams = () => {
    let summonerData = this.props.summonerData.summonerData
    this.setState({ summonerData })
  }

  getSummonerInfo = async () => {
    const body = await LeaguePoPoAPI.get(`api/dashboard/${this.getQuery().server}/${this.getQuery().summonerName}`);
    return body.data
  }

  loader = () => {
    $( document ).ready(() => {
      this.setState({ isLoading: false });
    })
  }

  contentLoader = () => {
    $( document ).ready(() => {
      this.setState({ contentIsLoading: false })
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
    this.getParams();
    this.getSummonerInfo().then(data => {
      if(data) {
        let summonerData = data.map((body, index) => {
          console.log(body)
          return (
            <div key={index}>
              <div className="row">
                <img className="rounded-circle summoner-img" src={body.ImgURL} alt="Summoner Profile Icon" />
                <span className="summoner-level rounded-circle" style={this.getChampionLevelColor()} >{body.summonerLevel}</span>
              </div>
              <div className="row justify-content-between">
                <div>
                  <h3 className="summoner-name" >{body.summonerName}</h3>
                </div>
                <div className="mt-4">
                  <p className="summoner-league-tier"><strong>{body.league.tier} {body.league.rank}</strong></p>
                  <p className="summoner-league win" >Vitórias: {body.league.wins}</p>
                  <p className="summoner-league lose" >Derrotas: {body.league.losses}</p>
                </div>
              </div>
            </div>
          );
        })
        this.setState({ summonerInfoData: summonerData })
      }
      this.contentLoader();
    })
  }

  render() {
    console.log(this.state.summonerData)
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
              {this.state.contentIsLoading?
                <ContentLoader />
                :
                this.state.summonerInfoData
              }
            </div>
            
          </div>
        </div>
        {/** CONTENT PART END */}
      </div>
    );
  }
}
