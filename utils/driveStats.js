const rp = require('request-promise');
const cheerio = require('cheerio');

const table1 = {
  1: 'nypd',
  2: 'nppd',
  3: 'ndsr',
  4: 'oypd',
  5: 'oppd',
  6: 'odsr',
  7: 'dypd',
  8: 'dppd',
  9: 'ddsr'
}

const table2 = {
  1: 'ntopd',
  2: 'nlospd',
  3: 'ntoppd',
  4: 'otoppd',
  5: 'olospd',
  6: 'otoppd',
  7: 'dtopd',
  8: 'dlospd',
  9: 'dtoppd'
}

const options = {
  uri: `https://www.footballoutsiders.com/stats/drivestats`,
  transform: function (body) {
    return cheerio.load(body);
  }
}

rp(options)
  .then(($) => {
    let output = {};
    let currentTeam, currentStat;
    $('tbody tr td').each(function (id) {
      if (id > 9 && id < 340 && (id < 170 || id > 179)) {
        if (id % 10 === 0) {
          currentTeam = $(this).text();
          output[currentTeam] = {};
        } else {
          currentStat = $(this).text().split(' ');
          output[currentTeam][table1[id % 10]] = Number(currentStat[0]);
          output[currentTeam][table1[id % 10] + 'Rank'] = cleanRank(currentStat[1])
        }
      } else if ((id > 349 && id < 510 ) || id > 519) {
        if (id % 10 === 0) {
          currentTeam = $(this).text();
        } else if (id % 10 % 3 === 0) {
          currentStat = $(this).text().split(' ');
          output[currentTeam][table2[id % 10]] = currentStat[0];
          output[currentTeam][table2[id % 10] + 'Rank'] = cleanRank(currentStat[1])
        } else {
          currentStat = $(this).text().split(' ');
          output[currentTeam][table2[id % 10]] = Number(currentStat[0]);
          output[currentTeam][table2[id % 10] + 'Rank'] = cleanRank(currentStat[1])
        }
      }
    })
    return output;
  })
  .then((output) => {
    console.log(output);
  })
  .catch((err) => {
    console.log(err);
  })

function cleanRank(string) {
  string = string.trim()
  return Number(string.slice(1, string.length - 1));
}