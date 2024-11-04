import PropTypes from "prop-types";
import "./Navbar.css";
import obucLogo from "../../assets/obuc-logo.png";
import { GoGear } from "react-icons/go";
import { PiLayout } from "react-icons/pi";
import { GoColumns } from "react-icons/go";
export default function Navbar({ currentTab, setCurrentTab }) {
  const navButtons = [
    { id: 1, label: "Board", icon: <PiLayout />, value: "board" },
    { id: 2, label: "Tags", icon: <GoGear />, value: "tags" },
    { id: 3, label: "Kanban", icon: <GoColumns />, value: "kanban" },
  ];
  return (
    <div className="navbar-wrapper">
      <img className="navbar-logo" src={obucLogo} alt="Obuc logo" />
      <div className="buttons-wrapper">
        {navButtons.map((button) => (
          <button
            key={button.id}
            className={`nav-button ${
              currentTab === button.value ? "active" : ""
            }`}
            onClick={() => {
              //alert(button.value)
              setCurrentTab(button.value);
            }}
          >
            {button.icon}
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
}

Navbar.propTypes = {
  currentTab: PropTypes.string.isRequired,
  setCurrentTab: PropTypes.func.isRequired,
};
