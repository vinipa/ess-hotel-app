import { IconUserCircle, IconClose } from "../../assets/icons";
import { useSession } from "../../providers/SessionContext";
import "./index.css";

interface SideBarProps {
  closeSideBar: () => void;
}

export default function SideBar({ closeSideBar }: SideBarProps) {
  const { session, setSession } = useSession();

  const sessionLogout = () => {
    setSession({
      token: "",
      userName: "",
      ADM: false,
    });
    window.localStorage.removeItem("sessionData");

    closeSideBar();
  };

  const closeSideBarAnimation = () => {
    //@ts-ignore
    document.querySelector(".sideBar").style.animation = "closeSideBar 0.5s";
    setTimeout(closeSideBar, 450);
  };

  const setHouter = (value: string) => {
    if (window) {
      window.location.href = value;
    }
  };

  return (
    <div className="sideBar">
      <button className="iconClose" onClick={closeSideBarAnimation}>
        {IconClose}
      </button>
      <span className="iconUserCircle">{IconUserCircle}</span>
      {session.ADM ? (
        <>
          <button className="sideBar_Option_Button">Gerenciar reservas</button>
          <button
            onClick={() => setHouter("/user-data")}
            className="sideBar_Option_Button"
          >
            Informações pessoais
          </button>
          <button
            onClick={() => setHouter("/register-adm")}
            className="sideBar_Option_Button"
          >
            Cadastrar novo usuario administrativo
          </button>
        </>
      ) : (
        <>
          <button className="sideBar_Option_Button">Gerenciar reservas</button>
          <button
            onClick={() => setHouter("/my-reservations")}
            className="sideBar_Option_Button"
          >
            Minhas reservas
          </button>
          <button
            onClick={() => setHouter("/favorites")}
            className="sideBar_Option_Button"
          >
            Favoritos
          </button>
          <button
            onClick={() => setHouter("/reservation-history")}
            className="sideBar_Option_Button"
          >
            Historico de reservas
          </button>
          <button
            onClick={() => setHouter("/user-data")}
            className="sideBar_Option_Button"
          >
            Informações pessoais
          </button>
          <button className="sideBar_Option_Button">Fale conosco</button>
        </>
      )}
      <button className="sideBar_Logout_Button" onClick={() => sessionLogout()}>
        Logout
      </button>
    </div>
  );
}
