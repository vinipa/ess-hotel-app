import { useState } from "react";
import "./index.css";
import { IconUserCircle } from "../../assets/icons";
import SideBar from "../SideBar";
import { useSession } from "../../providers/SessionContext";

const pages = ["Home", "Cadastro", "Login"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

interface AppBarProps {
  showLoginRegisterModal: (e: boolean) => void;
}

function ResponsiveAppBar({ showLoginRegisterModal }: AppBarProps) {
  const [showSideBar, setShowSideBar] = useState(false);

  const { session, setSession } = useSession();

  const isLogged = () => {
    return session.token ? true : false;
  };

  return (
    <div className="AppBar">
      <div className="header">
        <button
          onClick={() => {
            if (window) {
              console.log("/");
              window.location.href = "/";
            }
          }}
          className="tittle"
        >
          CIN VAGO
        </button>
        {showSideBar ? (
          <SideBar closeSideBar={() => setShowSideBar(false)} />
        ) : (
          <div className="options">
            {isLogged() ? (
              <>
                <button
                  onClick={() => setShowSideBar(true)}
                  className="AppBar_User_Button"
                >
                  <p>{session.userName}</p>
                  {IconUserCircle}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => showLoginRegisterModal(true)}
                  className="AppBar_Cadastro_Button"
                >
                  Cadastro
                </button>
                <button
                  onClick={() => showLoginRegisterModal(false)}
                  className="AppBar_Login_Button"
                >
                  Login
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default ResponsiveAppBar;
