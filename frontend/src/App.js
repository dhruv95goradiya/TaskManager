import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Import your Home component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Use Route component to render Home */}
        {/* Other Route components */}
      </Routes>
    </Router>
  );
}

export default App;
