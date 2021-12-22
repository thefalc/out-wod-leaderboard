# OutWod Leaderboard

I created this in 2018 to help support [OutWod](https://www.outwod.com/), a project to help bring together LGBT+ Crossfit athletes. You can read about the project and how I got involved [here](https://thefalc.com/2018/02/the-outwod-leaderboard-fun-with-nodejs-and-react/).

The goal was to create a leaderboard outside of the main Crossfit Games website that would allow athletes to compete based on the gender they identify as. Additionally, it allowed athletes to compete and raise money for [Out Foundation](http://theoutfoundation.org/) without being part of the official Crossfit Games Open.

![OutWod Leaderboard](./assets/leaderboard-graphic.png)

## Technical details

The codebase uses isomorphic Javascript, Node.js on the backend and React on the front.

The leaderboard needed to automatically import athlete scores from the official Open leaderboard as well as accomodate manually entered scores from athletes not officially competing. To automatically import official date, I wrote an athlete importer that was triggered by a cron job to regularly import and re-rank all athletes. For manual entry, I supported a web form for participants to enter their scores.

Ranking and scoring athletes was tricky as well because different workouts use different scoring system. For example, a workout score could be based on reps, weight, or time. For weight, a bigger number is better but for time, a lower number is better. My ranking algorithm had to take this into account on a workout by workout basis.

### install

* `npm i` - install dependencies

### run in dev

* `npm run build:watch:server` - runs babel to transpile the server from es6 to es5 (watch mode)
* `npm run build:watch:client` - runs webpack to build bundle (watch mode)
* `npm run start:dev` - in parallel shells it calls `build:watch:client` `build:watch:server` and then runs the app in watch mode, using nodemon

### prod

* `npm run build:server` - runs babel to transpile the server from es6 to es5 
* `npm run build:client` - runs webpack to build bundle
* `npm run build:prod` - builds both client and server
* `npm run start` - in parallel shells it calls `build:prod` and then runs the app 
