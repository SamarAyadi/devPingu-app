import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://devPingu-app:RdH0Xlykh5ioqSwm@devpingu-app.8cyy3tw.mongodb.net/devPingu"
  );
};

