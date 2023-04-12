
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import SearchBar from "../../app/components/SearchBar";
import { APIClient } from "../../services/api/client";
jest.mock("../../services/api/client");

describe("SearchBar", () => {
    test("deve renderizar o forms de busca corretamente", () => {
        const handleSearchCards = jest.fn();

        const { getByPlaceholderText, getByLabelText, getByText } = render(
            <SearchBar handleSearchCards={handleSearchCards} />
        );

        const cityInput = getByPlaceholderText("Para onde?");
        const dateInput = getByPlaceholderText("Data");
        const guestsInput = getByPlaceholderText("Nº de Hóspedes");
        const searchButton = getByText("Pesquisar");

        expect(cityInput).toBeInTheDocument();
        expect(dateInput).toBeInTheDocument();
        expect(guestsInput).toBeInTheDocument();
        expect(searchButton).toBeInTheDocument();
    });
});

describe("SearchBar", () => {
    it("deve chamar APIClient.getReservationWithFilter com os argumentos corretos", async () => {
        const mockGetReservationWithFilter = APIClient.prototype.getReservationWithFilter as jest.MockedFunction<typeof APIClient.prototype.getReservationWithFilter>;
        mockGetReservationWithFilter.mockReturnValue(Promise.resolve([]));

        const handleSearchCards = jest.fn();

        const { getByPlaceholderText, getByText } = render(
            <SearchBar handleSearchCards={handleSearchCards} />
        );

        const cityInput = getByPlaceholderText("Para onde?");
        const dateInput = getByPlaceholderText("Data");
        const guestsInput = getByPlaceholderText("Nº de Hóspedes");
        const searchButton = getByText("Pesquisar");

        await act(async () => {
            fireEvent.change(cityInput, { target: { value: "Florianópolis" } });
            fireEvent.change(dateInput, { target: { value: "2022-05-10" } });
            fireEvent.change(guestsInput, { target: { value: "2" } });
            fireEvent.click(searchButton);
        });

        expect(mockGetReservationWithFilter).toHaveBeenCalledWith({
            cityName: "Florianópolis",
            date: "2022-05-10",
            guestsNumber: 2,
        });
        expect(handleSearchCards).toHaveBeenCalledWith([]);
    });
});