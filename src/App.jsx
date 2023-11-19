import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./app/home";
import { Toaster } from "react-hot-toast";
import GalleryPage from "./app/gallery";
import Vendors from "./app/vendors";
import Tickets from "./app/tickets";
import SuccessPage, { TicketSuccess } from "./app/success";

const App = () => {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/gallery" element={<GalleryPage />} />
        <Route exact path="/vendors" element={<Vendors />} />
        <Route exact path="/tickets" element={<Tickets />} />
        <Route exact path="/success" element={<SuccessPage />} />
        <Route exact path="/ticket-success" element={<TicketSuccess />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
