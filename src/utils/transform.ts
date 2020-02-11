import { getTeamName } from 'constants/teamNames';

const fs = require('fs');
const content = fs.readFileSync('players.json');
const jsonContents = JSON.parse(content);
const output: { [key: string]: { [key: string]: string } } = {};

(() => {
  for (const key in jsonContents) {
    if (jsonContents[key].position === 'DEF') {
      output[key] = {
        name: getTeamName(jsonContents[key].team),
        position: 'D/ST',
        team: jsonContents[key].team,
      };
    } else {
      output[key] = {
        name: jsonContents[key].full_name,
        position: jsonContents[key].position ? jsonContents[key].position : 'None',
        team: jsonContents[key].team ? jsonContents[key].team : 'F/A',
      };
    }
    console.log(output[key].name);
  }
  fs.writeFileSync('./data.json', JSON.stringify(output), 'utf-8');
})();
