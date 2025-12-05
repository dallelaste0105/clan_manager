import { Routes, Route, Navigate } from 'react-router-dom'; 
import LoginScreen from './screens/loginScreen';
import SignupScreen from './screens/signupScreen';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="*" element={<Navigate to="/" replace />} />

      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignupScreen />} />
      
    </Routes>
  )
}
