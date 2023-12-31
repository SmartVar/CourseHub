import app from "./app.js"; //Always use extension while importing file in nodejs
import { connectDB } from "./config/database.js";
import cloudinary from "cloudinary";
import RazorPay from "razorpay";
import nodeCron from "node-cron";
import { Stats } from "./modals/Stats.js";

connectDB();

//This will connect the user to the cloudinary for uploading of media based file.
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

//This will provide instance of subscription at RazorPay
export const instance = new RazorPay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

nodeCron.schedule('0 0 0 5 * *', async () => { //This will run every 5th of month using nodeCron scheduler.
  try {
    await Stats.create({});
  } catch (error) {
    console.log(error);
  }
});

//To check nodeCron operation in the development mode using below query
// const temp = async() => {
//   await Stats.create({});
// };
// temp();

app.listen(process.env.PORT, () => {
    console.log(`Server is working on port: ${process.env.PORT}`); //PORT will be received from Config.env file
  }); // Initialising a Server