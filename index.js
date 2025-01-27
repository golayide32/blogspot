import express from "express"
import bodyParser from "body-parser"
import fs from "fs";

const app = express();
const port = 3000;
//link the static files
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


//route the home page
app.get("/",(req,res) => {

    res.render("index.ejs",{data:req.body});
})
app.post("/submit",(req,res) => {
    //we are saving the text to file
    fs.writeFile("blog.txt",req.body["blog-post"],"utf8",(err) => {
        if(err) throw err;
        console.log(req.body["blog-post"]);
    });
    res.render("index.ejs",{data:req.body})
})
app.get("/view_post",(req,res) => {
    let post = "";
    fs.readFile("blog.txt","utf-8",(err,data) => {
        if(err) throw err;

        post = data;

        console.log(post);
    })
    res.render("blogpost.ejs",{data:post});
})
app.listen(port,() => {

    console.log(`server is running on port ${port}`);
})