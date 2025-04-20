import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://devPingu-app:9Q5eic3h0ilg2fOe@devpingu-app.8cyy3tw.mongodb.net/devPingu"
  );
};

