import CustomButton from "../../components/CustomButton";
import { useParams } from "react-router-dom";
import GetReservationById from "../../hooks/getReservationById";
import styled from "styled-components";
import { useState, useCallback, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
    IconStarFavoritesActive,
    IconStarFavoritesDesable,
} from "../../assets/icons";
import CreateBookingTryByUser from "../../hooks/createBookingTryByUser";
import { BookingTryValues } from "../../../services/api/interfaces";
import { useSession } from "../../providers/SessionContext";
import Modal from "../../components/Modal";
import GetRatingsByReservationId from "../../hooks/getRatingsByReservationId";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import "./index.css";
import { APIClient } from "../../../services/api/client";
import DescriptionHeader from "../../components/DescriptionHeader";
import RatingCard from "../../components/RatingCard";
import ReservationIconList from "../../components/ReservationIconList";
import BookingCard from "../../components/BookingCard";
import { DescriptionBodyText, DescriptionTitleText, Divider, PriceText, Row, SizedBoxVertical, TitleText } from "../../utils/utils";
import ImageList from "../../components/ImageList";

const CentralContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
`;

export default function BookingPage() {
    const { id } = useParams();
    const { reservation } = GetReservationById({ id: id as string });
    const [guestNumber, setGuestNumber] = useState(0);
    const [selectedPaymentMethod, setselectedPaymentMethod] = useState<string>();
    const [starActive, setStarActive] = useState(false);
    const [TempStarActive, setTempStarActive] = useState(false);

    useEffect(() => {
        setTempStarActive(starActive);
    }, [starActive]);

    const { session } = useSession();
    const { ratings } = GetRatingsByReservationId({ id: id as string });

    const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setselectedPaymentMethod(event.target.value);
    };

    const { createElement } =
        CreateBookingTryByUser();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [titleModal, setTitleModal] = useState("");

    const [bodyModal, setBodyModal] = useState("");

    const [rangeDate, setRangeDate] = useState(["", ""]);

    useEffect(() => console.log(rangeDate), [rangeDate]);

    const handleOpenModal = (titleModal: string, bodyModal: string) => {
        setTitleModal(titleModal);
        setBodyModal(bodyModal);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const onSubmit = useCallback(
        async (values: BookingTryValues) => {
            console.log(values.guestNumber, reservation?.guests);
            //@ts-ignore
            if (values.guestNumber > reservation?.guests) {
                handleOpenModal(
                    "Mais pessoas do que o permitido",
                    "A acomodação não comporta a quantidade de pessoas informada para a reserva."
                );
                return;
            }
            if (rangeDate[0] == "" || rangeDate[1] == "") {
                handleOpenModal(
                    "Período inválido",
                    "Por favor selecione datas válidas para a sua reserva"
                );
                return;
            }
            try {
                const userId = await getUserId();
                await createElement({ ...values, userId });
                handleOpenModal(
                    "Reserva requisitada com sucesso",
                    "O anfintrião da acomodação já foi avisado das suas intenções, qualquer atualização será informada no e-mail."
                );
            } catch (error) {
                alert("Error creating reservation");
            }
        },
        [session, reservation, rangeDate]
    );

    useEffect(() => {
        getFavorites();
    }, []);

    const getFavorites = async () => {
        const apiClient = new APIClient();

        try {
            const userId = await apiClient.getIdByToken(session.token);
            const reservations = await apiClient.GetFavoritesReservations(userId);
            for (let i = 0; i < reservations.length; i++) {
                if (reservations[i].id === id) {
                    setStarActive(true);
                    return;
                } else if (i === reservations.length - 1) {
                    setStarActive(false);
                }
            }
        } catch (err) {
            throw new Error("Error while getting users");
        }
    };

    const setFavorites = async () => {
        const apiClient = new APIClient();
        try {
            const userId = await apiClient.getIdByToken(session.token);
            if (starActive && id) {
                await apiClient.setFavoritesReservation(userId, id, false);
                setStarActive(false);
            } else if (id) {
                await apiClient.setFavoritesReservation(userId, id, true);
                setStarActive(true);
            }
        } catch {
            throw new Error("fail");
        }
    };

    const getUserId = async () => {
        const apiClient = new APIClient();
        try {
            const userId = await apiClient.getIdByToken(session.token);
            return userId;
        } catch {
            alert("Error creating reservation");
            return "6ff5c112-2eb6-45f6-ae5b-8f6afa8ecc85";
        }
    };

    return (
        <>
            <CssBaseline />
            <Container maxWidth="xl">
                <Box
                    sx={{ bgcolor: "white", height: "100vh" }}
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "flex-start",
                        padding: "40px",
                        alignItems: "flex-start",
                    }}
                >
                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={handleCloseModal}
                        title={titleModal}
                        description={bodyModal}
                    />
                    <CentralContainer>
                        <Row>
                            <TitleText>
                                {reservation?.name + ", " + reservation?.city}
                            </TitleText>
                            <button
                                className="setFavoriteIcon"
                                onMouseOver={() => setTempStarActive(starActive ? false : true)}
                                onMouseOut={() => setTempStarActive(starActive ? true : false)}
                                onClick={setFavorites}
                            >
                                {TempStarActive
                                    ? IconStarFavoritesActive
                                    : IconStarFavoritesDesable}
                            </button>
                        </Row>
                        <ImageList />
                        <Divider />
                        <DescriptionHeader title="Descrição" description={<PriceText>R$ {reservation?.budget}</PriceText>} />
                        <DescriptionBodyText>
                            {reservation?.additionalInfo}
                        </DescriptionBodyText>
                        <Row>
                            <ReservationIconList reservation={reservation} />
                        </Row>
                        <Divider />
                        <Row>
                            <DescriptionTitleText>Reserva</DescriptionTitleText>
                            <CustomButton
                                onClick={() =>
                                    onSubmit({
                                        userId: "",
                                        reservationId: id,
                                        paymentMethod: selectedPaymentMethod,
                                        guestNumber: guestNumber,
                                        checkIn: rangeDate[0],
                                        checkOut: rangeDate[1],
                                    })
                                }
                                title={"Reservar"}
                            ></CustomButton>
                        </Row>
                        <SizedBoxVertical />
                        <SizedBoxVertical />
                        <SizedBoxVertical />
                        <Row>
                            <BookingCard guestNumber={guestNumber} setPlusIcon={function (): void {
                                setGuestNumber((previous) => previous + 1);
                            }} setMinusIcon={function (): void {
                                setGuestNumber((previous) => previous - 1);
                            }} radioHandler={radioHandler} />
                            {
                                //@ts-ignore
                                <Calendar
                                    value={rangeDate}
                                    selectRange
                                    onChange={setRangeDate}
                                />
                            }
                        </Row>
                        <Divider />
                        <DescriptionTitleText>Avaliações</DescriptionTitleText>
                        <SizedBoxVertical />
                        <SizedBoxVertical />
                        <Row>
                            {ratings?.map((rating) => (
                                <RatingCard rating={rating} />
                            ))}
                        </Row>
                    </CentralContainer>
                </Box>
            </Container>
        </>
    );
}
