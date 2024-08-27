import { useEffect, useState } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function Nsignup() {
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
        const response = await axios.get("/backend/api/v1/users/me");
        console.log(response.data); // Add this line to check the response format
        const { user } = response.data;
        setFirstName(user.firstName);
        setSecondName(user.secondName);
        setMobileNo(user.mobileNo);
        setEmail(user.email);
      } catch (error) {
        console.error("Error fetching User:", error);
      }
    }

    fetchUser();
  }, []);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your server for user login
      const response = await axios.post("/backend/api/v1/nurse/signUp", {
        licenseNo,
        experience,
        unversity,
        price,
      });
      if (response.data.success) {
        console.log("Nurse Authentication successful!");
        navigate("/BecameNurse");
      } else {
        console.error("Nurse Authentication failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Nurse Authentication Failed:", error);
    }
  };

  return (
    <div className="nsign">
      <div className="form">
        <h3>Fill Required information</h3>
        <form>
          <div class="mb-3">
            <label for="Firstname" class="form-label">
              First Name
            </label>
            <input
              type="name"
              class="form-control"
              placeholder={firstName}
              readOnly
            />
          </div>
          <div class="mb-3">
            <label for="Lastname" class="form-label">
              Last Name
            </label>
            <input
              type="name"
              class="form-control"
              placeholder={secondName}
              readOnly
            />
          </div>
          <div class="mb-3">
            <label for="MobileNumber" class="form-label">
              Mobile Number
            </label>
            <input
              type="email"
              class="form-control"
              placeholder={mobileNo}
              readOnly
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder={email}
              readOnly
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-3">
            <label for="Licenseno" class="form-label">
              License Number
            </label>
            <input
              type="text"
              class="form-control"
              onChange={(e) => setLicenseNo(e.target.value)}
            />
          </div>
          <div class="mb-3">
            <label for="University" class="form-label">
              University
            </label>
            <input
              type="text"
              class="form-control"
              onChange={(e) => setUnversity(e.target.value)}
            />
          </div>

          <div class="mb-3">
            <label for="University" class="form-label">
              years of experience
            </label>
            <input
              type="text"
              class="form-control"
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>
          <div class="mb-3">
            <label for="University" class="form-label">
              Charges per Hour
            </label>
            <input
              type="text"
              class="form-control"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label class="form-check-label" for="exampleCheck1">
              Check me out
            </label>
          </div>

          <button type="button" class="button-color" onClick={handleSubmit}>
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
