import { useCallback, useState } from "react";
import CustomButton from "../../components/CustomButton";
import { Input } from "../../components/Input";

import "./index.css";
import { APIClient } from "../../../services/api/client";
import Modal from "../../components/Modal";

export interface RegisterADMInterface {
  name: string;
  email: string;
  cpf: string;
  password: string;
  repassword: string;
  phone: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  complement: string;
  reference: string;
}

export default function AdmRegisterPage() {
  const [registerInfo, setRegisterInfo] = useState<RegisterADMInterface>(
    {} as RegisterADMInterface
  );
  const [missingField, setMissingField] = useState<string>("");
  const [notEqualPassword, setNotEqualPassword] = useState<boolean>(false);
  const [serverError, setServerError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleInputGeneric = useCallback(
    (key: string, value: string) => {
      setRegisterInfo({ ...registerInfo, [key]: value });
    },
    [registerInfo, setRegisterInfo]
  );

  const registerAdmin = async (data: RegisterADMInterface) => {
    const keys = [
      "name",
      "email",
      "cpf",
      "password",
      "repassword",
      "phone",
      "state",
      "city",
      "neighborhood",
      "street",
      "complement",
      "reference",
    ];

    const map = {
      name: "Nome completo",
      email: "Email",
      cpf: "CPF",
      password: "Senha",
      repassword: "Repetir senha",
      phone: "Telefone",
      state: "Estado",
      city: "Cidade",
      neighborhood: "Bairro",
      street: "Rua",
      complement: "Complemento",
      reference: "Referência,",
    };

    for (let key of keys) {
      //@ts-ignore
      if (!data[key]) {
        //@ts-ignore
        setMissingField(map[key]);
        return;
      }
    }

    if (data.password !== data.repassword) {
      setNotEqualPassword(true);
      return;
    }

    try {
      const api = new APIClient();
      console.log(api)
      await api.createAdmUser(data);
      setSuccess(true);
    } catch (e) {
      setServerError(true);
    }
  };

  return (
    <>
      <Modal
        showBlackBackground
        isOpen={success}
        title="Cadastro realizado"
        description={`O usuário foi cadastrado com sucesso!`}
        onRequestClose={() => {
          setSuccess(false);
        }}
      ></Modal>
      <Modal
        showBlackBackground
        isOpen={!!missingField.length}
        title="Campo não preenchido"
        description={`Preencha o campo ${missingField}`}
        onRequestClose={() => {
          setMissingField("");
        }}
      ></Modal>
      <Modal
        showBlackBackground
        isOpen={notEqualPassword}
        title="Senhas difeentes"
        description="Por favor, repita as senhas igualmente"
        onRequestClose={() => {
          setNotEqualPassword(false);
        }}
      ></Modal>
      <Modal
        showBlackBackground
        isOpen={serverError}
        title="Erro no servidor"
        description="Erro ao realizar o cadastro, por favor tente novamente mais tarde."
        onRequestClose={() => {
          setServerError(false);
        }}
      ></Modal>
      <div className="adm-screen-container">
        <div className="adm-screen-wrapper">
          <h2>INFORMAÇÕES PESSOAIS</h2>
          <div className="session1">
            <div className="leftAdmPage">
              <div className="input-div">
                <label>Nome Completo *</label>
                <Input
                  onChange={(e) => {
                    handleInputGeneric("name", e.target.value);
                  }}
                  type="text"
                  placeholder="Joaquim Pinto"
                />
              </div>
              <div className="input-div">
                <label>Email *</label>
                <Input
                  onChange={(e) => {
                    handleInputGeneric("email", e.target.value);
                  }}
                  type="text"
                  placeholder="joca@email.com"
                />
              </div>
              <div className="input-div">
                <label>Número de telefone *</label>
                <Input
                  onChange={(e) => {
                    handleInputGeneric("phone", e.target.value);
                  }}
                  type="text"
                  placeholder="(81) 9 9999-9999"
                />
              </div>
            </div>
            <div className="rightAdmPage">
              <div className="input-div">
                <label>Senha inicial *</label>
                <Input
                  onChange={(e) => {
                    handleInputGeneric("password", e.target.value);
                  }}
                  type="password"
                  placeholder="*********"
                />
              </div>
              <div className="input-div">
                <label>Repetir senha inicial *</label>
                <Input
                  onChange={(e) => {
                    handleInputGeneric("repassword", e.target.value);
                  }}
                  type="password"
                  placeholder="**********"
                />
              </div>
              <div className="input-div">
                <label>CPF *</label>
                <Input
                  onChange={(e) => {
                    handleInputGeneric("cpf", e.target.value);
                  }}
                  type="text"
                  placeholder="123.123.123-12"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="adm-screen-wrapper">
          <h2>ENDEREÇO</h2>
          <div className="session2">
            <div className="leftAdmPage">
              <div className="input-div">
                <label>Estado *</label>
                <Input
                  onChange={(e) => {
                    handleInputGeneric("state", e.target.value);
                  }}
                  type="text"
                  placeholder="Pernambuco"
                />
              </div>
              <div className="input-div">
                <label>Cidade *</label>
                <Input
                  onChange={(e) => {
                    handleInputGeneric("city", e.target.value);
                  }}
                  type="text"
                  placeholder="Recife"
                />
              </div>
              <div className="input-div">
                <label>Bairro *</label>
                <Input
                  onChange={(e) => {
                    handleInputGeneric("neighborhood", e.target.value);
                  }}
                  type="text"
                  placeholder="Boa Viagem"
                />
              </div>
            </div>
            <div className="rightAdmPage">
              <div className="input-div">
                <label>Rua *</label>
                <Input
                  onChange={(e) => {
                    handleInputGeneric("street", e.target.value);
                  }}
                  type="text"
                  placeholder="Rua das alamedas"
                />
              </div>
              <div className="input-div">
                <label>Complemento *</label>
                <Input
                  onChange={(e) => {
                    handleInputGeneric("complement", e.target.value);
                  }}
                  type="text"
                  placeholder="N 123, Apto 101"
                />
              </div>
              <div className="input-div">
                <label>Referência *</label>
                <Input
                  onChange={(e) => {
                    handleInputGeneric("reference", e.target.value);
                  }}
                  type="text"
                  placeholder="Próximo a padaria Doce Pão"
                />
              </div>
            </div>
          </div>
        </div>
        <CustomButton
          large
          title={"Cadastrar Administrador"}
          onClick={() => {
            registerAdmin(registerInfo);
          }}
        ></CustomButton>
      </div>
    </>
  );
}
