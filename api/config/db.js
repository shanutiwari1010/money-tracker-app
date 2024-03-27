import { mongoose } from "mongoose";

const connectDB = async () => {
  console.log("Connecting to database");
  try {
    const instance = await mongoose.connect(
      "mongodb+srv://money:GsMsQAMFMaO3jAF6@cluster0.zdk0fed.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log(instance, "Connect Shanu");
    console.log(instance.connection.host, instance.connection.port);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export { connectDB };
