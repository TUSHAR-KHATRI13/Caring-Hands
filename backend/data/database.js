import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017", {
      dbName: "caringHands",
    })
    .then(() => {
      console.log("Database connected");
    })
    .catch((e) => {
      console.log(e);
    });
};

export default connectDB;
