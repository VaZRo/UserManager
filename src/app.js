const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

const app = express() 
const PORT = 3000
// Your connect string to mongo db
const db = '';

const User = require('./models/user');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../dist/views'));
app.use(express.static(path.join(__dirname, '../dist/public')));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/', async(req, res) => {
    const users = await User.find();
    res.render('index', { users });
})

app.get('/new', (req, res) => {
    res.render('new');
})

app.post('/new', upload.single('avatar'), async (req, res) => {
    const { name, phone, username, email } = req.body;
    const avatarData = req.file.buffer;

    const newUser = new User({
        name,
        phone,
        username,
        email,
        avatar: avatarData
    });

    await newUser.save();
    res.redirect('/');
})

app.get('/edit/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.render('edit', { user });
})

app.post('/edit/:id', upload.single('avatar'), async (req, res) => {
    const { name, phone, username, email } = req.body;
    const avatarData = req.file.buffer;
    
    const updatedData = {
        name,
        phone,
        username,
        email,
    };

    if(avatarData){
        updatedData.avatar = avatarData;
    }

    await User.findByIdAndUpdate(req.params.id, updatedData);
    res.redirect('/');
})

app.post('/delete/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/');
})

app.post('/search', async(req, res) => {
    const searchData = req.body.searchData;
    const user = await User.findOne({name: searchData});
    res.render('index', { users: user ? [user] : [] });
})

mongoose.connect(db).then(() => {
    console.log('connected to DB');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.log(err);
})


// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// })
