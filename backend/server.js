require('dotenv').config(); // this must come at the top

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const ordersRouter = require('./routes/orders');
console.log('Mongo URI:', process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/orders', ordersRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const path = require('path');

// app.use(express.static(path.join(__dirname, '../frontend/build')));

// app.use('/:path(*)', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
// });



