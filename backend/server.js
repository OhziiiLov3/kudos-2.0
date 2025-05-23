
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const boardRoutes  = require('./routes/boardRoutes.js');
const cardRoutes = require('./routes/cardRoutes');



dotenv.config();

const app = express();
const PORT = 3000;





app.use(cors());
app.use(express.json()); 



app.get('/api', (req, res) => {
    res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/cards', cardRoutes);





app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`);
});


