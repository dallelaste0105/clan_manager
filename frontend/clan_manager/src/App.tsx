import { Routes, Route, Navigate } from 'react-router-dom'; 
import InsertScreen from '../src/insert';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<InsertScreen />} />

      <Route path="/signup" element={<InsertScreen />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
