import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import User from './modules/user/service';

// this class is responsible for calling the passport middleware and configuring the entire API authentication strategy

class Auth {
  public config () {
    let opts = {
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
    };

    passport.use(new Strategy(opts, (jwtPayload, done) => {
      User.getById(jwtPayload.id)
        .then(user => {
          if (user) {
            return done(null, {
              id: user.id,
              email: user.email
            });
          }
          return done(null, false);
        })
        .catch(error => {
          done(error, null);
        });
    }));

    return {
      initialize: () => passport.initialize(),
      authenticate: () => passport.authenticate('jwt', { session: false })
    };
  }
}

export default new Auth();
