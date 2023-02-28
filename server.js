const  express = require('express');
const mongodb = require('mongodb');
const app =express();
let db = null;

app.use(express.static('public'));

const MongoClient = mongodb.MongoClient;
let dbstring = 'mongodb+srv://TODOAPP:firstapp@cluster0.fcpaqte.mongodb.net/TodoApp?retryWrites=true&w=majority'
let dbName = 'TodoApp'
mongodb.connect(dbstring,{useNewUrlParser:true,useUnifiedTopology: true},(err,client)=>{
    if(err){
        throw err;
    }
    db = client.db(dbName);
    app.listen(3000,()=>{
        console.log('server started')
    })
})
app.use(express.json());
app.use(express.urlencoded({extended: false}))

PassProcted = (req,res,next) =>{
    res.set('WWW-Authenticate',   'Basic realm="simple App"')
    if(req.headers.authorization == 'Basic VG9kb0FwcDpXZWJBcHA='){
        next()
    }else{
        res.status(401).send("please provide id and password")
    }

}
app.use(PassProcted)

app.get('/',(req,res)=>{
  db.collection('items').find().toArray((err,items)=>{
    // console.log(items)
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Simple To-Do App</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    </head>
    <body>
      <div class="container">
        <h1 class="display-6 text-center py-1">To do list </h1>
        <div class="jumbotron p-3 shadow-sm">
          <form action = "/create-item" method ="POST">
            <div class="d-flex align-items-center">
              <input name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" required style="flex: 1;">
              <button class="btn btn-primary">Add New Item</button>
            </div>
          </form>
        </div>
        <ul class="list-group pb-5">
       ${items.map((item)=>{
        return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
            <span class="item-text">${item.text}</span>
            <div>
              <button data-id=${item._id} class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
              <button data-id=${item._id} class="delete-me btn btn-danger btn-sm">Delete</button>
            </div>
          </li>`

       }).join('')
         
       }
        </ul>
      </div>
      <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
      <script src="./browser.js"></script>
    </body>
    </html>
    `);
})
})

 app.post('/create-item',(req,res)=>{
    db.collection('items').insertOne({text: req.body.item},()=>{
        res.redirect('/');
    })
    
 })

 app.post('/update-item',(req,res)=>{
    // console.log(req.body.txt);
    db.collection('items').findOneAndUpdate({_id: new mongodb.ObjectId(req.body.id)},{$set:{text:req.body.text}},()=>{
        res.send("updated");
    })
 })

 app.post('/delete-item',(req,res)=>{
    // console.log(req.body.txt);
    db.collection('items').deleteOne({_id: new mongodb.ObjectId(req.body.id)},()=>{
        res.send("data deleted")
    })
 })
