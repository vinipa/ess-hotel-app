import { RatingResponse } from '../../../services/api/interfaces';
import { IconSelectedRatingStar, IconUnselectRatingStar, IconUserCircle } from '../../assets/icons';
import { Row, SizedBoxVertical } from '../../utils/utils';
import styled from "styled-components";

const RatingContainer = styled.div`
  max-width: 250px;
`;

const RatingColumn = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 200px;
`;

const RatingBodyText = styled.span`
  color: #27273f;
  font-size: 18px;
  align-self: flex-start;
  text-align: left;
`;

const RatingTitleText = styled.span`
  color: #6e7491;
  font-size: 18px;
  align-self: flex-start;
`;

interface RatingCardProps {
    rating: RatingResponse;
}

const handleFormatDate = (date: string) => {
    const formatedDate = new Date(date).toLocaleString();
    return formatedDate;
};

const handleStarNumber = (starNumber: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < starNumber) {
            stars.push(IconSelectedRatingStar);
        } else {
            stars.push(IconUnselectRatingStar);
        }
    }
    return stars;
};

function RatingCard({ rating }: RatingCardProps) {
    return (
        <RatingContainer>
            <Row>
                {IconUserCircle}
                <RatingColumn>
                    <RatingTitleText>{rating.userName}</RatingTitleText>
                    <RatingTitleText>
                        <>{handleFormatDate(rating.date)}</>
                    </RatingTitleText>
                    <SizedBoxVertical />
                    <Row>
                        <>{handleStarNumber(rating?.star)}</>
                    </Row>
                    <SizedBoxVertical />
                    <RatingBodyText>{rating.text}</RatingBodyText>
                </RatingColumn>
            </Row>
        </RatingContainer>
    );
}

export default RatingCard;