import "./App.css";
import Afterlog from "./Screens/Afterlog";
import Nsignup from "./Screens/Nsignup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Screens/Home";
import Heading from "./Components/Heading.js";
import Footer from "./Components/Footer.js";
import Account from "./Components/Account";
import Contact from "./Screens/contact.jsx";
import BecameNurse from "./Screens/BecameNurse.jsx";
import BookingForm from "./Screens/bookingForm.jsx";
import BookingConfirmed from "./Screens/BookingConfirmed";
import { ToastContainer } from "react-toastify";
import ChatBot from "./Screens/chatbot.jsx"

function App() {
  return (
    <Router>
      <Heading />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Nurseui" element={<Afterlog />} />
        <Route path="/nursesign" element={<Nsignup />} />
        <Route path="/account" element={<Account />} />
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/BecameNurse" element={<BecameNurse />}></Route>
        <Route path="/Nurseui/:nurseId" element={<BookingForm />}></Route>
        <Route path="/BookingConfirmed" element={<BookingConfirmed />}></Route>
      </Routes>
      <ToastContainer />
      <Footer />
      <ChatBot />
    </Router>
  );
}

export default App;
