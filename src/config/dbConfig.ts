import mongoose from "mongoose";

mongoose.set("strictQuery", true);

export const dbConnection = async () => {
  const url =
    process.env.NODE_ENV === "test"
      ? process.env.TEST_MONGODB_URI
      : process.env.MONGODB_URL || "mongodb://localhost:27017";
  try {
    await mongoose.connect(url);
    console.log("MONGODB CONNECTED SUCCESSFULLY!....");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
