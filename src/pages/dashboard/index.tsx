import { Link } from "react-router-dom";

import { Animation, CARD_DATA, Shape } from "../../utils";

import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div>
      <div className="around wrap">
        {CARD_DATA.map((item) => (
          <div
            key={item.name}
            className={`${
              item.operation.length > 0 ? "between" : "center"
            } card-wrapper col ${
              Animation[parseInt(JSON.stringify(Math.random() * 10))]
            } ${Shape[parseInt(JSON.stringify(Math.random() * 10))]}`}
          >
            <div className="card-header">
              <h2>{item.name}</h2>
            </div>
            <div className="card-body">
              {item.operation.length ? (
                <ul>
                  {item.operation.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontSize: "10px" }}>Coming soon...</p>
              )}
            </div>
            {item.operation.length ? (
              <div className="card-footer">
                <Link className="link-btn" to={item.link}>
                  Play
                </Link>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
