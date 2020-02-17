import { getTeamName } from '../constants/teamNames';
import axios, { AxiosResponse } from 'axios';

const fs = require('fs');
const output: { [key: string]: { [key: string]: string } } = {};

(() => {
  axios
    .get('https://api.sleeper.app/v1/players/nfl')
    .then((response: AxiosResponse<SleeperPlayer[]>) => {
      for (const key in response.data) {
        const playerObject = response.data[key];
        if (playerObject.position === 'DEF') {
          output[key] = {
            name: getTeamName(playerObject.team),
            position: 'D/ST',
            team: playerObject.team,
          };
        } else {
          output[key] = {
            name: playerObject.full_name,
            position: playerObject.position ? playerObject.position : 'None',
            team: playerObject.team ? playerObject.team : 'F/A',
          };
        }
        console.log(output[key].name);
      }
      fs.writeFileSync('src/constants/players.json', JSON.stringify(output), 'utf-8');
    })
    .catch(err => {
      throw err;
    });
})();

type SleeperPlayer = {
  position: string;
  team: string;
  full_name: string;
};
