# Aircall [![Netlify Status](https://api.netlify.com/api/v1/badges/01bf1838-b94e-468f-b331-e5ccb5e60096/deploy-status)](https://app.netlify.com/sites/vasilis-aircall/deploys) [![Known Vulnerabilities](https://snyk.io/test/github/basilisSam/aircall/badge.svg)](https://snyk.io/test/github/basilisSam/aircall) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/fa90ffd43ad240d2bd823156d4b9ddc3)](https://www.codacy.com/gh/basilisSam/aircall/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=basilisSam/aircall&amp;utm_campaign=Badge_Grade)

This is a project done for Aircall interview. Please find the instructions [here](https://github.com/basilisSam/aircall/wiki/Project-Instructions)

## Teck Stack

The project is build with [React](https://reactjs.org/). It uses [jest](https://jestjs.io/) and [testing-library](https://testing-library.com/) for testing. It also uses [Tractor](https://tractor.aircall.io/) for styling.

For continuous integration and continuous deployment it uses [Netlify CI/CD](https://www.netlify.com/). The project has been deployed here: https://vasilis-aircall.netlify.app/

### Run it locally

1. Clone the project on your local machine. <br/>
   `$ git clone https://github.com/basilisSam/aircall.git`

2. Navigate to the project folder and install the dependencies with the following command. <br/>
   `$ npm install`

3. Run the application locally (the application can be accessed from [localhost:3000](http://localhost:3000/)) <br/>
   `$ npm run start`

### Available scripts

#### Run app locally

You can run the application locally by using `npm run start`.

#### Test

You can run the tests of the application with `npm run test`

#### Build

You can build the application in production mode with `npm run build`

> **Note:** You can use `yarn` instead of `npm`

### Extra features implemented
- [X] Login validation - when fields are empty
- [X] Logout fuctionality
- [X] Add toast when archiving call to give feedback to the user
- [X] Add a spinner when fetching data to give a better user experience


