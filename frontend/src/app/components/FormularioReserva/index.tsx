import React, { useCallback, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { FormValues } from "../../../services/api/interfaces";
import "./index.css";
import CreateReservationAPI from "../../hooks/createReservation";
import { APIClient } from "../../../services/api/client";
import { useSession } from "../../providers/SessionContext";
import Modal from "../Modal";

const validationSchema = () =>
  Yup.object({
    name: Yup.string().required("Um nome para a reserva é obrigatório"),
    city: Yup.string().required("A cidade é obrigatória"),
    street: Yup.string().required("O nome da rua é obrigatório"),
    streetNumber: Yup.number()
      .required("Digite o número do endereço")
      .typeError("O número do local deve ser um número"),
    cep: Yup.string()
      .required("O cep é obrigatório")
      .min(8, "Digite um número válido de CEP")
      .max(8, "Digite um número válido de CEP"),
    checkIn: Yup.date()
      .required("A data de check-in é obrigatória")
      .min(new Date(), "A data de check-in não pode ser no passado"),
    checkOut: Yup.date()
      .required("A data de check-out é obrigatória")
      .min(
        Yup.ref("checkIn"),
        "A data de check-out deve ser depois da data de check-in"
      ),
    guests: Yup.number()
      .required("O número de hóspedes é obrigatório")
      .typeError("A quantidade de hóspedes deve ser um número")
      .positive("A quantidade de hóspedes deve ser positiva")
      .min(1, "Deve haver pelo menos um hóspede"),
    budget: Yup.number()
      .required("O valor da diária é obrigatório")
      .typeError("O valor da diária deve ser um número")
      .positive("O valor da diária deve ser positivo")
      .min(0, "Digite um valor válido"),
    bedrooms: Yup.number()
      .typeError("O número de quartos deve ser um número")
      .required("A quantidade de quartos é obrigatório")
      .min(0, "Digite um valor válido"),
    beds: Yup.number()
      .required("O número de camas é obrigatório")
      .typeError("A quantidade de camas deve ser um número")
      .min(0, "Digite um valor válido"),
    bathrooms: Yup.number()
      .required("O número de banheiros é obrigatório")
      .min(0, "Digite um valor válido")
      .typeError("A quantidade de banheiros deve ser um número"),
    additionalInfo: Yup.string().max(
      500,
      "A Descrição não podem ter mais de 500 caracteres"
    ),
  });
/*
  interface ReservationFormProps {
    postCreateReservation?: (
      values: FormValues,
      helpers: FormikHelpers<FormValues>
    ) => Promise<void>;
  }
 */

export const ReservationForm: React.FC = () => {
  const initialValues: FormValues = {
    name: "",
    city: "",
    street: "",
    streetNumber: 1,
    checkIn: "",
    checkOut: "",
    guests: 1,
    cep: "",
    budget: "",
    additionalInfo: "",
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    photos: [],
  };

  const { session } = useSession();
  const [modal, setModal] = useState(false);
  const [modalTittle, setModalTittle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [registerSuccess, setregisterSuccess] = useState(false);


  const postCreateReservation = useCallback(
    async (
      values: FormValues,
      { setSubmitting }: FormikHelpers<FormValues>
    ) => {
      console.log("Submeti")
      const apiClient = new APIClient();

      try {
        const id = await apiClient.getIdByToken(session.token);

        await apiClient.createReservation({
          ...values,
          //@ts-ignore
          owner: id,
        });
        
        setModal(() => true);
        setModalTittle(() => "Propriedade Cadastrada");
        setModalDescription(
          () => "Você realizou o cadastro de uma nova propriedade com sucesso."
        );
        setregisterSuccess(() => true);
      } catch (err) {
        setModal(() => true);
        setModalTittle(() => "Falha no Cadastro da propriedade");
        setModalDescription(
          () =>
            "Houve um erro na tentativa de realizar seu cadastro, tente novamente mais tarde."
        );
      } finally {
        setSubmitting(false);
      }
    },
    [session]
  );

  // const onSubmit = (
  //   values: FormValues,
  //   { setSubmitting }: FormikHelpers<FormValues>
  // ) => {
  //   console.log("onSubmit");
  //   try {
  //     createElement(values);
  //     alert("Reservation created successfully");
  //   } catch (error) {
  //     alert("Error creating reservation");
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };


  return (
    <div className="page">
      <Modal
        isOpen={modal}
        onRequestClose={
          registerSuccess
            ? () => (window.location.href = "/my-reservations")
            : () => setModal(false)
        }
        title={modalTittle}
        description={modalDescription}
        showBlackBackground={true}
      />
      <h1>Crie sua reserva</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={postCreateReservation}
      >
        {({ isSubmitting}: any) => (
          <>
            <Form className="container" >
              <div className="formInputContainer">
                <div className="leftPage">
                  <span className="option">
                    <label htmlFor="name">Título</label>
                    <Field type="text" name="name" id="name" />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error-message"
                    />
                  </span>
                  <span className="option">
                    <label htmlFor="city">Cidade</label>
                    <Field type="text" name="city" id="city"/>
                    <ErrorMessage
                      name="city"
                      component="div"
                      className="error-message"
                    />
                  </span>
                  <span className="option">
                    <label htmlFor="street">Rua</label>
                    <Field type="text" name="street" id="street"/>
                    <ErrorMessage
                      name="street"
                      component="div"
                      className="error-message"
                    />
                  </span>
                  <span className="option">
                    <label htmlFor="streetNumber">Número</label>
                    <Field type="number" name="streetNumber" id="streetNumber" />
                    <ErrorMessage
                      name="streetNumber"
                      component="div"
                      className="error-message"
                    />
                  </span>
                  <span className="option">
                    <label htmlFor="cep">CEP</label>
                    <Field type="text" name="cep" id = "cep" />
                    <ErrorMessage
                      name="cep"
                      component="div"
                      className="error-message"
                    />
                  </span>
                  <span className="option">
                    <label htmlFor="additionalInfo" aria-multiline={true}>
                      Descrição
                    </label>
                    <Field
                      type="textarea"
                      as="textarea"
                      name="additionalInfo"
                      id = "additionalInfo"
                    />
                    <ErrorMessage
                      name="additionalInfo"
                      component="div"
                      className="error-message"
                    />
                  </span>
                  <span className="option">
                    <label htmlFor="guests" className="titleInput">
                      Quantidade de hóspedes
                    </label>
                    <Field type="number" name="guests"  id = "guests"/>
                    <ErrorMessage
                      name="guests"
                      component="div"
                      className="error-message"
                    />
                  </span>
                </div>
                <div className="rightPage">
                  <span className="option">
                    <label htmlFor="budget">Preço da diária</label>
                    <Field type="number" name="budget" id="budget" />
                    <ErrorMessage
                      name="budget"
                      component="div"
                      className="error-message"
                    />
                  </span>
                  <span className="option">
                    <label htmlFor="bedrooms">Quartos</label>
                    <Field type="number" name="bedrooms" id="bedrooms" />
                    <ErrorMessage
                      name="bedrooms"
                      component="div"
                      className="error-message"
                    />
                  </span>
                  <span className="option">
                    <label htmlFor="beds">Camas</label>
                    <Field type="number" name="beds" id="beds" />
                    <ErrorMessage
                      name="beds"
                      component="div"
                      className="error-message"
                    />
                  </span>
                  <span className="option">
                    <label htmlFor="bathrooms">Banheiros</label>
                    <Field type="number" name="bathrooms"  id="bathrooms" />
                    <ErrorMessage
                      name="bathrooms"
                      component="div"
                      className="error-message"
                    />
                  </span>
                  <span className="option">
                    <label htmlFor="checkIn">Check-in</label>
                    <Field type="date" name="checkIn" id="checkIn" />
                    <ErrorMessage
                      name="checkIn"
                      component="div"
                      className="error-message"
                    />
                  </span>
                  <span className="option">
                    <label htmlFor="checkOut">Check-out</label>
                    <Field type="date" name="checkOut" id="checkOut" />
                    <ErrorMessage
                      name="checkOut"
                      component="div"
                      className="error-message"
                    />
                  </span>
                </div>
              </div>
              <button name = "enviar" type="submit" disabled={isSubmitting}>
                Enviar
              </button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default ReservationForm;


  /* <span className="option">
<Field
  type="file"
  name="photos"
  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      const filesArray = Array.from(
        event.currentTarget.files
      );
      setFieldValue("photos", filesArray);
    }
  }}
  multiple
/>
<ErrorMessage
  name="photos"
  component="div"
  className="error-message"
/>
</span> */

