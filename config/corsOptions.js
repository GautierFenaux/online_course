const allowedOrigins = [
    'https://www.google.com', 
    'http://localhost:3000',
    'http://localhost:5500',
    'http://127.0.0.1:8000',
    'http://localhost:3743',
    ];
        
    const corsOptions = {
        origin: (origin, callback) => {
            if(allowedOrigins.indexOf(origin) !== -1 || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        optionsSuccessStatus: 200
    }
    
    module.exports = corsOptions ;