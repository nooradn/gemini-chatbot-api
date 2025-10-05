import cors from 'cors';

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.ALLOWED_ORIGINS?.split(',') 
    : true,
  credentials: true,
  optionsSuccessStatus: 200
};

export default cors(corsOptions);