import mongoose from "mongoose";

const PinSchema = new mongoose.Schema({
    imageUrl : {type : String, required : true},
    thumbnailUrl : String,
    uploadedBy : {type : mongoose.Schema.ObjectId, ref : "User"},
    title : String,
    description : String,
    aiTags : [String],
    userTags : [String],
    dominantColors : [String],
    nsfwScore: Number,
    status : {type : String, enum : ["pending", "ready", "failed"], default : "pending"}
}, {timestamps : true})


const Pin = mongoose.model("Pin", PinSchema);

export default Pin;