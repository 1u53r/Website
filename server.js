const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(express.json());


// connecting the database
mongoose.connect('mongodb://127.0.0.1:27017/',{
    useNewUrlParser : true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("mongo is connected!!");
})

const schema = mongoose.Schema;

const dataschema = new schema({
    email:String,
    feedback:String,
});

const subscriptionSchema = new mongoose.Schema({
    email: { 
        type: String,
        unique: true // Ensure email is unique
    }
});

const data = mongoose.model('data',dataschema);
const Subscription = mongoose.model('Subscription', subscriptionSchema);

app.use(express.urlencoded());

// Serve static files (your HTML, CSS, JS files)
app.use(express.static('public'));

app.post('/submit', (req, res) => {
    const { email, feedback } = req.body;
    const newdata = new data({
        email,
        feedback,
    });
    newdata.save();
    // Process the data (e.g., save to a file or database)
    if (email && feedback) {
        // Respond with a success message
        res.status(200).json({ message: 'Data received successfully!' });
    } else {
        // Respond with an error message
        res.status(400).json({ message: 'Failed to receive data.' });
    }
    console.log(`Received feedback from ${email}: ${feedback}`);
});

app.post('/newsletter', async (req, res) => {
    const { newsEmail } = req.body;

    try {
        // Check if the email already exists
        const existingSubscription = await Subscription.findOne({ email: newsEmail });
        
        if (existingSubscription) {
            // Email already registered, respond with an error message
            return res.status(400).json({ message: 'Email is already registered.' });
        }

        // Create a new subscription
        const subs_email = new Subscription({ email: newsEmail });
        await subs_email.save();

        // Respond with a success message
        res.status(200).json({ message: 'Data received successfully!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An unexpected error occurred. Please try again!' });
    }

    console.log(`Received a subscription for newsletter from ${newsEmail}`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
