const kayn = require('./../setting');

getSummonerInfo = (req, res) => {
  const {server, summonerName} = req.params;
  const urlProfileIcon = 'http://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/';
  kayn.kaynObject.Summoner.by.name(summonerName).region(kayn.regions[server])
    .then(summonerInfo => {
      console.log('success fetched summoner: '+summonerInfo.name)
      return res.json({summonerInfo, ImgURL: urlProfileIcon+summonerInfo.profileIconId+'.png'});
    })
    .catch(err => {
      let errorMessage = JSON.parse(err.error.error).status.message
      console.log(errorMessage)
    })
}


module.exports = {
  getSummonerInfo
}
