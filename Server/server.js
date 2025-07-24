import express from "express";
import cors from "cors"
import pg from "pg"
import bcrypt from"bcrypt"
import session from "express-session";
import passport from "passport"
import { Strategy } from "passport-local"
const app=express();
const port=5000;
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret:"This is a secreat",
    saveUninitialized:true,
    resave:false,
    cookie:{
        maxAge:1000*60*60
    }
}))


const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "project-1",
  password: "4002",
  port: 5432,
});
db.connect();
app.use(cors({
    origin:'http://localhost:3000',
    credentials: true
}));


app.use(passport.initialize())
app.use(passport.session())


passport.use(new Strategy(async function verify(username,password,done) {
    try{
        let login_cr=await db.query("select username,password from login_cr where username=$1",[username])
        if (login_cr.rows.length>0){
            const isMatch = await bcrypt.compare(password, login_cr.rows[0].password);
            if (isMatch) {
                return done(null,{username:login_cr.rows[0].username})
            } else {
                return done(null,false)
            }
        }
        else{
            return done(null,false)
        }}
    catch(err){
        return done(err)
    }
}))


app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ user: false });
        req.login(user, err => {
            if (err) return next(err);
            res.json({ user: user.username });
        });
    })(req, res, next);
});


app.get("/me", (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ user: req.user.username });
    } else {
        res.status(401).json({ user: false });
    }
});




app.get("/logout", (req, res) => {
    req.logout(() => {
        res.json({ message: "Logged out" });
    });
});

 


app.post("/check",async(req,res)=>{
    try{
    let login_cr=await db.query("select username from login_cr where username=$1",[req.body.username])
    if (login_cr.rows.length>0){
        res.json({user:req.body.username})
    }
    else{
        res.json({user:false})
    }}
    catch(err){
        console.log(`error:${err}`)
        res.status(500).json({errro:"internal error"})
    }
});




app.post("/register",async(req,res)=>{
    let username=String(req.body.username)
    let password=String(req.body.password)
    let hashedPassword=await bcrypt.hash(password,10)
    let login_cr=await db.query("insert into login_cr(username,password) values($1,$2) RETURNING * ; ",[username,hashedPassword])
    res.json({user:username})
})

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port,()=>{
    console.log(`port:${port}`)
})
