const kayn = require('./../setting');

getSummonerInfo = (req, res) => {
  const {server} = req.params;
  const urlProfileIcon = 'http://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/';
  getSummonerId(req).then(data => {
    getSummonerLeague(server, data.id).then( league => {
      getSummonerMatch(server, data.id).then( body => {
        console.log(data)
        const summonerInfo = {data, body, league};
        res.json({
          summonerId: data.id,
          summonerName: data.name,
          summonerLevel: data.summonerLevel,
          ImgURL: urlProfileIcon+data.profileIconId+'.png',
          league,

          });
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
  }).catch(err => console.log(err))
}

getSummonerMatch = async (server, id) => {
  return await kayn.kaynObject.Summoner.by.id(id).region(kayn.regions[server]);
}

getSummonerLeague = async (server, id) => {
  return await kayn.kaynObject.League.Entries.by.summonerID(id).region(kayn.regions[server]);
}

getSummonerId = async (req) => {
  const {server, summonerName} = req.params;
  return await kayn.kaynObject.Summoner.by.name(summonerName).region(kayn.regions[server]);
}

module.exports = {
  getSummonerInfo,
}
