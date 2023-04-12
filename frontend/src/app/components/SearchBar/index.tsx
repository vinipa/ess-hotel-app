import { useCallback, useState } from "react";
import "./index.css";
import { APIClient } from "../../../services/api/client";
import { Props } from "../ImageCard";

interface PropsSearchBar {
  handleSearchCards: (a: Props[]) => void;
}

export default function SearchBar({ handleSearchCards }: PropsSearchBar) {
  const [cityName, setCityName] = useState("");
  const [date, setDate] = useState("");
  const [guestsNumber, setGuestsNumber] = useState<number | null>(null);

  const getSearchReservations = useCallback(async () => {
    const apiClient = new APIClient();

    try {
      const reservations = await apiClient.getReservationWithFilter({
        cityName,
        date,
        guestsNumber,
      });
      const reservationsList = reservations.map((e) => {
        const newObject = {
          src: "",
          id: e.id,
          alt: "Image 1",
          width: "200px",
          height: "200px",
          name: e.name,
          location: e.city,
          price: e.budget,
          description: e.additionalInfo,
          favoritePage: false,
          descriptionFull: false,
        } as unknown as Props;
        return newObject;
      });

      handleSearchCards(reservationsList);
    } catch (err) {
      throw new Error("Error while getting users");
    }
  }, [cityName, date, guestsNumber]);

  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Para onde?"
        className="test"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      />
      <input
        type="date"
        placeholder="Data"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="number"
        placeholder="Nº de Hóspedes"
        //@ts-ignore
        value={guestsNumber}
        onChange={(e) => setGuestsNumber(parseInt(e.target.value))}
      />
      <button className="search_button" onClick={getSearchReservations}>
        Pesquisar
      </button>
    </div>
  );
}
