import { Link } from "react-router-dom";
import "./Dashboard.css";

const CARD_DATA = [
  {
    name: "Arrays",
    operation: ["Searching", "Sorting"],
    link: "/array",
  },
];

const Dashboard = () => {
  return (
    <div>
      <div className="around wrap">
        {CARD_DATA.map((item) => (
          <div key={item.name} className="card-wrapper between col">
            <div className="card-header">
              <h2>Arrays</h2>
            </div>
            <div className="card-body">
              <ul>
                {item.operation.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="card-footer">
              <Link className="link-btn" to={item.link}>
                Play
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
