// require the library
const mongoose = require("mongoose");

// connect to the database

mongoose.connect("mongodb://127.0.0.1:27017/contacts_list_db",{
    useNewUrlParser:true,useUnifiedTopology:true
  
},).then(() => console.log('connected successfully to the database'))
.catch((err) =>{console.error(err);
});


 



