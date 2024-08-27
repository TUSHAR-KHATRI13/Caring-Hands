import app from "./app.js";
import connectDB from "./data/database.js";

connectDB()

app.listen(4000, () => {
  console.log(`Server is running on 4000`);
});
