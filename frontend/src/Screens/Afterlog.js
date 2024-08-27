import React, { useEffect, useState } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.css";
import Nurses from "./Nurses";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Afterlog(props) {
  const [NURSES, setNurses] = useState([]);

  useEffect(() => {
    async function fetchNurses() {
      try {
        const response = await axios.get("/backend/api/v1/nurse/all");
        const { nurses } = response.data;
        setNurses(nurses);
      } catch (error) {
        console.error("Error fetching nurses:", error);
      }
    }

    fetchNurses();
  }, [NURSES]);

  return (
    <div className="after">
      <form className="search-form" action="/search" method="GET">
        <input
          className="search-input"
          type="text"
          name="q"
          placeholder="🔍search as per your experience "
        />
        <Link to="/nursesign">
          <button type="button" className="button-color">
            Become a nurse
          </button>
        </Link>
      </form>
      <div>
        {NURSES.map((nurse) => (
          <Nurses
            key={nurse._id}
            firstName={nurse.firstName}
            secondName={nurse.secondName}
            Universityofpassing={nurse.unversity}
            yearsofexperience={nurse.experience}
            price={nurse.price}
            nurseId={nurse._id}
          />
        ))}
      </div>
    </div>
  );
}
