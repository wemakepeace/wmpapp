# Project Title

Portal that connects teacher peer to peer, and facilitates a letter exchange program between school classes

## Getting Started

To get a copy of the project up and running, clone the repo.
See deployment for notes on how to deploy the project on a live system.

### Prerequisites

This project requires that you have
```
Node
Nodemon
Psql
```

### Installing

To install the project on your local machine

```
npm install

psql CREATE DATABASE wmp;

npm run start:dev

```

To see the data in the database

```
psql
\c wmp
select * from [tablename];
```


## Deployment

Add additional notes about how to deploy this on a live system

## Built With
* [Express](https://expressjs.com/) - The web framework used
* [JavaScript](https://www.javascript.com/) - Programming language
* [React](https://reactjs.org/docs) - JavaScript Library used
* [Redux](https://redux.js.org/) - State container management
* [PostgreSQL](https://www.postgresql.org/docs/) - Relational database
* [Sequelize](http://docs.sequelizejs.com/) - Object relational mapping system
* [Semantic UI](https://react.semantic-ui.com/introduction/) - Frontend development framework
* [Sass](https://sass-lang.com/documentation/file.SASS_REFERENCE.html) - CSS extension language
* [Sass](https://webpack.js.org/) - Module bundler



## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/kjalnes/wmpapp/tags).

## Authors

* **Kris Alnes** - *Initial work* - [kjalnes](https://github.com/kjalnes)

See also the list of [contributors](https://github.com/kjalnes/wmpapp/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


