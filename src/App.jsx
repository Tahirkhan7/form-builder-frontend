import { ModalProvider } from "../modal/ModalContext";
import CreateForm from "../pages/create-form/CreateForm";
import Dashboard from "../pages/dashboard/Dashboard";
import Homepage from "../pages/homepage/Homepage";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Response from "../pages/response/Response";
import SaveResponse from "../pages/save-response/SaveResponse";
import Settings from "../pages/setting/Settings";
import "./index.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
    <ModalProvider>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/responses/:formId?" element={<Response />} />
        <Route path="/create-form/:folderId?" element={<CreateForm />} />
        <Route path="/form/:formId?" element={<SaveResponse />} />
      </Routes>
      </ModalProvider>
    </>
  );
}

export default App;
