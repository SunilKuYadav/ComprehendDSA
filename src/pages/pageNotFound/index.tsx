import { Link } from "react-router-dom";

import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <div className="page-not-found around col">
      <div>
        <h1>404</h1>
        <h2>Ooops! You weren't supposed to see this</h2>
        <p>The page you're looking for no longer exist.</p>
        <p>
          Return to the <Link to="/">home page</Link> and remember: you haven't
          seen anything.
        </p>
      </div>
      <Link className="link-btn" to="/">
        Back To Dashboard
      </Link>
    </div>
  );
};

export default PageNotFound;
