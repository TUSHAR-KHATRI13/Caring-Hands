import "../App.css";
import "bootstrap/dist/css/bootstrap.css";
// import NurseImage from "./nursepp.png";
import NurseImage from "../assets/nurse icon.jpg";
import { Link } from "react-router-dom";
function Nurses(props) {
  const {
    firstName,
    secondName,
    Universityofpassing,
    yearsofexperience,
    price,
    nurseId,
  } = props;
  return (
    <div className="nurse-card card-bg-color">
      <div className="nurse-content">
        <div className="nurse-image">
          <img src={NurseImage} alt="Nurse Profile" />
        </div>
        <div className="nurse-details">
          <h5 className="card-title">
            {firstName} {secondName}
          </h5>
          <p className="card-text">{Universityofpassing}</p>
          <p className="card-text">{yearsofexperience}</p>
          <p className="card-text">₹{price} (per hour)</p>
          <Link to={ nurseId }>
            <button type="button" className="btn btn-outline-dark btn-card">
              Book your appointment
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Nurses;
