import { render, fireEvent, screen } from "@testing-library/react";
import SideBar from "../../app/components/SideBar";
import { SessionContext } from "../../app/providers/SessionContext";
jest.mock("../../services/api/client");

describe("SearchBar", () => {
  it("deve renderizar a barra lateral com todas as opções disponiveis para um usuario comum", () => {
    const closeSideBar = jest.fn();
    const setSession = jest.fn();

    const session = {
      token: "string;",
      userName: "string;",
      ADM: false,
    };

    const { getByText } = render(
      <SessionContext.Provider value={{ session, setSession }}>
        <SideBar closeSideBar={closeSideBar} />
      </SessionContext.Provider>
    );

    expect(getByText("Gerenciar Reservas")).toBeInTheDocument();
    expect(getByText("Minhas reservas")).toBeInTheDocument();
    expect(getByText("Favoritos")).toBeInTheDocument();
    expect(getByText("Historico de reservas")).toBeInTheDocument();
    expect(getByText("Informações pessoais")).toBeInTheDocument();
    expect(getByText("Logout")).toBeInTheDocument();
  });
  it("deve renderizar a barra lateral com todas as opções disponiveis para um usuario ADM", () => {
    const closeSideBar = jest.fn();
    const setSession = jest.fn();

    const session = {
      token: "string;",
      userName: "string;",
      ADM: true,
    };

    const { getByText } = render(
      <SessionContext.Provider value={{ session, setSession }}>
        <SideBar closeSideBar={closeSideBar} />
      </SessionContext.Provider>
    );

    expect(getByText("Gerenciar Reservas")).toBeInTheDocument();
    expect(getByText("Informações pessoais")).toBeInTheDocument();
    expect(
      getByText("Cadastrar novo usuario administrativo")
    ).toBeInTheDocument();
  });
  it("Deve fazer os redirecionamentos corretos ao clicar nos botões como usuario ADM", () => {
    const closeSideBar = jest.fn();
    const setSession = jest.fn();

    const session = {
      token: "string;",
      userName: "string;",
      ADM: true,
    };

    render(
      <SessionContext.Provider value={{ session, setSession }}>
        <SideBar closeSideBar={closeSideBar} />
      </SessionContext.Provider>
    );

    const spy = jest.spyOn(console, "log");

    fireEvent.click(screen.getByText("Informações pessoais"));
    expect(spy).toHaveBeenCalledWith("/user-data");
    fireEvent.click(screen.getByText("Cadastrar novo usuario administrativo"));
    expect(spy).toHaveBeenCalledWith("/register-adm");
  });
  it("Deve fazer os redirecionamentos corretos ao clicar nos botões como usuario comum", () => {
    const closeSideBar = jest.fn();
    const setSession = jest.fn();

    const session = {
      token: "string;",
      userName: "string;",
      ADM: false,
    };

    render(
      <SessionContext.Provider value={{ session, setSession }}>
        <SideBar closeSideBar={closeSideBar} />
      </SessionContext.Provider>
    );

    const spy = jest.spyOn(console, "log");

    fireEvent.click(screen.getByText("Minhas reservas"));
    expect(spy).toHaveBeenCalledWith("/my-reservations");
    fireEvent.click(screen.getByText("Informações pessoais"));
    expect(spy).toHaveBeenCalledWith("/user-data");
    fireEvent.click(screen.getByText("Favoritos"));
    expect(spy).toHaveBeenCalledWith("/favorites");
    fireEvent.click(screen.getByText("Historico de reservas"));
    expect(spy).toHaveBeenCalledWith("/reservation-history");
    fireEvent.click(screen.getByText("Logout"));
    expect(spy).toHaveBeenCalledWith("Logout");
  });
});