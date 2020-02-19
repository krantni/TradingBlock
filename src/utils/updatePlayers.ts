import { getTeamName } from '../constants/teamNames';
import axios, { AxiosResponse } from 'axios';
import * as child from 'child_process';
import * as fs from 'fs';

const output: { [key: string]: { [key: string]: string } } = {};

const addToGitAndDeploy = () => {
  // Is this Ugly? Yes
  // Does it work? Yes
  // Will I fix it later? Maybe
  child.exec('git add src/constants/players.json', err => {
    if (err) {
      console.error(err);
      return;
    }
    console.info('players.json: staged');
    child.exec(
      `git commit -m "updating players: ${new Date().getMonth()}/${new Date().getDate()}/${new Date().getFullYear()}"`,
      err => {
        if (err) {
          console.error(err);
          return;
        }
        console.info('players.json: committed');
        child.exec(`git push`, err => {
          if (err) {
            console.error(err);
            return;
          }
          console.info('players.json: pushed');
          child.exec(`npm run deploy`, err => {
            if (err) {
              console.error(err);
              return;
            }
            console.info('trading block: deployed');
          });
        });
      },
    );
  });
};

(() => {
  axios
    .get('https://api.sleeper.app/v1/players/nfl')
    .then((response: AxiosResponse<SleeperPlayer[]>) => {
      console.info(`received ${Object.keys(response.data).length} players`);
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
      }
      console.info(`finished parsing ${Object.keys(output).length} players`);
      fs.writeFile('src/constants/players.json', JSON.stringify(output), () => {
        console.info(`wrote JSON to file`);
        addToGitAndDeploy();
      });
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
