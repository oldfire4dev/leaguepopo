//import React from 'react';
const kayn = require('./../setting');

const url = 'https://br1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=';


getChampionFreeWeek = (req, res) => {

      kayn.kaynObject.Champion.Rotation.list()
      .region(kayn.regions.BRAZIL)
      .then(Champion => {
          let ids = Champion.freeChampionIds;
          return res.send({ ids })
      }) .catch (err => {
            console.log(err)
      })

}

listChampions =  (req, res) => {
      kayn.kaynObject.DDragon.Champion.list()
      .region(kayn.regions.BRAZIL)
      .then(Champion => {
        let data = Champion.data;
        return res.send({ id: data })
        }) .catch (err => {
              console.log(err)
        })

}

module.exports = {
  getChampionFreeWeek,
  listChampions
}
