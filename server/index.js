const express = require("express");
const app = express();
let puerto = process.env.PORT || 3001

const bcrypt = require("bcrypt");
const mongodb = require("mongodb");
let MongoClient = mongodb.MongoClient;

require("dotenv").config()
let db;

const passport =require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const cors = require("cors")
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", //dirección de la app de React a la que nos conectamos
    credentials: true,
  })
);

/* function makeId(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  } // usarla mas adelante pero todavia no es necesario hacerlo tan estricto
  return result;
} */

app.use(
  session({
    secret: "patata", //secreto de la sesion (se puede hacer dinámico),
    resave: false, //Evita el reseteo de la sesión con cada llamada
    saveUninitialized: false, //Evita crear sesiones vacías
    store: MongoStore.create({
      //Nos guarda las sesiones en la colección "sesiones" en la base de datos "prueba"
      mongoUrl: process.env.MONGO_URL,
      dbName: "prueba",                 //quitar la url de aqui cuando ya hayamos arreglado todo
      collectionName: "sesiones",
      ttl: 1000 * 60 * 60 * 24,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(cookieParser("patata"));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  //Middleware para publicar en consola la sesión y el usuario. Activar en desarrollo.
  console.log(req.session ? req.session : "No hay sesión");
  console.log(req.user ? req.user : "No hay usuario");
  next();
});

MongoClient.connect(process.env.MONGO_URL, {useUnifiedTopology: true}, 
function(err, client){
  err
  ? console.log("🔴 MongoDB no conectado")
  : (db =client.db("usuarios")), console.log("🟢 MongoDB conectado")
})


//-------------------------- AUTORIZACIÓN --------------------------------------//

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      console.log(email, password)
      db.collection("users").findOne({ email: email }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false);
        }
        return done(null, user)
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  db.collection("users").findOne({ email: user.email }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, null);
    }
    return done(null, user); //console.log(user)
  });
});


//--------------------------- LOGIN -----------------------------------------//

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/api",
    failureRedirect: "/api/fail",
  }),
  function(req,res){
    console.log(req.body)
  }
);

app.all("/api", function(req,res){
  console.log(req.body)
  // Utilizar .all como verbo => Las redirecciones desde un cliente Rest las ejecuta en POST, desde navegador en GET
    res.send({logged: true, mensaje:"Login correcto",user: req.user, img_url: req.body.img_url, err: false})
  
});

app.all ("/api/fail", function(req,res){
  res.send({logged: false, mensaje: "Usuario o contraseña incorrectos", err: true});
})

//app
//  .route("/api")
//  .get(res.send({ logged: true, mensaje: "Login correcto" }))
//  .post(res.send({ logged: true, mensaje: "Login correcto" }))

//---------------------------LOGOUT-------------------------------------------//

app.post("/logout", function(req,res){
  req.logOut()
  res.send({logout: true, mensaje: "Logout correcto"})
})

//--------------------------- RUTAS ------------------------------------------//

app.post("/signup", function (req, res) {
  console.log("llego hasta aqui")
  console.log(req.body.email)
  console.log(req.body.password)
  db.collection("users")
    .find({ email: req.body.email })
    .toArray(function (err, user) {
      if (user.length === 0) {
        if(req.body.password.length <= 8){
          if (err !== null) {
            console.log(err);
            res.send({ mensaje: "Ha habido un error: " + err });
          } else {
            res.send({ mensaje: "La contraseña debe tener al menos 8 caracteres", err: true });
          }
        }else{
          db.collection("users").insertOne(
            {
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password, 10),
              /* img_url: req.body.img_url */
            },
            function (err) {
              if (err !== null) {
                console.log(err);
                res.send({ mensaje: "Ha habido un error: " + err });
              } else {
                res.send({ mensaje: "Registrado correctamente", register:true });
              }
            }
          );
        }
      } else {
        res.send({ mensaje: "Usuario ya registrado", err:true});
      }
    });
});

app.all("/perfil", function (req, res) {
  req.isAuthenticated() //esta es solo para enviar información sensible como puede ser el pago de un producto en la tienda
    ? res.send({
        logged: true,
        mensaje: "Todo correcto: información sensible",
        user: req.user, 
      })
    : res.send({ logged: false, mensaje: "Necesitas logearte. Denegado" });
});

app.listen(puerto, function(err){
  err
  ? console.log("🔴 Servidor fallido")
  : console.log("🟢 Servidor a la escucha en el puerto:" + puerto)
})