# release-deploy-calendar
A visual calendar that shows the important release and deploy moments along with it's version for specific sprints

[![GitHub license](https://img.shields.io/github/license/Jooones/release-deploy-calendar.svg)](https://github.com/Jooones/release-deploy-calendar/blob/master/LICENSE)

# setup and build
## prerequisites
- install java
- install node
- install docker

## build and run the app
Use this when:
- you want to run the app for the first time
- you want to run the app with changed code

`./gradlew buildAndRunDocker`

## run the app
`./gradlew runDocker`

## stop the app
`./gradlew removeDocker`

## Quick UI development
To be able to quickly test changes to the UI code without the bother of restarting the whole thing:
- open a terminal and navigate to `front-end/`
- execute `npm run start`
- navigate to http://localhost:4200/

**Note:** the frontend build uses test data from the following file: `front-end/src/assets/example-calendars/example.json` 

# Heroku
## Actual app
https://release-deploy-calendar.herokuapp.com/

## Deploying a new version of the app
- Execute
    - `./gradlew buildAndRunDocker`
    - `cd build/docker/`
    - `heroku login`
    - `heroku container:login`
    - `heroku container:push web -a release-deploy-calendar`
    - `heroku container:release web -a release-deploy-calendar`

## Other commands  
- `heroku logs --tail -a release-deploy-calendar`  
- `heroku apps`  

## "Your app has potential but the final result sucks balls"
Feel free to fork, update and sell for a high price.  
We don't mind!  
