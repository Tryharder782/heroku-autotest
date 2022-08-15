import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AboutUs from "./pages/AboutUs";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Contacts from "./pages/Contacts";
import Profile from "./pages/Profile";
import QuestionsPage from "./pages/QuestionsPage";
import TestResults from "./pages/TestResultsPage";
import TestsPage from "./pages/TestsPage";
import StartTestPage from "./pages/StartTestPage";
import MainTest from "./pages/MainTest";
import FailedTest from "./pages/FailedTest";
import MainTestResult from "./pages/MainTestResult";


const App = () => {
  return (
    <BrowserRouter className="App">
        <NavBar />
      <Routes>
        <Route path='*' element={<TestsPage />} />
        <Route path="/tests" element={<TestsPage />}/>
        <Route path="/tests:tId/questions:qId" element={<QuestionsPage/>}/>
        <Route path="/results" element={<TestResults />}/>
        <Route path="/login" element={<Auth />}/>
        <Route path="/registration" element={<Auth />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/admin" element={<Admin />}/>
        <Route path="/aboutUs" element={<AboutUs />}/>
        <Route path="/contacts" element={<Contacts />}/>
        <Route path="/startTestPage" element={<StartTestPage />}/>
        <Route path="/mainTest" element={<MainTest />}/>
        <Route path="/mainTestResult" element={<MainTestResult />}/>
        <Route path="/mainTestFailed" element={<FailedTest />}/>
      </Routes>
    </BrowserRouter>  
  );
}

export default App;
