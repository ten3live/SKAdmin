import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Download from "./pages/Download";
import NDownload from "./pages/nDownload";
import AdminHome from "./pages/AdminHome";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import AdminVerify from "./pages/AdminVerify";
import ViewClient from "./pages/ViewClient";
import UpdateClient from "./pages/UpdateClient";
import ViewUser from "./pages/ViewUser";
import UpdateAdmin from "./pages/UpdateAdmin";
import AllClients from "./pages/AllClients";
import ScrollToTop from "./pages/ScrollToTop";
import { AuthProvider } from "./pages/AuthContext";
// Add the imported icons to the library
library.add(fas);
library.add(fab);

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Download />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/kamil" element={<NDownload />} />
            <Route path="/adminverify" element={<AdminVerify />} />
            <Route path="/allclients" element={<AllClients />} />
            <Route path="/viewclient/:id" element={<ViewClient />} />
            <Route path="/updateclient/:id" element={<UpdateClient />} />
            <Route path="/updateadmin/:id" element={<UpdateAdmin />} />
            <Route path="/profile/:id" element={<ViewUser />} />
          </Routes>
          
        </AuthProvider>
      </BrowserRouter>

    
    </div>
  );
}

export default App;