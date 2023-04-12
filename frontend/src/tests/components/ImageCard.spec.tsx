
import { render, fireEvent, waitFor, act, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ImageCard from "../../app/components/ImageCard";
import { APIClient } from "../../services/api/client";
import { ReservationResponse } from "../../services/api/interfaces";
jest.mock("../../services/api/client");

describe("ImageCard", () => {
    test("deve renderizar o card corretamente", () => {
        //const handleReservationPage = jest.fn();

        const { getByPlaceholderText, getByLabelText, getByText } = render(
            <BrowserRouter>
                <ImageCard width={"200"} id={"testid"} alt={"Image 1"} src={""} height={"200"} location={"Recife"} name={"Holiday"} description={"Prédio limpo e lindo em Boa Viagem"} price={"1200"} favoritePage={false} descriptionFull={true}/>
            </BrowserRouter>
        );

        expect(screen.getByText("Holiday")).toBeInTheDocument();
        expect(screen.getByText(", Recife")).toBeInTheDocument();
        expect(screen.getByText("R$1200")).toBeInTheDocument();
        expect(screen.getByAltText("Image 1")).toBeInTheDocument();


    });
});
