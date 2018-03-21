// //passport.js
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

// const models = require('../index.js').models;

// passport.use(new LocalStrategy({
//         usernameField: 'email',
//         passwordField: 'password'
//     },
//     function (email, password, cb) {
//       console.log('hererereere!!!', email, password )
//         //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
//         return models.Teacher.findOne({email, password})
//            .then(user => {

//               // console.log('user', user)
//               user = user.dataValues;

//                if (!user) {
//                    return cb(null, false, {message: 'Incorrect email or password.'});
//                }
//                return cb(null, user, {message: 'Logged In Successfully'});
//           })
//           .catch(err => cb(err));
//     }
// ));

// const passportJWT = require("passport-jwt");
// const JWTStrategy   = passportJWT.Strategy;
// const ExtractJWT = passportJWT.ExtractJwt;

// passport.use(new JWTStrategy({
//         jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//         secretOrKey   : 'foo'
//     },
//     function (jwtPayload, cb) {

//         console.log('passport being triggered, jwtPayload:', jwtPayload)
//         //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
//         models.Teacher.findOneById(jwtPayload.id)
//             .then(user => {
//                 return cb(null, user);
//             })
//             .catch(err => {
//               console.log('here error', err)
//                 return cb(err);
//             });
//     }
// ));



