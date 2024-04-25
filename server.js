const express = require('express');
const fs = require('fs');
const User = require('./server2');
const app = express();

// app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

//middleware

const isAuthenticated = (req, res, next) => {
    // Check if user is logged in
    if (req.session && req.session.user) {
        // User is logged in, proceed to the next middleware
        next();
    } else {
        // User is not logged in, redirect to login page
        res.redirect('/login');
    }
};

app.get('/',(req,res)=>{
    const data = app.use(express.static(__dirname));
    res.send("UnAuthorized");
})



app.get('/login', (req, res) => {
    const data = fs.readFileSync('login.html', 'utf-8');
    res.send(data);
});

app.get('/signup', (req, res) => {
    const data = fs.readFileSync('signup.html', 'utf-8');
    res.send(data);
});


//signup
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    // Check if any of the fields are empty
    if (!name || !email || !password) {
        return res.status(400).send("Please fill all the required fields");
    }

    try {
        const user = await User.find({ name: name});
        if (user.length !== 0) {
            return res.status(400).send("User already exists");
        } else {
            const newUser = new User({
                name: name,
                email: email,
                password: password
            });
            await newUser.save();
            // Send index.html as response upon successful signup
            const indexData = fs.readFileSync('index.html', 'utf-8');
            return res.send(indexData);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
});

app.get('/',(req,res)=>{
    res.send("Unauthorized");
})

//login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ name: username, password: password });
        if (user) {
            // Render index.html upon successful login
            const indexData = fs.readFileSync('index.html', 'utf-8');
            return res.send(indexData);
        } else {
            // Incorrect username or password
            return res.status(400).send("Incorrect Username or Password");
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }

    
});

//authenication
app.get('/', isAuthenticated, (req, res) => {
    // Render index.html if the user is authenticated
    const indexData = fs.readFileSync('index.html', 'utf-8');
    res.send(indexData); 
});


app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
