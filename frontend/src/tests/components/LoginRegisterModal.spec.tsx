import { render, fireEvent, screen, act } from "@testing-library/react";
import LoginRegisterModal from "../../app/components/LoginRegisterModal";
import { SessionContext } from "../../app/providers/SessionContext";
import { APIClient } from "../../services/api/client";
jest.mock("../../services/api/client");

describe("SearchBar", () => {
  it("Deve exibir o modal de registro de usuario comum corretamente", () => {
    const onRequestClose = jest.fn();
    const setSession = jest.fn();

    const session = {
      token: "123456789",
      userName: "Rafael Carlos",
      ADM: false,
    };

    render(
      <SessionContext.Provider value={{ session, setSession }}>
        <LoginRegisterModal
          onRequestClose={onRequestClose}
          isOpen={true}
          newUser={true}
        />
      </SessionContext.Provider>
    );

    expect(screen.getByText("Cadastre-se no Cinvago!")).toBeInTheDocument();
    expect(
      screen.getByText("Eu aceito os termos e condições")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Aceito receber alertas promocionais por email")
    ).toBeInTheDocument();
    expect(screen.getByText("Criar conta")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nome")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("CPF")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Repetir senha")).toBeInTheDocument();
  });
  it("Deve exibir o modal de login de usuario corretamente", () => {
    const onRequestClose = jest.fn();
    const setSession = jest.fn();

    const session = {
      token: "123456789",
      userName: "Rafael Carlos",
      ADM: false,
    };

    render(
      <SessionContext.Provider value={{ session, setSession }}>
        <LoginRegisterModal
          onRequestClose={onRequestClose}
          isOpen={true}
          newUser={false}
        />
      </SessionContext.Provider>
    );

    expect(screen.getByText("Faça Login no Cinvago!")).toBeInTheDocument();
    expect(screen.getByText("Manter-se conectado")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
  });
  it("Deve realizar o login corretamente", async () => {
    const sendFormLogin = APIClient.prototype
      .sendFormLogin as jest.MockedFunction<
      typeof APIClient.prototype.sendFormLogin
    >;
    sendFormLogin.mockReturnValue(Promise.resolve([]));

    const onRequestClose = jest.fn();
    const setSession = jest.fn();

    const session = {
      token: "123456789",
      userName: "Rafael Carlos",
      ADM: false,
    };

    render(
      <SessionContext.Provider value={{ session, setSession }}>
        <LoginRegisterModal
          onRequestClose={onRequestClose}
          isOpen={true}
          newUser={false}
        />
      </SessionContext.Provider>
    );

    const email = screen.getByPlaceholderText("Email");
    const senha = screen.getByPlaceholderText("Senha");
    const loginButton = screen.getByText("Login");

    await act(async () => {
      fireEvent.change(email, { target: { value: "test@exemple.com" } });
      fireEvent.change(senha, { target: { value: "123456" } });
      fireEvent.click(loginButton);
    });

    expect(sendFormLogin).toHaveBeenCalled();
  });
  it("Deve exibir o modal de falha no login", async () => {
    const sendFormLogin = APIClient.prototype
      .sendFormLogin as jest.MockedFunction<
      typeof APIClient.prototype.sendFormLogin
    >;
    sendFormLogin.mockReturnValue(Promise.reject([]));

    const onRequestClose = jest.fn();
    const setSession = jest.fn();

    const session = {
      token: "123456789",
      userName: "Rafael Carlos",
      ADM: false,
    };

    render(
      <SessionContext.Provider value={{ session, setSession }}>
        <LoginRegisterModal
          onRequestClose={onRequestClose}
          isOpen={true}
          newUser={false}
        />
      </SessionContext.Provider>
    );

    const email = screen.getByPlaceholderText("Email");
    const senha = screen.getByPlaceholderText("Senha");
    const loginButton = screen.getByText("Login");

    await act(async () => {
      fireEvent.change(email, { target: { value: "test@exemple.com" } });
      fireEvent.change(senha, { target: { value: "123456" } });
      fireEvent.click(loginButton);
    });

    expect(sendFormLogin).toHaveBeenCalled();
    expect(screen.getByText("Falha no Login"));
    expect(
      screen.getByText(
        "Falha na realização do login, por favor verifique os dados e tente novamente."
      )
    );
  });
  it("Deve realizar o registro corretamente", async () => {
    const sendFormRegister = APIClient.prototype
      .sendFormRegister as jest.MockedFunction<
      typeof APIClient.prototype.sendFormRegister
    >;
    sendFormRegister.mockReturnValue(Promise.resolve([]));

    const onRequestClose = jest.fn();
    const setSession = jest.fn();

    const session = {
      token: "123456789",
      userName: "Rafael Carlos",
      ADM: false,
    };

    render(
      <SessionContext.Provider value={{ session, setSession }}>
        <LoginRegisterModal
          onRequestClose={onRequestClose}
          isOpen={true}
          newUser={true}
        />
      </SessionContext.Provider>
    );

    const Nome = screen.getByPlaceholderText("Nome");
    const email = screen.getByPlaceholderText("Email");
    const CPF = screen.getByPlaceholderText("CPF");
    const senha = screen.getByPlaceholderText("Senha");
    const repetirSenha = screen.getByPlaceholderText("Repetir senha");
    const registerButton = screen.getByText("Criar conta");

    await act(async () => {
      fireEvent.change(email, { target: { value: "test@exemple.com" } });
      fireEvent.change(senha, { target: { value: "123456" } });
      fireEvent.change(repetirSenha, { target: { value: "123456" } });
      fireEvent.change(Nome, { target: { value: "Carlos Andre" } });
      fireEvent.change(CPF, { target: { value: "12345678" } });
      fireEvent.click(registerButton);
    });

    expect(sendFormRegister).toHaveBeenCalled();
  });
  it("Deve realizar o registro corretamente", async () => {
    const sendFormRegister = APIClient.prototype
      .sendFormRegister as jest.MockedFunction<
      typeof APIClient.prototype.sendFormRegister
    >;
    sendFormRegister.mockReturnValue(Promise.reject([]));

    const onRequestClose = jest.fn();
    const setSession = jest.fn();

    const session = {
      token: "123456789",
      userName: "Rafael Carlos",
      ADM: false,
    };

    render(
      <SessionContext.Provider value={{ session, setSession }}>
        <LoginRegisterModal
          onRequestClose={onRequestClose}
          isOpen={true}
          newUser={true}
        />
      </SessionContext.Provider>
    );

    const Nome = screen.getByPlaceholderText("Nome");
    const email = screen.getByPlaceholderText("Email");
    const CPF = screen.getByPlaceholderText("CPF");
    const senha = screen.getByPlaceholderText("Senha");
    const repetirSenha = screen.getByPlaceholderText("Repetir senha");
    const registerButton = screen.getByText("Criar conta");

    await act(async () => {
      fireEvent.change(email, { target: { value: "test@exemple.com" } });
      fireEvent.change(senha, { target: { value: "123456" } });
      fireEvent.change(repetirSenha, { target: { value: "123456" } });
      fireEvent.change(Nome, { target: { value: "Carlos Andre" } });
      fireEvent.change(CPF, { target: { value: "12345678" } });
      fireEvent.click(registerButton);
    });

    expect(sendFormRegister).toHaveBeenCalled();
    expect(screen.getByText("Falha no registro."));
    expect(
      screen.getByText(
        "Falha na realização do cadastro, por favor verifique os dados e tente novamente."
      )
    );
  });
});
