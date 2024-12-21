import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import Snowflakes from './components/Snowflakes.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
 
    <Router>
        <Snowflakes />
        <App />
    </Router>
    
  
)
