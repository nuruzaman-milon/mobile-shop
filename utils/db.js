import mongoose from "mongoose";

let isConnected = false; // track the connection status

export const dbConnect = async () => {
  if (isConnected) {
    console.log("Already connected to the database.");
    return;
  }
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);

    isConnected = connection.connections[0].readyState === 1;
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};

export const dbDisconnect = async () => {
  await mongoose.disconnect();
  isConnected = false;
  console.log("Disconnected from the database");
};

// import mongoose from "mongoose";

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// export const dbConnect = async () => {
//   console.log("connecting db");

//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const options = {
//       bufferCommands: false, // Disable buffering to avoid issues
//     };

//     cached.promise = mongoose
//       .connect(process.env.MONGODB_URL, options)
//       .then((mongoose) => {
//         return mongoose;
//       });
//   }

//   cached.conn = await cached.promise;

//   console.log("connected");
//   return cached.conn;
// };

// // We no longer use dbDisconnect unless necessary, so the pool stays open
// export const dbDisconnect = async () => {
//   if (process.env.NODE_ENV === "production") {
//     await mongoose.disconnect();
//   }
// };
