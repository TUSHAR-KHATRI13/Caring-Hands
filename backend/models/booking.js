import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    patient_name: {
        type: String,
        required: true,
    },
    patient_age: {

        type: Number,
        required: true,
    },
    patient_gender: {
        type: String,
        required: true,
        enum:["Male","Female","Others"]
    },
    patient_mobile_no: {
        type: Number,
        required: true,
    },
    charges: {
        type: Number,
    },
    duration: {
        type: Number,
        required: true,
    },
    Date: {
        type: Date,
        required: true,
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    nurseId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Booking", bookingSchema)
