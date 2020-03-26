import axios from 'axios';

const LeaguePoPoAPI = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
})

export default LeaguePoPoAPI;
