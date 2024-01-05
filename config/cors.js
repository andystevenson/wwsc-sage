const whitelist = [
  'https://www.yoursite.com',
  'http://127.0.0.1:8123',
  'http://localhost:8123',
]

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200,
}

export default corsOptions
