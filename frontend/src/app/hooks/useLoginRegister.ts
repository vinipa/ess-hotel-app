import { ChangeEvent, useState } from "react";
import { useSession } from "../providers/SessionContext";
import { APIClient } from "../../services/api/client";

const API = new APIClient();

export default function useLoginRegister(func: () => void) {
  const { setSession } = useSession();
  const [modal, setModal] = useState(false);
  const [modalTittle, setModalTittle] = useState("");
  const [modalDescription, setModalDescription] = useState("");

  const [data, setData] = useState({
    name: "",
    email: "",
    cpf: "",
    password: "",
    repeatPassword: "",
    keepConnected: false,
    termsAndConditions: false,
    promotions: false,
  });

  const resetData = () => {
    setData({
      name: "",
      email: "",
      cpf: "",
      password: "",
      repeatPassword: "",
      keepConnected: false,
      termsAndConditions: false,
      promotions: false,
    });
    func();
  };

  const onChangeInputs = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onChangeInputsCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setData(() => {
      const retorno = {
        ...data,
        [e.target.name]: !data[e.target.name as keyof typeof data],
      };
      console.log(retorno);
      return retorno;
    });
  };

  const modalLogin = async (data: any) => {
    try {
      const response = await API.sendFormLogin(data);
      if (data.keepConnected) {
        window.localStorage.setItem("sessionData", JSON.stringify(response));
      }
      setSession(() => response);
      if (response.token) {
        resetData();
      }
    } catch {
      setModalTittle("Falha no Login");
      setModalDescription(
        "Falha na realização do login, por favor verifique os dados e tente novamente."
      );
      setModal(true);
    }
  };

  const modalRegister = async (data: any) => {
    try {
      await API.sendFormRegister(data);
      setModalTittle("Registro realizado com sucesso.");
      setModalDescription(
        "Seu registro foi realizado com sucesso, por favor realize o login para ter total acesso a plataforma."
      );
      setModal(true);
    } catch {
      setModalTittle("Falha no registro.");
      setModalDescription(
        "Falha na realização do cadastro, por favor verifique os dados e tente novamente."
      );
      setModal(true);
    }
    resetData();
  };

  return {
    modal,
    setModal,
    modalTittle,
    setModalTittle,
    modalDescription,
    setModalDescription,
    data,
    setData,
    resetData,
    onChangeInputs,
    onChangeInputsCheckbox,
    modalLogin,
    modalRegister,
  };
}
