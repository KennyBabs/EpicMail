[![Build Status](https://travis-ci.org/KennyBabs/EpicMail.svg?branch=develop)](https://travis-ci.org/KennyBabs/EpicMail)
[![Coverage Status](https://coveralls.io/repos/github/KennyBabs/EpicMail/badge.svg?branch=develop)](https://coveralls.io/github/KennyBabs/EpicMail?branch=develop)
# EpicMail
A web app that helps people exchange messages/information over the internet.

## GETTING STARTED 

### Clone The Project

```
$ git clone https://github.com/kennyBabs/EpicMail-server.git
```
#### Install Required Dependencies

```
$ npm install
```

## Functionalities 
* A user should be able to create a message
* A user should be able to retract specific message
* A user should be able to retract all message
* A user should be able to retract all drafts message
* A user should be able to delete all sent message
* A user should be able to signup
* A user should be able to login

## API ENDPOINT ROUTES

| METHOD   | ROUTE                | DESCRIPTION                |
|----------|----------------------|----------------------------|
|  GET     | api/v1/messages      | Retrieve Received Emails   |
|  GET     | api/v1/messages/<message_id>      | Retrieve A Specific Email  |
|  DELETE  | api/v1/messages/<message_id>      | Delete A Specific Email    |
|  GET     | api/v1/messages/sent | Retrieve Sent Emails       |
|  GET     | api/v1/messages/draft | Retrieve Draft Emails       |
|  POST    | api/v1/auth/signup   | User Registration          |
|  POST    | api/v1/auth/login    | User Login                 |
|  POST    | api/v1/messages      | Send Email                 |

## Acknowledgements
* Orji Ikechukwu
* Adnan Rahic
* Ayobami Adelakun
* W3schools
* Stackoverflow

## Language stack
* HTML
* CSS
* Javascript

## GitHub Pages Link:
https://kennybabs.github.io/EpicMail/UI/index.html

## Heroku Link:
https://epicmail01.herokuapp.com/
