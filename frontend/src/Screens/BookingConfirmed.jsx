import Lottie from "lottie-react";
import animation from "../assets/appointment_confirmation.json";
import done from "../assets/Done1.json";
import React, { useEffect, useState } from "react";
import "../App.css";
import { useParams } from "react-router";
import axios from "axios";

const BookingConfirmed = () => {
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { nurseId } = params;
        const { data } = await axios.get(`/backend/api/v1/nurse/${nurseId}`);
        console.log(data);
        const { firstName, secondName, mobileNo, price } = data;
        const timeout = setTimeout(() => {
          setShowBookingDetails(true);
        }, 3000);
        return () => {
          clearTimeout(timeout);
        };
      } catch (error) {
        console.error("Error fetching nurse data:", error);
      }
    };
    fetchData();
  }, [params]);

  return (
    <div>
      {showBookingDetails ? (
        <div className="BookingDetails">
          <Lottie animationData={done} loop={false} />
          <p>Your Appointment has been scheduled</p>
          <p>
            Thank You for giving us an opportunity to make this world healthier
          </p>
        </div>
      ) : (
        <div className="BookingAnimation">
          <div className="animation">
            <Lottie
              animationData={animation}
              style={{ height: "30vh", margin: "auto" }}
            />
          </div>
          <h2 style={{ color: "#1c4532", marginTop: "1vh" }}>
            Booking your Appointment...
          </h2>
        </div>
      )}
    </div>
  );
};

export default BookingConfirmed;
