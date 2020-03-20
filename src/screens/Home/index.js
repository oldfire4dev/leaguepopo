/* eslint-disable no-undef */
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Navbar,
  Nav,
  InputGroup,
  DropdownButton,
  Dropdown,
  FormControl
} from 'react-bootstrap';

import {
  Link
} from 'react-router-dom';

import './../style/Home.css';
import ServerList from './../../config/api/servers.json';
import Loader from './../../components/Loader';
import Logo from './../../assets/logo.png'
import ChampionsApi from './../../config/api/champion_v3';

const ChampionsV3 = new ChampionsApi;
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true,
      summonerName: null,
      server: 'Servidor'
    }
  }

  getServer = (server) => {
    this.setState({ server })
  }

  getSummoner = (summonerName) =>{
    this.setState({ summonerName })
  }

  loader = () => {
    $( document ).ready(() => {
      this.setState({ isLoading: false });
    })
  }

  componentDidMount = () => {
    this.loader();
    ChampionsV3.getChampionFreeWeek()
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
            <div>
              <img src={Logo} width="256px" title="LeaguePoPo" alt="LeaguePoPo" />
            </div>
          </div>
          <div className="row justify-content-center my-5">
            <div>
              <InputGroup className="mb-3">
                <DropdownButton
                  as={InputGroup.Prepend}
                  variant="outline-secondary"
                  title={this.state.server}
                  id="input-group-dropdown-1"
                >
                  {ServerList.Servers.map((res) => 
                    <Dropdown.Item key={res.id} onClick={() => {this.getServer(res.serverId)}}>{res.serverId}</Dropdown.Item>
                  )}
                  <Dropdown.Item href="#">Another action</Dropdown.Item>
                </DropdownButton>
                <FormControl aria-describedby="basic-addon1" placeholder="Invocador" title="Nome do invocador" onChange={(val) => { this.getSummoner(val.target.value) }} />
              </InputGroup>
            </div>
            <div className="ml-3 wrap">
              <Link to={`/dashboard?server=${this.state.server}&summonerName=${this.state.summonerName}`} >
                <button className='btn-go'>
                  Buscar
                </button>
              </Link>
            </div>
          </div>
          <div>
            <h2>AA</h2>
          </div>
        </div>
        {/** CONTENT PART END */}
      </div>
     );
  }
}
