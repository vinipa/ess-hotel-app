import ReactModal from "react-modal";
import "./index.css";
import { IconClose } from "../../assets/icons";
import useLoginRegister from "../../hooks/useLoginRegister";
import Modal from "../Modal";

interface LoginRegisterModalProps {
  isOpen: boolean;
  newUser: boolean;
  onRequestClose: () => void;
}

export default function LoginRegisterModal({
  isOpen,
  newUser,
  onRequestClose,
}: LoginRegisterModalProps) {
  const {
    modal,
    modalTittle,
    modalDescription,
    data,
    resetData,
    onChangeInputs,
    onChangeInputsCheckbox,
    modalLogin,
    modalRegister,
  } = useLoginRegister(onRequestClose);

  return (
    <>
      {modal ? (
        <Modal
          isOpen={modal}
          onRequestClose={() => window.location.reload()}
          title={modalTittle}
          description={modalDescription}
          showBlackBackground={true}
        />
      ) : (
        <ReactModal
          isOpen={isOpen}
          onRequestClose={resetData}
          appElement={document.getElementById("root") as HTMLElement}
          className="modalLoginRegister"
          overlayClassName="overlayModalLoginRegister"
        >
          <div className="title">
            <p>
              {newUser ? "Cadastre-se no Cinvago!" : "Faça Login no Cinvago!"}{" "}
            </p>
            <button onClick={resetData}>{IconClose}</button>
          </div>
          <div className="formModalLoginRegister">
            {newUser ? (
              <input
                type="text"
                placeholder="Nome"
                value={data.name}
                name="name"
                onChange={onChangeInputs}
              />
            ) : (
              <></>
            )}
            <input
              type="text"
              placeholder="Email"
              value={data.email}
              name="email"
              onChange={onChangeInputs}
            />
            {newUser ? (
              <input
                type="text"
                placeholder="CPF"
                value={data.cpf}
                name="cpf"
                onChange={onChangeInputs}
              />
            ) : (
              <></>
            )}
            <input
              type="password"
              placeholder="Senha"
              value={data.password}
              name="password"
              onChange={onChangeInputs}
            />
            {newUser ? (
              <input
                type="password"
                placeholder="Repetir senha"
                value={data.repeatPassword}
                name="repeatPassword"
                onChange={onChangeInputs}
              />
            ) : (
              <></>
            )}
            <div className="checkboxFormModalLoginRegister">
              {!newUser ? (
                <span>
                  <input
                    type="checkbox"
                    name="keepConnected"
                    checked={data.keepConnected}
                    onChange={onChangeInputsCheckbox}
                  />
                  <label htmlFor="keepConnected">Manter-se conectado</label>
                </span>
              ) : (
                <></>
              )}
              {newUser ? (
                <>
                  <span>
                    <input
                      type="checkbox"
                      name="termsAndConditions"
                      checked={data.termsAndConditions}
                      onChange={onChangeInputsCheckbox}
                    />
                    <label htmlFor="termsAndConditions">
                      Eu aceito os termos e condições
                    </label>
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      name="promotions"
                      checked={data.promotions}
                      onChange={onChangeInputsCheckbox}
                    />
                    <label htmlFor="promotions">
                      Aceito receber alertas promocionais por email
                    </label>
                  </span>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <button
            className="buttonModalLoginRegister"
            onClick={() => {
              console.log("testenado 1 2 3...  ", newUser);
              newUser ? modalRegister(data) : modalLogin(data);
            }}
          >
            {newUser ? "Criar conta" : "Login"}
          </button>
        </ReactModal>
      )}
    </>
  );
}
