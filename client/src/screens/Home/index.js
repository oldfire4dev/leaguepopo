/* eslint-disable no-undef */
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Navbar,
  Nav,
  InputGroup,
  DropdownButton,
  Dropdown,
  FormControl,
  CardGroup, Card
} from 'react-bootstrap';

import {
  Link
} from 'react-router-dom';

import './../style/Home.css';
import ServerList from './../../config/api/servers.json';
import Loader from './../../components/Loader';
import Logo from './../../assets/logo.png'
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true,
      contentIsLoading: true,
      summonerName: null,
      server: 'Servidor',
      msg: null
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

  contentLoader = () => {
    $( document ).ready(() => {
      this.setState({ contentIsLoading: false })
    })
  }

  championV3 = async () => {
    let request = await fetch('/champion/freeweek');
    let body = request.json();
    if (request.status !== 200) throw Error(body.message);
    return body;
  }

  componentDidMount = () => {
    this.loader();
    this.championV3().then(res=>{
      this.setState({ msg: res.ids })
      console.log(this.state.msg)
      this.contentLoader();
    })
    .catch(err => console.log(err));
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
          <div className="row">
            <div className="col-md-10">
              <CardGroup className="rounded">
                <Card>
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This is a wider card with supporting text below as a natural lead-in to
                    additional content. This content is a little bit longer.
                    {!this.state.contentIsLoading ? this.state.msg.forEach((res) => {
                    return (<h2>{res}</h2>)
                    })
                      :
                      null
                    }
                  </Card.Text>
                </Card.Body>
                </Card>
                <Card>
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                      This card has supporting text below as a natural lead-in to additional
                      content.{' '}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </CardGroup>
            </div>
          </div>
        </div>
        {/** CONTENT PART END */}
      </div>
      );
  }
}
