import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import PrimeNumbers from "./sections/prime-numbers/PrimeNumbers";
import ScienceMillionairesIntro from "./sections/science-millionaires/ScienceMillionairesIntro";
import ScienceMillionaires from "./sections/science-millionaires/ScienceMillionaires";
import FascinatingSpace from "./sections/fascinating-space/FascinatingSpace";

const App = () => {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" exact element={<Homepage />} />

                <Route path="/prime-numbers" element={<PrimeNumbers />} />

                <Route
                    path="/science-millionaires-intro"
                    element={<ScienceMillionairesIntro />}
                />

                <Route
                    path="/science-millionaires"
                    element={<ScienceMillionaires />}
                />

                <Route
                    path="/fascinating-space"
                    element={<FascinatingSpace />}
                />
            </Routes>
        </Router>
    );
};

export default App;
