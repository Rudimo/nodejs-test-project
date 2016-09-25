### Steps for start

1. Install nodejs https://nodejs.org/en/download/
2. Install bower: `npm i bower -g`
3. Install Grunt: `npm i grunt-cli -g`
4. Install TypeScript: `npm i typescript -g`
5. Clone project
6. Install npm dependencies: `npm i`
7. Create `.env` file. Copy `.env-base` to `.env`
8. Start project: `npm start`

```sh
Api  :  http://localhost:8000
Front:  http://localhost:8001
```
### Testing
Start test `npm test`

### Information
Application uses a number of open source projects to work properly:
* Node.JS
* Express
* Angular 2
* Mocha
* Bower
* Grunt
* TwitterBootstrap

### Description of the test task
Test project description:
* Project should consist of 2 parts: back-end (API) and front-end.
* You should use mongodb database (mongoose package or any other)
* Make it possible to perform all user actions via the API, including authentication.
* Code quality is very important and project structure should be well organized.

Required functionality:
* User must be able to create an account and log in
* User can add (and edit and delete) a time record with 3 fields: note about what he has worked on, date, time spent
* User should be able to see how much time he worked each day on "Report" page, this page should have date filter from-to. Example report:

  Date  | Total time | Notes
  ----  | ---------- | -----
  21.07 | 9h         | "Login&registration", "Another note"

How to work on this project:

1. Fork this repository (you will need a github account)
2. Write code. Try to make meaningful commits.
3. When test project is complete push code to github and send us a link to your(forked) repository
