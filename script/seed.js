/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User, Team} = require('../server/db/models')
const scrapeDriveStats = require('../utils/driveStats')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `abbrwait` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)

  const teams = await Promise.all([
    Team.create({abbr: 'ARI', name: 'Arizona Cardinals'}),
    Team.create({abbr: 'ATL', name: 'Atlanta Falcons'}),
    Team.create({abbr: 'BAL', name: 'Baltimore Ravens'}),
    Team.create({abbr: 'BUF', name: 'Buffalo Bills'}),
    Team.create({abbr: 'CAR', name: 'Carolina Panthers'}),
    Team.create({abbr: 'CHI', name: 'Chicago Bears'}),
    Team.create({abbr: 'CIN', name: 'Cincinati Bengals'}),
    Team.create({abbr: 'CLE', name: 'Cleveland Browns'}),
    Team.create({abbr: 'DAL', name: 'Dallas Cowboys'}),
    Team.create({abbr: 'DEN', name: 'Denver Broncos'}),
    Team.create({abbr: 'DET', name: 'Detroit Lions'}),
    Team.create({abbr: 'GB', name: 'Green Bay Packers'}),
    Team.create({abbr: 'HOU', name: 'Houston Texans'}),
    Team.create({abbr: 'IND', name: 'Indianapolis Colts'}),
    Team.create({abbr: 'JAC', name: 'Jacksonville Jaguars'}),
    Team.create({abbr: 'KC', name: 'Kansas City Chiefs'}),
    Team.create({abbr: 'LAC', name: 'Los Angeles Chargers'}),
    Team.create({abbr: 'LAR', name: 'Los Angeles Rams'}),
    Team.create({abbr: 'MIA', name: 'Miami Dolphins'}),
    Team.create({abbr: 'MIN', name: 'Minnesota Vikings'}),
    Team.create({abbr: 'NE', name: 'New England Patriots'}),
    Team.create({abbr: 'NO', name: 'New Orleans Saints'}),
    Team.create({abbr: 'NYG', name: 'New York Giants'}),
    Team.create({abbr: 'NYJ', name: 'New York Jets'}),
    Team.create({abbr: 'OAK', name: 'Oakland Raiders'}),
    Team.create({abbr: 'PHI', name: 'Philadelphia Eagles'}),
    Team.create({abbr: 'PIT', name: 'Pittsburg Steelers'}),
    Team.create({abbr: 'SF', name: 'San Francisco 49ers'}),
    Team.create({abbr: 'SEA', name: 'Seatle Seahwaks'}),
    Team.create({abbr: 'TB', name: 'Tampa Bay Buccaneers'}),
    Team.create({abbr: 'TEN', name: 'Tennessee Titans'}),
    Team.create({abbr: 'WAS', name: 'Washington Redskins'}),
  ])
  console.log(`seeded ${teams.length} teams`)

  await scrapeDriveStats()
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
