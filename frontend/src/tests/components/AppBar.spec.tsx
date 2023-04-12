import { render, fireEvent, screen, getByTestId } from "@testing-library/react";
import AppBar from "../../app/components/AppBar";
import { SessionContext } from "../../app/providers/SessionContext";
jest.mock("../../services/api/client");

describe("AppBar", () => {
  it("Deve renderizar a barra superiro do app corretamente", () => {
    const showLoginRegisterModal = jest.fn();
    const setSession = jest.fn();

    const session = {
      token: "asas1d32as4d65a4f5sfda",
      userName: "Rafael Carlos",
      ADM: false,
    };

    const { getByText } = render(
      <SessionContext.Provider value={{ session, setSession }}>
        <AppBar showLoginRegisterModal={showLoginRegisterModal} />
      </SessionContext.Provider>
    );

    expect(getByText("Rafael Carlos")).toBeInTheDocument();
    expect(getByText("CIN VAGO")).toBeInTheDocument();
  });
  it("Deve chamar as funçoes corretas ao clicar nos botões da barra superior", () => {
    const showLoginRegisterModal = jest.fn();
    const setSession = jest.fn();

    const session = {
      token: "asas1d32as4d65a4f5sfda",
      userName: "Rafael Carlos",
      ADM: false,
    };

    const { getByText } = render(
      <SessionContext.Provider value={{ session, setSession }}>
        <AppBar showLoginRegisterModal={showLoginRegisterModal} />
      </SessionContext.Provider>
    );

    const spy = jest.spyOn(console, "log");

    fireEvent.click(screen.getByText("Rafael Carlos"));

    fireEvent.click(screen.getByText("CIN VAGO"));
    expect(spy).toHaveBeenCalledWith("/");
  });
});