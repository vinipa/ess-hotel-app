import { Link } from "react-router-dom";
import {
  IconStarFavoritesActive,
  IconStarFavoritesDesable,
} from "../../assets/icons";
import "./index.css";
import { useState } from "react";
import { PropsEvaluations } from "../EvaluationField";
import { useSession } from "../../providers/SessionContext";
import { APIClient } from "../../../services/api/client";

interface ImageCardProps {
  width: string;
  id: string;
  alt: string;
  src: string;
  height: string;
  location: string;
  name: string;
  description: string;
  price: string;
  favoritePage: boolean;
  descriptionFull: boolean;
}

function ImageCard({
  width,
  alt,
  src,
  height,
  location,
  price,
  description,
  id,
  name,
  favoritePage,
  descriptionFull,
}: ImageCardProps) {
  const [starActive, setStarActive] = useState(true);

  const setTextDescription = (text: string, textFull: boolean) => {
    if (text.length > 60 && !textFull) {
      for (let i = 60; i <= text.length; i++)
        if (text[i] === " " || text[i] === "." || text[i] === ",") {
          return text.slice(0, i - 1) + "...";
        } else if (i === text.length - 1) {
          return text;
        }
    } else {
      return text;
    }
  };

  const linkTo = (
    favoritePage: boolean,
    descriptionFull: boolean,
    id: string
  ) => {
    if (favoritePage) {
      return "/favorites";
    } else if (descriptionFull) {
      return "/my-reservations";
    } else {
      return "/booking/" + id;
    }
  };

  const { session } = useSession();

  const removeFavorites = async () => {
    const apiClient = new APIClient();

    try {
      const userId = await apiClient.getIdByToken(session.token);
      await apiClient.setFavoritesReservation(userId, id, false);
      window.location.reload();
    } catch (err) {
      throw new Error("Error while getting users");
    }
  };

  return (
    <Link
      to={linkTo(favoritePage, descriptionFull, id) || "undefined"}
      className="image-card"
      style={
        favoritePage || descriptionFull
          ? { cursor: "auto" }
          : { cursor: "pointer" }
      }
    >
      <img src={src} alt={alt} style={{ width: width, height: height }} />
      {favoritePage ? (
        <>
          <div className="header">
            <div className="left">
              <p className="location">
                <span id="name">{name}</span>
                {", " + location}
              </p>
              <p className="price">{"R$" + price}</p>
            </div>
            <button
              className="starFavoriteButton"
              onMouseOver={() => setStarActive(false)}
              onMouseOut={() => setStarActive(true)}
              onClick={removeFavorites}
            >
              {starActive ? IconStarFavoritesActive : IconStarFavoritesDesable}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="header">
            <p className="location">
              <span id="name">{name}</span>
              {", " + location}
            </p>
            <p className="price">{"R$" + price}</p>
          </div>
        </>
      )}
      <div className="description">
        <p className="location">
          {setTextDescription(description, descriptionFull)}
        </p>
      </div>
    </Link>
  );
}

function contentCard() {
  return;
}

export default ImageCard;

export interface Props {
  src: string;
  id: string;
  name: string;
  alt: string;
  width: string;
  height: string;
  location: string;
  price: string;
  description: string;
  page: string;
  favoritePage: boolean;
  descriptionFull: boolean;
  setFavorites?: () => null;
  evaluations?: PropsEvaluations;
}
