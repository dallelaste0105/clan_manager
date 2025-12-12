import { Routes, Route, Navigate } from 'react-router-dom'; 
import LoginScreen from './screens/loginScreen';
import SignupScreen from './screens/signupScreen';
import World from './screens/world';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="*" element={<Navigate to="/" replace />} />

      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignupScreen />} />

      <Route 
        path="/canvas" 
        element={
          <World 
            seed1={493084537453945345} 
            seed2={532452345234767876} 
            seed3={634563876835347368} 
            seed4={234523080987098707} 
          />
        } 
      />
      
    </Routes>
  );
}
