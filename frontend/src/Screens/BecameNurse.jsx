import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import NurseImage from "../assets/nurse icon.jpg";
import "../App.css"
import { List, ListIcon, ListItem } from "@chakra-ui/react";

const BecameNurse = () => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [licenseNo, setLicenseNo] = useState("");
  const [experience, setExperience] = useState("");
  const [unversity, setUnversity] = useState("");
  const [price, setPrice] = useState("");
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get("/backend/api/v1/nurse/me");

        // Add this line to check the response format
        const { nurse } = response.data;
        console.log(nurse);
        setFirstName(nurse.firstName);
        setSecondName(nurse.secondName);
        setMobileNo(nurse.mobileNo);
        setEmail(nurse.email);
        setLicenseNo(nurse.licenseNo);
        setExperience(nurse.experience);
        setUnversity(nurse.unversity);
        setPrice(nurse.price);
      } catch (error) {
        console.error("Error fetching User:", error);
      }
    }

    fetchUser();
  }, []);
  const navigate = useNavigate();
    return (
      <div className="bg-color">
        <div className="nurse-card card-bg-color Became-nurse-card">
          <div className="nurse-content">
            <div className="nurse-image">
              <img src={NurseImage} alt="Nurse Profile" />
            </div>
            <div className="nurse-details">
              <h5 className="card-title">
                {firstName} {secondName}
              </h5>
              <p className="card-text">{unversity}</p>
              <p className="card-text">{experience} years of experience</p>
              <p className="card-text">₹{price} (per hour)</p>
            </div>
          </div>
        </div>
        <div className="guidelines">
          <List>
            <ListItem>
              <strong>Patient Assessment:</strong> <br />
              Perform a thorough initial assessment.
            </ListItem>
            <ListItem>
              Infection Control: <br />
              Follow strict hygiene and wear PPE.
            </ListItem>
            <ListItem>
              Safety Precautions: <br />
              Be aware of safety hazards at the patient's home.
            </ListItem>
            <ListItem>
              Medication Management: <br />
              Administer medications as prescribed.
              <br />
              Educate patients and families on medication.
            </ListItem>
            <ListItem>
              Wound Care: <br />
              Provide proper wound care. <br />
              Monitor for signs of infection.
            </ListItem>
          </List>
        </div>
      </div>
    );
};

export default BecameNurse;
