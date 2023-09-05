const express = require('express');
const path = require('path');
const port = 7000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');


const app = express();



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded());

app.use(express.static('assests'));

// middleware 1
// app.use(function(req,res,next){
//     req.myName = "anuj";
//     // console.log(myName);
//     console.log('middleware 1 called');
//     next();
// });

// // middleware 2
// app.use(function(req,res,next){
//     console.log("my Name from ml1:",req.myName );
//     // console.log("middleware 2 is called");
//     next();
// });
var contatcList =[  
    {
        name:'Anuj',
        PhoneNo:'52856039'
    },
    {
        name:'Spider',
        PhoneNo:'123456'
    },
    {
        name:'Tom',
        PhoneNo:'753577'
    }
]

app.get('/', function(req,res){

    Contact.find({},).catch((err) => console.log("Error in fetching contacts from db"))
    .then(contact =>{
        return res.render('home' ,{
            title:'contacts',
            contact_list :contact
        });
    });
 
});

app.get('/practice', function(req,res) {
    return res.render('practice',{
        title:'playGround'
    });
});

app.post('/create-contact', function(req, 
res){


    Contact.create({
        name: req.body.name,
        PhoneNo: req.body.PhoneNo
    },).then(newContact =>{
        console.log('*******',newContact);
        return res.redirect('back');
    })
  
    .catch((err) => console.log("error in creating a contact"));


    // function(err,newContact){
    //     if(err){console.log('error in creating a contact:');
    //     return;}

    //     console.log("********", newContact);
    //     return res.redirect('back');

    // });

});

app.get('/delete-contact/',(req,res)=>{
    // add PhoneNo or name before delete-contact
    // deleting contact by using params
    // console.log(req.params);
    // let phone = req.params.PhoneNo;

    // by query 
    // console.log(req.query);
    // let phone = req.query.PhoneNo;

    // by id
    // get the id from the qurey in the url

    let id = req.query.id;


    // find the contact in the database using id and delete

    Contact.findByIdAndDelete(id,{
    }).catch((err) => {
        console.log("error in deleting contact")
    })
    return res.redirect('back');
 
 


    // let contactIndex = contatcList.findIndex(contact => contact.PhoneNo == phone);
    // if(contactIndex != -1){
    //     contatcList.splice(contactIndex,1);
    // }
    // return res.redirect('back');

});


app.listen(port,function(err){
    if(err){console.log('Error!',err);}

    console.log('Yep! Server is running  on port:' ,port);
});

