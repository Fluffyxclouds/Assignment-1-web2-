const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/ass1.html');
});

app.post('/bmi', (req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height) / 100; 

    if (weight <= 0 || height <= 0 || isNaN(weight) || isNaN(height)) {
        return res.send('<p>Please enter valid positive numbers!</p>');
    }

    const bmi = weight / (height * height);
    let category = '';

    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 24.9) category = 'Normal weight';
    else if (bmi < 29.9) category = 'Overweight';
    else category = 'Obese';

    res.send(`<h2>Your BMI is ${bmi.toFixed(2)} (${category})</h2>`);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
