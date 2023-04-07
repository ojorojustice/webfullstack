const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../server/models/users");
const Config = require("./database");

//opts.jwtFromRequest = ExtractJwt.fromAuthHeader();

module.exports = function (passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = "oneWithGodtumoroApp";
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      console.log(jwt_payload);
      User.getUserById(jwt_payload._id, (err, user) => {
        console.log("Error found", err);
        if (err) {
          return done(err, false);
        }

        console.log("User");
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
