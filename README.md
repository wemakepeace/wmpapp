# WMP application

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

psql
psql CREATE DATABASE wmp;

npm run start:dev

```

To see the data in the database

```
psql
\c wmp
select * from [tablename];
```
## About the app

### Features

#### Login
Token based login. Email is username and password needed.

#### Forgot password
Link with token gets sent to email (if email exist in database), and user can reset password by clicking link as long as token remains valid. Sends email notification if password is changed for security measure.

#### Signup
Only emails that have not been registered before.
Validates passwords (Minimum 8 characters).

#### Create teacher profile
Teacher details: First name, last name, email, phone number
Change password: Requires current password, and sends email notification if password is changed for security measure.

Delete account: GDPR compliant. User can delete all information. Deleting teacher profile will also delete all classes registered by teacher, and set the status of any current exchanges (that are not completed)  to ‘cancelled’, and notify the teachers of the exchanging classes via email.

#### Register class
Teacher can register as many classes as they wish, and teacher can manage their enrolled classes in the same teacher profile.
Class details: Class name, size, age group (8-9 or 10-11), term
School details: School name, address, zip, city, country

#### Initiate Exchange
The teacher can initiate an exchange for a registered class. This is done on the Overview page.
The app will look for a matching class based on the age group and the term. A class will not be matched with a class from the same country. If there are more than one matching class, the app will find the class furthest that has been matched.

When a class is initiates an exchange, there are two possible scenarios:
1. Match is made:
If there is a class match, the exchange status will be set to ‘PENDING’, and the two teachers of the exchanging classes will be emailed and given one week to confirm the participation. This can be done on the Overview page by clicking a button that says ‘Confirm Participation’.
Once both teachers confirm, the exchange status will be set to ‘CONFIRMED’ and the teachers will be granted access to the materials. The materials will then be available under the main menu.
In the case that one of the teachers of a match does not confirm the participation, that class will be removed from that exchange, and the exchange status will be set to ‘INITIATED’ so that the class that did confirm will keep the opportunity to be matched with a different class.

2. A match is not made:
If there is not a matching class registered already, the initiating class will be associated with a new exchange and the status will be set to ‘INITIATED’. This means that if another class signs up that matches the criteria, they will be matched with this class.

#### Materials
If a class is enrolled in a confirmed exchange, the teacher will have access to the materials needed. The instructions for each letter as well as a downloadable template can be found on the Materials page.

#### Help
Basic Q&A.
Has a support messaging feature.

## Deployment
AWS EC2 instance, RDS/PostgreSQL database, S3 data storage

## Built With
* [Express](https://expressjs.com/) - The web framework used
* [JavaScript](https://www.javascript.com/) - Programming language
* [React](https://reactjs.org/docs) - JavaScript Library used
* [Redux](https://redux.js.org/) - State container management
* [PostgreSQL](https://www.postgresql.org/docs/) - Relational database
* [Sequelize](http://docs.sequelizejs.com/) - Object relational mapping system
* [Semantic UI](https://react.semantic-ui.com/introduction/) - Frontend development framework
* [Sass](https://sass-lang.com/documentation/file.SASS_REFERENCE.html) - CSS extension language
* [Webpack](https://webpack.js.org/) - Module bundler


## Authors

* **Kris Alnes** - *Initial work* - [kjalnes](https://github.com/kjalnes)

See also the list of [contributors](https://github.com/kjalnes/wmpapp/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


