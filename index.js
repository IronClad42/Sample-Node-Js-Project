var express = require("express");
var bodyparser = require("body-parser");
var mysql = require("mysql");
var util = require("util");
const e = require("express");
var app = express();

app.use(bodyparser.urlencoded({ extended: true }));

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "demon"
});

var exe = util.promisify(conn.query).bind(conn);

app.get("/", function (req, res) {
    res.render("home.ejs");
});

app.post("/sumitForm", async function (req, res) {

    var b = req.body;

    var sql = `insert into users(name , phone , email)values
                                (? , ? , ?)`;

    var data = await exe(sql, [b.name, b.phone, b.email]);

    res.redirect("/list");
});

app.get("/list", async function (req, res) {

    var data = await exe(`select * from users`);

    res.render("list.ejs", { "info": data });
});

app.get("/edit/:edit", async function (req, res) {

    var edit = req.params.edit;

    var data = await exe(`select * from users where users_id = ?`, [edit]);

    // if (data.length == 0) {
    //     res.send("Data Is Not Found");
    // }
    // else {
    //     res.render("edit.ejs", { "info": data[0] });
    // }
     res.render("edit.ejs", { "info": data[0] });
});

app.post("/editForm/:editForm", async function (req, res) {

    var b = req.body;

    var editForm = req.params.editForm;

    var sql = `update users set
                name = ?,
                phone = ?,
                email = ?
               where users_id = ?`;

    var data = await exe(sql, [b.name, b.phone, b.email, editForm]);

    res.redirect("/list");
});

app.get("/delete/:delete",async function(req,res){

    var data = await exe(`delete from users where users_id = ?`,[req.params.delete]);

    res.redirect("/list");
});

app.listen(1000);

// krishna@123 => IAM cha password aahe ha