import Booking from "../models/booking.js";

export const bookingAppointment = async (req, res, next) => {
    const { patient_name, patient_age, patient_mobile_no, patient_gender, charges, duration, Date, } = req.body;
    const userId = req.user._id;
    const nurseId = req.params.nurseId;
    const booking = await Booking.create({
        patient_name,
        patient_age,
        patient_mobile_no,
        patient_gender,
        charges,
        duration,
        Date,
        userId,
        nurseId,
    });
    
    res.status(201).json({
        success: true,
        booking,
        message: "Booking Done Successfully",
    })
}
