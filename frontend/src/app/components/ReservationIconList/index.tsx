import { ReservationResponse } from '../../../services/api/interfaces';
import { IconBathroomNumber, IconBedroomNumber, IconGuestNumber, IconRangeDate, IconSelectedRatingStar, IconUnselectRatingStar, IconUserCircle } from '../../assets/icons';
import { DescriptionIconText } from '../../utils/utils';
import styled from "styled-components";

interface ReservationIconListProps {
    reservation: ReservationResponse | undefined;
}

const IconWidget = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

function ReservationIconList({ reservation }: ReservationIconListProps) {
    return (
        <>
            <IconWidget>
                {IconGuestNumber}
                <DescriptionIconText>
                    {" "}
                    {reservation?.guests}
                </DescriptionIconText>
            </IconWidget>
            <IconWidget>
                {IconRangeDate}
                <DescriptionIconText>
                    {reservation?.checkIn} - {reservation?.checkOut}
                </DescriptionIconText>
            </IconWidget>
            <IconWidget>
                {IconBathroomNumber}
                <DescriptionIconText>
                    {reservation?.bathrooms}
                </DescriptionIconText>
            </IconWidget>
            <IconWidget>
                {IconBedroomNumber}
                <DescriptionIconText>
                    {reservation?.bedrooms}
                </DescriptionIconText>
            </IconWidget>
        </>

    );
}

export default ReservationIconList;