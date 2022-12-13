import { Link, NavLink } from "react-router-dom";

import "./Header.css";
import LOGO from "../../assets/logo.png";

const LINKS = [
  {
    name: "Arrays",
    link: "/array",
  },
];

const Header = () => {
  return (
    <div className="between header-wrappers">
      <div>
        <Link className="header-link logo" to="/">
          <img src={LOGO} alt="brand logo" />
          comprehendDSA
        </Link>
      </div>
      <div>
        {LINKS.map((item) => (
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "blue" : "",
              fontSize: isActive ? "25px" : "",
            })}
            className="header-link"
            key={item.name}
            to={item.link}
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Header;
