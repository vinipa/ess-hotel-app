import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
`;

export const DescriptionTitleText = styled.span`
  color: #717171;
  font-size: 30px;
  align-self: flex-start;
`;

export const PriceText = styled.span`
  color: #717171;
  font-size: 30px;
  font-weight: bold;
`;

export const SizedBoxHorizontal = styled.hr`
  margin-left: 5px;
  margin-right: 5px;
`;

export const SizedBoxVertical = styled.hr`
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const DescriptionIconText = styled.span`
  color: #717171;
  font-size: 24px;
`;

export const ClickableIcon = styled.div`
  cursor: pointer;
  align-self: flex-center;
`;

export const Divider = styled.hr`
  margin: 40px 0;
  border: none;
  border-top: 2px solid #ccc;
  width: 100%; /* Garante que o Divider ocupe toda a largura disponível */
  color: #6e7491;
`;

export const TitleText = styled.span`
  color: #717171;
  font-size: 40px;
`;

export const DescriptionBodyText = styled.span`
  color: #717171;
  font-size: 25px;
  text-align: justify;
  margin-bottom: 20px;
  margin-top: 20px;
`;


