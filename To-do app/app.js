const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose')
const date = require(__dirname+'/date.js');
const _ = require('lodash')

const app = express();
app.set('view engine', 'ejs' );
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/todolistDB',  { useNewUrlParser: true,  useUnifiedTopology: true })

const itemsSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model('Item', itemsSchema);

const item1 = new Item({
    name: 'Kafka on the shore'
});
const item2 = new Item({
    name: 'Alchemist'
});
const item3 = new Item({
    name: 'Few things left unsaid'
});

const defaultItems = [item1, item2, item3];

const listSchema = new mongoose.Schema({
    name: String,
    items: [itemsSchema]
});

const List = mongoose.model('List', listSchema);   

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/', function(req, res){
    
    let today = date.getDate();

    if (today === 6 || today === 0){
        var day = today.toLocaleDateString('en-US', option);
    }else{
        var day = today.toLocaleDateString('en-US', option);
    }

    Item.find({}, function(err, founditems){
        if (founditems.length ===0){
            Item.insertMany(defaultItems, function(err, itms){
                if (err){
                    console.log(err)
                } else {
                    console.log('instantiated with '+ itms.length +' default values')
                }
            });
                res.redirect('/')
        } else{
            res.render('list', {listTitle: 'Today', AddItem:founditems});
        }
    });
 
});

app.get('/:customList', function(req, res){
    const customListName = _.capitalize(req.params.customList);

    List.findOne({name: customListName}, function(err, foundList){
        if (!err){
            if (!foundList){
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
            
                list.save();

                res.redirect('/'+ customListName);
                            }
                        
            else{
                res.render('list', {listTitle:foundList.name, AddItem:foundList.items})
            }
        }
    });


});




app.post('/delete', function(req, res){
    // model.findOneAndDelete() should be able to delete on _id

    const listName = req.body.listName;

    if (listName==='Today'){
        Item.deleteOne({_id:req.body.checkbox}, function(err){
            if (err){
                console.log(err)
            } else {
                console.log("successfully deleted entry from db")
            }
        });
        res.redirect('/')
    }
    
    else{
        List.findOneAndUpdate({name:listName}, {$pull: {items:{_id:req.body.checkbox}}}, function(err, founList){
            if(!err){
                res.redirect('/'+listName)
            }
        });
    }
});

app.post('/', function(req, res){
    const itemName = req.body.newItem;
    const listName = req.body.list;

        const itemX = new Item({
        name:itemName
    });

    if (listName === 'Today'){
        itemX.save();
        res.redirect('/');
    }
    else{
        List.findOne({name:listName}, function(err, foundList){
        
            foundList.items.push(itemX);
            foundList.save();
            res.redirect('/'+ listName)
        });
    }
   // if (req.body.list === "Work"){
    //     workItems.push(item);
    //     res.redirect('/work')
    // } else{
    //     items.push(item);
    //     res.redirect('/')
    // }
    
});

// app.get('/work', function(req, res){
//     console.log(req.params.work)
// })


app.listen(3000, function(req, res){
    console.log('server running on port 3000');
})
