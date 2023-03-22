/**
 *      MongoDB Connection
 *
 *  */
import mongoose, { Connection } from 'mongoose'
const BBDD_URL = process.env.BBDD_URL

declare global {
    var mongoose : any
}



if (!BBDD_URL) {
    throw new Error(
        'Please define the MONGODB_URL environment variable inside .env.local'
    )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose 

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
            serverSelectionTimeoutMS:30000, 
            //   bufferMaxEntries: 0,
            //   useFindAndModify: false,
            //   useCreateIndex: true,
        }

        cached.promise = mongoose.connect(BBDD_URL!, opts).then((mongoose: any) => {
            console.log('MongoDB Connected')
            return mongoose

        })
    }
    cached.conn = await cached.promise
    return cached.conn
}

export default dbConnect