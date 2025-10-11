import mongoose from 'mongoose';
import { mongoUri } from '../utils/variables';


mongoose.connect(mongoUri as string).then(() => console.log("DB is connected"))
.catch((err) => console.log('>>>>>>>>DB connection failed ', err))