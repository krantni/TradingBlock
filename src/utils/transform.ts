const fs = require('fs');
const content = fs.readFileSync('players.json');
const jsonContents = JSON.parse(content);
const output: { [key: string]: { [key: string]: string } } = {};

export const convertPlayerJson = () => {
  for (const key in jsonContents) {
    output[key] = {
      name: jsonContents[key].full_name,
      position: jsonContents[key].position ? jsonContents[key].position : 'None',
      team: jsonContents[key].team ? jsonContents[key].team : 'F/A',
    };
    console.log(jsonContents[key].full_name);
  }
  fs.writeFileSync('./data.json', JSON.stringify(output), 'utf-8');
};

convertPlayerJson();
