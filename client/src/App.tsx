import { BrowserRouter as Router , Route , Routes } from "react-router-dom";
import Main from "./pages/Main";
import Mainch from "./pages/ch/Main";
import Signup from "./pages/register/Signup";
import Signin from "./pages/register/Signin";

function App() {
  return ( 
    <>
      

    <Router>

      <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/main" element={<Mainch />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
      </Routes>

    </Router>

    </>
   );
}

export default App;