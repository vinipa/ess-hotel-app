// import { render, fireEvent, waitFor } from "@testing-library/react";
// import { onSubmit } from "./BookingPage";

// describe("onSubmit function", () => {
//   it("displays an error message when the guest number is greater than the reservation guests", async () => {
//     // Arrange
//     const mockHandleOpenModal = jest.fn();
//     const values = { guestNumber: 5 };
//     const reservation = { guests: 4 };
//     const rangeDate = ["2022-01-01", "2022-01-07"];
//     const session = { user: { id: "123" } };

//     // Act
//     onSubmit(values, mockHandleOpenModal, reservation, rangeDate, session);
//     await waitFor(() => expect(mockHandleOpenModal).toHaveBeenCalledTimes(1));

//     // Assert
//     expect(mockHandleOpenModal).toHaveBeenCalledWith(
//       "Mais pessoas do que o permitido",
//       "A acomodação não comporta a quantidade de pessoas informada para a reserva."
//     );
//   });

//   it("displays an error message when the date range is invalid", async () => {
//     // Arrange
//     const mockHandleOpenModal = jest.fn();
//     const values = { guestNumber: 2 };
//     const reservation = { guests: 4 };
//     const rangeDate = ["", ""];
//     const session = { user: { id: "123" } };

//     // Act
//     onSubmit(values, mockHandleOpenModal, reservation, rangeDate, session);
//     await waitFor(() => expect(mockHandleOpenModal).toHaveBeenCalledTimes(1));

//     // Assert
//     expect(mockHandleOpenModal).toHaveBeenCalledWith(
//       "Período inválido",
//       "Por favor selecione datas válidas para a sua reserva"
//     );
//   });

//   it("creates a reservation successfully when all inputs are valid", async () => {
//     // Arrange
//     const mockGetUserId = jest.fn(() => "123");
//     const mockCreateElement = jest.fn();
//     const mockHandleOpenModal = jest.fn();
//     const values = { guestNumber: 2 };
//     const reservation = { guests: 4 };
//     const rangeDate = ["2022-01-01", "2022-01-07"];
//     const session = { user: { id: "123" } };

//     // Act
//     onSubmit(values, mockHandleOpenModal, reservation, rangeDate, session, mockGetUserId, mockCreateElement);
//     await waitFor(() => expect(mockCreateElement).toHaveBeenCalledTimes(1));

//     // Assert
//     expect(mockGetUserId).toHaveBeenCalledTimes(1);
//     expect(mockCreateElement).toHaveBeenCalledWith({ ...values, userId: "123" });
//     expect(mockHandleOpenModal).toHaveBeenCalledWith(
//       "Reserva requisitada com sucesso",
//       "O anfintrião da acomodação já foi avisado das suas intenções, qualquer atualização será informada no e-mail."
//     );
//   });
// });
import { render, screen } from "@testing-library/react"
import UserData from "../../app/pages/UserData";

describe('', () => {
    it('', () => {


    })
})
