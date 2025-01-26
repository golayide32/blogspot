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
app.listen(port,() => {
    console.log(`server is running on port ${port}`);
})