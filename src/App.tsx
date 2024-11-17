import './App.css';
import Chat from '@/components/Chat';
import HealthLife from '@/components/HealthLife';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/healthlife" element={<HealthLife />} />
      </Routes>
    </Router>
  );
}

export default App;
