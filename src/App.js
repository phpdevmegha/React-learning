import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './App.css';
import './index.css';

import { AuthProvider } from './context/AuthContext';
import { AllRoutes } from './routes/AllRoute';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Header />
          <AllRoutes/>
          {/* <Footer /> */}
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;

