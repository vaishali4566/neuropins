import mongoose from "mongoose";

export const connectDB = async ()=>{
    if(mongoose.connection.readyState>=1) {
        console.log("✔ Already connected");
        return;
    };

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ MongoDB Connected Successfully!");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
    }
};



// | readyState | Meaning                                      |
// | ---------- | -------------------------------------------- |
// | **0**      | Disconnected (connection closed)             |
// | **1**      | Connected (DB se connection active hai)      |
// | **2**      | Connecting (connection ban rahi hai)         |
// | **3**      | Disconnecting (connection close ho raha hai) |


// Signup

// → password hash karo → database me save.

// Login

// → password compare → JWT token banao → cookie me daal do.

// Protected route access

// → cookie se JWT read → verify → user data return.
