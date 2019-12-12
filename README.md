# GraphQL/Express/Mysql

### Installation

Install the dependencies.

```sh
$ npm install
```
Rename config/config.sample.json to config/config.json and update database configurations.
### Database Migration
Run following commands to create database structure & seed fake data
```sh
npm run dbsync
npm run seedall
```
### Start Project
```sh
npm start
```
go to http://localhost:4000/graphql to open PlayGround.
