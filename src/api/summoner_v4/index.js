const kayn = require('./../setting');

getSummonerInfo = (req, res) => {
  const {server, summonerName} = req.params;
  const urlProfileIcon = 'http://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/';
  kayn.kaynObject.Summoner.by.name(summonerName)
    .region(kayn.regions[server])
    .then(summonerInfo => {

      kayn.kaynObject.League.Entries.by.summonerID(summonerInfo.id) 
        .region(kayn.regions[server])
        .then(league => {
            console.log(league)
            console.log('success fetched summoner: '+summonerInfo.name)
            return res.json({
              league,
              summonerName: summonerInfo.name,
              summonerLevel: summonerInfo.summonerLevel, 
              ImgURL: urlProfileIcon+summonerInfo.profileIconId+'.png',
              });
          
      })
      .catch(err => console.log(err))
      
    })
    .catch(err => console.log(err))
}

module.exports = {
  getSummonerInfo,
}
