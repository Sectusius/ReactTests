import dotenv from 'dotenv';
dotenv.config();
import mongoose, {ConnectOptions} from 'mongoose';

const mongoURI = process.env.MONGO_URI;

const connectToDatabase = async () => {
    console.log(mongoURI)
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions);
        console.log('Connected to database');
    }
    catch (error) {
        console.log(error);
    }
}

export default connectToDatabase;
