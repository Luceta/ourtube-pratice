import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/wetube", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB  can not connect", error);

db.once("open", handleOpen);
db.on("error", handleError);