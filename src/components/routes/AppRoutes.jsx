import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
/* import { useContext } from "react"; */
import Home from "../container/Home";
import Archived from "../container/Archived";


const AppRoutes = () => {
   /*  const { user } = useContext(AuthContext); */
    return (
    <Router>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/archived" element={<Archived/>} />
        </Routes>
    </Router>
    )
}

export default AppRoutes