const rp = require('request-promise');
const cheerio = require('cheerio');
const { DriveStats } = require('../server/db/models');

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

function cleanRank(string) {
  string = string.trim()
  return Number(string.slice(1, string.length - 1));
}

function scrapeDriveStats() {
  let output = {};
  return rp(options)
  .then(($) => {
    let currentTeam, currentStat;
    $('tbody tr td').each(function (id) {
      if (id > 9 && id < 340 && (id < 170 || id > 179)) {
        if (id % 10 === 0) {
          currentTeam = $(this).text();
          if (currentTeam === 'LACH' || currentTeam === 'SD') {
            currentTeam = 'LAC'
          } else if (currentTeam === 'LARM' || currentTeam === 'STL') {
            currentTeam = 'LAR'
          }
          output[currentTeam] = {name: currentTeam};
        } else {
          currentStat = $(this).text().split(' ');
          output[currentTeam][table1[id % 10]] = Number(currentStat[0]);
          output[currentTeam][table1[id % 10] + 'Rank'] = cleanRank(currentStat[1]);
        }
      } else if ((id > 349 && id < 510 ) || id > 519) {
        if (id % 10 === 0) {
          currentTeam = $(this).text();
          if (currentTeam === 'LACH') {
            currentTeam = 'LAC'
          } else if (currentTeam === 'LARM') {
            currentTeam = 'LAR'
          }
        } else if (id % 10 % 3 === 0) {
          currentStat = $(this).text().split(' ');
          output[currentTeam][table2[id % 10]] = currentStat[0];
          output[currentTeam][table2[id % 10] + 'Rank'] = cleanRank(currentStat[1]);
        } else {
          currentStat = $(this).text().split(' ');
          output[currentTeam][table2[id % 10]] = Number(currentStat[0]);
          output[currentTeam][table2[id % 10] + 'Rank'] = cleanRank(currentStat[1]);
        }
      }
    })
    return output;
  })
  .then((data) => {
    let array = [];
    for (let team in data) {
      array.push(data[team]);
    }
    return Promise.all(array.map((stat) => {
      DriveStats.create(stat)
    }))
  })
  .catch(err => {
    console.log(err);
  })
}

module.exports = scrapeDriveStats;
