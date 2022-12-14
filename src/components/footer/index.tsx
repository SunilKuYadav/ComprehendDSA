import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="icon-wrap center row">
        <a href="https://github.com/SunilKuYadav" target="_blank">
          <div className="center icon" id="icon-5">
            <i className="mdi mdi-github"></i>
          </div>
        </a>
        <a href="https://www.linkedin.com/in/123sunil/" target="_blank">
          <div className="center icon" id="icon-2">
            <i className="mdi mdi-linkedin"></i>
          </div>
        </a>
        <a href="https://twitter.com/123sunilkr" target="_blank">
          <div className="center icon" id="icon-2">
            <i className="mdi mdi-twitter"></i>
          </div>
        </a>
        <a href="https://www.instagram.com/_om_rudra_/" target="_blank">
          <div className="center icon" id="icon-4">
            <i className="mdi mdi-instagram"></i>
          </div>
        </a>
      </div>
      <div className="info-box">
        <div className="footnote">
          SUNIL KUMAR YADAV <span className="highlight">&copy;2022-23</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
