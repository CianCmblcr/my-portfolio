import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const NotFound = ({ title = "Page not found" }) => (
  <>
    <Nav />
    <main className="wrap notfound">
      <h1 className="h2">{title}</h1>
      <Link to="/#work" className="btn btn--dark">Back to work</Link>
    </main>
    <Footer />
  </>
);

export default NotFound;
