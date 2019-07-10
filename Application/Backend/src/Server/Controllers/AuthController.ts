import { AuthStorage } from "../Storage/AuthStorage";
import express, { Express, Request } from "express";
import passport from "passport";
import Strategy from "passport-local";
import path from "path";
import session from "express-session";
import bcrypt from "bcrypt-nodejs"
import { Strategy as JWTStrategy, ExtractJwt as ExtactJWT } from "passport-jwt";
import { jwtConfig } from "./Utils/jwtconfig";
import jwt from "jsonwebtoken";

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
        expressApplication.use(this.passport.initialize());

        this.setExpressRouting(expressApplication);
    };

    private async findUserByNameAndCheck(email: string, password: string, done: (err: any, user?: any, info?: any) => void): Promise<void> {
        try {
            const user = await this.storage.searchConsumer(email);

            if (user) {
                const compareResult = bcrypt.compareSync(password, user.password);

                if (compareResult === true) {
                    console.log("Пользователь авторизован");
                    return done(null, { email });
                } else {
                    console.log("Пароли не сопадают!");
                    return done(null, false, { message: "Пароли не совпадают" });
                }
            }
            console.log("Пользователь с таким email не зарегистрирован!");
            return done(null, false, { message: "Пользователь с таким email не зарегистрирован!" });
        } catch (e) {
            done(e);
        }
    }

    private async registerUser(req: Request, email: string, password: string, done: (err: any, user?: any, info?: any) => void): Promise<void> {
        try {
            const user = await this.storage.searchConsumer(email);

            if (user) {
                console.log("Этот email уже использовался при регистрации!");
                return done(null, false, { message: "Этот email уже использовался при регистрации!" });
            }

            const passwordHashed = bcrypt.hashSync(password);

            let newUser = { name: req.body.name, email: email, password: passwordHashed, privilege: false };

            try {
                await this.storage.registerUser(newUser);
                console.log("Пользователь создан!");

                return done(null, { email });

            } catch (er) {
                return done(er)
            }

        } catch (e) {
            done(e)
        }
    }

    private async authByToken(jwtPayload: { id: string }, done: (err: any, user?: any, info?: any) => void): Promise<void> {
        console.log(jwtPayload)
        try {
            const user = await this.storage.searchConsumer(jwtPayload.id);

            if (user) {
                console.log("Пользователь найден по токену в базе данных и он авторизован значит быть должен!");
                done(null, { email: user.email });
            } else {
                console.log("Пользователь не найден в базе данных");
                done(null, false);
            }
        } catch (e) {
            done(e);
        }
    }

    private setUpPassportMiddleWares(): void {
        const opts = {
            jwtFromRequest: ExtactJWT.fromAuthHeaderWithScheme("JWT"),
            secretOrKey: jwtConfig.secret
        }

        this.passport.use("login", new LocalStrategy({
            usernameField: "email",
            passwordField: "password",
            session: false,
        }, async (email, password, done): Promise<void> => await this.findUserByNameAndCheck(email, password, done)));

        this.passport.use("register", new LocalStrategy({
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        }, async (req, email, password, done): Promise<void> => await this.registerUser(req, email, password, done)));

        this.passport.use("jwt", new JWTStrategy(opts, async (jwtPayload, done): Promise<void> => {
            console.log("Gsf")
            return await this.authByToken(jwtPayload, done)
        }));

        this.passport.serializeUser((user: UserSession, done): void => {
            done(null, user.email);
        });

        this.passport.deserializeUser((email, done): void => {
            done(null, email);
        });
    }


    private setExpressRouting(expressApplication: Express): void {
        expressApplication.post("/api/login", (req, res, next): void => {
            this.passport.authenticate('login', (err: Error, user: { email: string }, info?: { message: string }): void => {
                if (err) {
                    console.log(err);
                }
                if (info !== undefined) {
                    console.log(info.message);
                    res.send(info.message);
                } else {
                    req.logIn(user, async (err): Promise<void> => {
                        const token = jwt.sign({ id: user.email }, jwtConfig.secret);
                        console.log(token)
                        const userFromDB = await this.storage.searchConsumer(user.email);

                        console.log(userFromDB);
                        res.status(200).send({
                            auth: true,
                            token: token,
                            privilege: userFromDB.privilege,
                            name: userFromDB.name,
                            message: "Пользователь найден и авторизован",
                        })
                    })
                }
            })(req, res, next);
        });

        expressApplication.post("/api/register", (req, res, next): void => {
            this.passport.authenticate('register', (err: Error, user: { email: string }, info?: { message: string }): void => {
                if (err) {
                    console.log(err);
                }
                if (info !== undefined) {
                    console.log(info.message);
                    res.send(info.message);
                } else {
                    req.logIn(user, (err): void => {
                        res.status(200).send({ message: "Пользователь создан!" })
                    })
                }
            })(req, res, next);
        });

        expressApplication.get("/api/check", (req, res, next): void => {
            this.passport.authenticate("jwt", async (err: Error, user: { email: string }, info?: { message: string }): Promise<void> => {
                if (err) {
                    console.log(err);
                }
                if (info !== undefined) {
                    console.log(info.message);
                    res.send(info.message);
                } else {
                    const userFromDB = await this.storage.searchConsumer(user.email);
                    res.status(200).send({ privilege: userFromDB.privilege, name: userFromDB.name, email: userFromDB.email })
                }
            })(req, res, next);
        })

        expressApplication.get('*', (request, response): void => {
            const pat = __dirname.split("Backend")[0];
            response.sendFile(path.join(pat, "Frontend/distr/index.html"));
        });
    }
}
