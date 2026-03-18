import AppRouter from './Routes/AppRouter';
import Navbars from "./Usercomponents/Navbar/Navbar";
import Footer from "./Usercomponents/Footer/Footer"

function App() {
  return (
    <>
    <Navbars />
      <AppRouter />  {/* Navbars should be inside this router */}
    <Footer />
    </>
  );
}

export default App;

