import React, { useState, useEffect } from "react";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animation from "../assets/appointment_confirmation.json";
import BookingConfirmed from "./BookingConfirmed";

const BookingForm = () => {
  const [dateValue, onDateChange] = useState(new Date());
  const [timeValue, onTimeChange] = useState("12:00");
  const [patient_name, setPatientName] = useState("");
  const [patient_age, setPatientAge] = useState("");
  const [patient_gender, setPatientGender] = useState("");
  const [patient_mobile_no, setPatientNo] = useState("");
  const [charges, setCharges] = useState(0); // Initialize charges with 0
  const [duration, setDuration] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const { nurseId } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/backend/api/v1/nurse/${nurseId}`);
        const { price } = data;
        let finalCharges = price * duration;
        finalCharges += 0.1 * finalCharges;
        setCharges(finalCharges);
      } catch (error) {
        console.error("Error fetching nurse data:", error);
      }
    };
    fetchData();
  }, [nurseId, duration]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/backend/api/v1/booking/new/${nurseId}`,
        {
          patient_name,
          patient_age,
          patient_gender,
          patient_mobile_no,
          charges,
          duration,
          Date: dateValue,
        }
      );
      if (response.data.success) {
        console.log("Booking successful!");
        setShowConfirmation(true);
      } else {
        console.error("Booking failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Booking Failed:", error);
    }
  };

  return (
    <div className="nsign">
      {showConfirmation ? (
        <BookingConfirmed />
      ) : (
        <div className="form card-bg-color my-5">
          <h3>Fill Required Information</h3>
          <form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="patient_name" className="form-label">
                  Patient Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setPatientName(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="Age" className="form-label">
                  Patient Age
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setPatientAge(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="Patient Mobile No" className="form-label">
                  Patient Mobile No
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setPatientNo(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="Gender" className="form-label">
                  Gender
                </label>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="maleGender"
                    name="gender"
                    value="Male"
                    onChange={(e) => setPatientGender(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="maleGender">
                    Male
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="femaleGender"
                    name="gender"
                    value="Female"
                  />
                  <label className="form-check-label" htmlFor="femaleGender">
                    Female
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="otherGender"
                    name="gender"
                    value="Others"
                  />
                  <label className="form-check-label" htmlFor="otherGender">
                    Others
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="Duration" className="form-label">
                  Duration
                </label>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => setDuration(e.target.value)}
                />
                <input placeholder={charges}></input>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="Date" className="form-label">
                  Date
                </label>
                <DatePicker
                  onChange={onDateChange}
                  value={dateValue}
                  clearIcon={null}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="Time" className="form-label">
                  Time
                </label>
                <TimePicker
                  onChange={onTimeChange}
                  value={timeValue}
                  clearIcon={null}
                />
              </div>
            </div>
            <Link to="/">
              <button
                type="button"
                className="book-appointment-button"
                onClick={handleSubmit}
              >
                Book your appointment
              </button>
            </Link>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
