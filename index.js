// const express =require('express');
// const dotenv=require('dotenv');
// dotenv.config()
// const fs=require("fs")

// const app=express();

// const PORT=process.env.PORT;
// if (!fs.existsSync(`${__dirname}/TimeFiles`,err=>{
//     if(err){
//         return err
//     }
// })){
//     fs.mkdir(`${__dirname}/TimeFiles`,err=>{
//         if(err){
//             return err
//         }
//     }); 

// }   

// app.get('/createfile',(req,res)=>{
//     let date = new Date();
//     let filename = `${date.toISOString()}.txt`;
//     console.log(filename);
//     let data="current date and time is "+date.toISOString();
//     console.log(`${__dirname}/TimeFiles/${filename}`);
 
//     fs.writeFile(`${__dirname}/TimeFiles/${filename}`,data,(err)=>{
//     console.log(`${__dirname}`)    ;
//     console.log(err);
//     });
//     res.send("Timefiles are successfully created")
// })
// app.get("/getfile", (req, res) => {
//     let files = fs.readdirSync("./TimeFiles");
//     console.log(files);
//     res.send(files);
//   });
  

// app.listen(PORT,()=>
//     console.log("server is running")
// )



const fs=require('fs');
const cors=require('cors');
const express=require("express");
const app=express();

app.use(cors());

//0. Home Page FILE SYSTEM
app.get("/", (request, response) => {
    response.send("FILE SYSTEM TASK TO CREATE CURRENT TIMESTAMP ");
    response.json({
        message:`/create->To CREATE .txt file`,
        message:`/->To READ .txt file`
        })
  });
    

//1. To Create .txt file
app.get("/create",function (req,res){
    var timestamp=new Date();
    var filename=timestamp.getDate()+"-"+timestamp.getHours()+"-"+timestamp.getMinutes()+"-"+timestamp.getSeconds();    
   console.log(filename);
   fs.writeFile(`${filename}.txt`,`${timestamp}`,()=>{
        console.log("File Created Sucessfully")
    }
    );
    res.json({ message:`${filename}.txt File Created `,
               filename:`${filename}.txt`,
            })
    
})
//2. To READ all txt_files

app.get("/read",function (req,res){
    var txt_files=[];
    fs.readdir(__dirname, function (err, files) {
        //error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        
        files.forEach(function (file) {
            if(file.endsWith(".txt")){
                txt_files.push(file);
            }     
        });
        res.json({
            file_names:txt_files
        })
    });
    
})

app.listen(process.env.PORT||5000,()=>{
    console.log("Server running at port-5000 ");
})
