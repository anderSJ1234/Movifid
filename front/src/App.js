import "./App.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import AcercaDe from "./AcercaDe";
import { BrowserRouter, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <BrowserRouter>
        <Header />
        <Route exact path="/">
        <Main />
        </Route>
        <Route exact path="/AcercaDe">
        <AcercaDe />
        </Route>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
