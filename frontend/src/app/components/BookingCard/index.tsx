import { RatingResponse } from '../../../services/api/interfaces';
import { IconMinus, IconPlus, IconSelectedRatingStar, IconUnselectRatingStar, IconUserCircle } from '../../assets/icons';
import { ClickableIcon, Row, SizedBoxHorizontal, SizedBoxVertical } from '../../utils/utils';
import styled from "styled-components";
import { Input } from '../Input';

const MakeReservationContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 450px;
  align-items: left;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 30px;
  padding-right: 30px;
`;

const DescriptionReservationMakeText = styled.span`
  color: #717171;
  font-size: 20px;
  align-self: flex-start;
`;

const RadioLabel = styled.p`
  margin-top: -5px;
  align-self: flex-start;
`;

interface BookingCardProps {
    guestNumber: number;
    radioHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setMinusIcon: () => void;
    setPlusIcon: () => void;
}

function BookingCard({ guestNumber, radioHandler, setPlusIcon, setMinusIcon }: BookingCardProps) {
    return (
        <fieldset>
            <MakeReservationContainer>
                <Row>
                    <DescriptionReservationMakeText>
                        Hóspedes
                    </DescriptionReservationMakeText>
                    <ClickableIcon
                        onClick={setPlusIcon}
                    >
                        {IconPlus}
                    </ClickableIcon>
                    <DescriptionReservationMakeText>
                        {guestNumber}
                    </DescriptionReservationMakeText>
                    <ClickableIcon
                        onClick={setMinusIcon}
                    >
                        {IconMinus}
                    </ClickableIcon>
                </Row>
                <SizedBoxVertical />
                <DescriptionReservationMakeText>
                    Forma de Pagamento
                </DescriptionReservationMakeText>
                <SizedBoxVertical />
                <RadioLabel>
                    <input
                        type="radio"
                        name="payment"
                        value="Pix"
                        id="pix"
                        onChange={radioHandler}
                    />
                    <DescriptionReservationMakeText>
                        Pix
                    </DescriptionReservationMakeText>
                </RadioLabel>
                <RadioLabel>
                    <input
                        type="radio"
                        name="payment"
                        value="CartaoDeCredito"
                        id="cc"
                        onChange={radioHandler}
                    />
                    <DescriptionReservationMakeText>
                        Cartão de Crédito
                    </DescriptionReservationMakeText>
                </RadioLabel>

                <RadioLabel>
                    <input
                        type="radio"
                        name="payment"
                        value="CartaoDeDebito"
                        id="cd"
                        onChange={radioHandler}
                    />
                    <DescriptionReservationMakeText>
                        Cartão de Débito
                    </DescriptionReservationMakeText>
                </RadioLabel>
                <Row>
                    <Input size="MEDIUM" placeholder="Número do cartão"></Input>
                    <SizedBoxHorizontal />
                    <Input size="SMALL" placeholder="CVV"></Input>
                </Row>
                <SizedBoxVertical />
                <Input size="MEDIUM" placeholder="Validade"></Input>
            </MakeReservationContainer>
        </fieldset>
    );
}

export default BookingCard;