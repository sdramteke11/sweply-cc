import express from 'express'
// import connectDB  from './config/db.js'
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js'
import productRoutes from './routes/product.js'
import cors from 'cors';

dotenv.config();
const app = express(); 
app.use(cors());

// connectDB()
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/products',productRoutes);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
