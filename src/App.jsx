import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/organisms/Navbar";
import Footer from "./components/organisms/Footer";
import Home from "./components/pages/Home";
import NotFound from "./components/organisms/NotFound";
import EventDashboard from "./components/pages/EventDashboard";
import EventDashboardDetails from "./components/pages/EventDashboardDetails";
import OrderList from "./components/pages/OrderList";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import ChooseRole from "./components/pages/ChooseRole";
import EventCreation from "./components/pages/EventCreation";
import EventExplore from "./components/pages/EventExplore";
import EventDetail from "./components/pages/EventDetail";
import Review from "./components/pages/Review";
import EventRegistration from "./components/pages/EventRegistration";
import OrderDetail from "./components/pages/OrderDetail";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<EventDashboard />} />
        <Route path="/dashboard/:eventId" element={<EventDashboardDetails />} />
        <Route path="/order-list" element={<OrderList />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/choose-role" element={<ChooseRole />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route
          path="/events/:id/registration"
          element={<EventRegistration />}
        />
        <Route path="/explore" element={<EventExplore />} />
        <Route path="/create-event" element={<EventCreation />} />
        <Route path="/order-list/:orderId" element={<OrderDetail />} />
        <Route path="/order-list/:orderId/review" element={<Review />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
