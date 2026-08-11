import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import MoodTracker from "./pages/MoodTracker";
import WaterTracker from "./pages/WaterTracker";
import SleepTracker from "./pages/SleepTracker";
import StressMonitor from "./pages/StressMonitor";
import FitnessChallenge from "./pages/FitnessChallenge";
import Appointments from "./pages/Appointments";
import AIChat from "./pages/AIChat";
import Profile from "./pages/Profile";
import WellnessRPG from "./pages/WellnessRPG";
import Meditation from "./pages/Meditation";
import BurnoutSurvey from "./pages/BurnoutSurvey";
import Community from "./pages/Community";
import Reports from "./pages/Reports";
import Reminders from "./pages/Reminders";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route element={<MainLayout />}>
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/mood"
          element={<MoodTracker />}
        />

        <Route
          path="/water"
          element={<WaterTracker />}
        />

        <Route
          path="/sleep"
          element={<SleepTracker />}
        />

        <Route
          path="/stress"
          element={<StressMonitor />}
        />

        <Route
          path="/fitness"
          element={<FitnessChallenge />}
        />
        <Route
          path="/meditation"
          element={<Meditation />}
        />
        <Route
        path="/community"
        element={<Community />}
        />
        <Route
        path="/reports"
        element={<Reports />}
        />
        <Route
        path="/reminders"
        element={<Reminders />}
        />
        <Route
         path="/survey"
         element={<BurnoutSurvey />}
        />

        <Route
          path="/appointments"
          element={<Appointments />}
        />

        <Route
          path="/ai-chat"
          element={<AIChat />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="/rpg"
          element={<WellnessRPG />}
        />
      </Route>

      <Route
        path="*"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />
    </Routes>
  );
}

export default App;