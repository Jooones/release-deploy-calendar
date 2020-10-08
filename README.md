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
- search for `#fml` in the code
- change `useTestData` to `true`
    - the test data can be found here: `front-end/src/assets/example-calendars/example.json` 
- open a terminal and navigate to `front-end/`
- execute `npm run start`
- navigate to http://localhost:4200/

**note:** please don't commit with `useTestData = true` 


# sources
https://speedandfunction.com/running-spring-boot-angular/
