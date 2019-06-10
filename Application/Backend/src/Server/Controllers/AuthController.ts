import { AuthStorage } from "../Storage/AuthStorage";
import express, { Express, Request } from "express";
import passport from "passport";
import Strategy from "passport-local";
import path from "path";
import session from "express-session";

const LocalStrategy = Strategy.Strategy;

interface UserSession {
    email: string;
}

export class AuthController {
    private storage: AuthStorage;
    private passport: passport.Authenticator;

    public constructor(storage: AuthStorage) {
        this.storage = storage;
        this.passport = passport;
    }

    public async setupMiddleware(expressApplication: Express): Promise<void> {
        this.setUpPassportMiddleWares();
        const pat = __dirname.split("Backend")[0];
        expressApplication.use(express.static(path.join(pat, "Frontend/distr")));
        expressApplication.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
        expressApplication.use(this.passport.initialize());
        expressApplication.use(this.passport.session());

        this.setExpressRouting(expressApplication);
    };

    private async findUserByNameAndCheck(email: string, password: string, done: (err: any, user?: any, info?: any) => void): Promise<void> {
        try {
            const user = await this.storage.searchConsumer(email);
            console.log(user)
            if (user) {
                if (user.password === password) {
                    return done(null, { email })
                }
            }
            return done(null, false);
        } catch (e) {
            return done(e);
        }
    }

    private async registerUserAndLogin(req: Request, email: string, password: string, done: (err: any, user?: any, info?: any) => void): Promise<void> {
        try {
            const user = await this.storage.searchConsumer(email);

            if (user) {
                return done(null, false);
            }
            let newUser = { name: req.body.name, email: email, password: password, privilege: false };

            try {
                await this.storage.registerUser(newUser);
                return done(null, { email });

            } catch (er) {
                return done(er)
            }

        } catch (e) {
            return done(e)
        }
    }

    private setUpPassportMiddleWares(): void {

        this.passport.use("login", new LocalStrategy({
            usernameField: "email",
            passwordField: "password",
        }, async (email, password, done): Promise<void> => await this.findUserByNameAndCheck(email, password, done)));

        this.passport.use("register", new LocalStrategy({
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        }, async (req, email, password, done): Promise<void> => await this.registerUserAndLogin(req, email, password, done)));


        this.passport.serializeUser((user: UserSession, done): void => {
            done(null, user.email);
        });

        this.passport.deserializeUser((email, done): void => {
            done(null, email);
        });
    }


    private setExpressRouting(expressApplication: Express): void {
        expressApplication.post("/api/login", this.passport.authenticate('login', {
            successRedirect: '/',
            failureRedirect: '/login'
        }))

        expressApplication.post("/api/register", this.passport.authenticate('register', {
            successRedirect: '/',
            failureRedirect: '/register'
        }))

        expressApplication.get("/login", (req, res) => {
            console.log(req.session, "onLogin")
            res.json("ONLOGIN!")
        })

        expressApplication.get("/register", (req, res) => {
            console.log(req.session, "onLogin")
            res.json("ONREGISTER!!")
        })

        expressApplication.get('/logout', function (req, res) {
            req.logout();
            res.redirect('/');
        });

        expressApplication.get('*', (request, response): void => {
            const pat = __dirname.split("Backend")[0];
            response.sendFile(path.join(pat, "Frontend/distr/index.html"));
        });
    }
}
