import styled from "styled-components";
import {
    accent,
    lightPrimary,
    primaryText,
    secondaryText,
    baseText,
} from "./BaseStyle";

const Container = styled.div`
    background-color: ${lightPrimary};
    display: block;
    box-shadow: 0px 2px 4px ${lightPrimary};
    width: 40%;
    margin: auto;
    align-items: center;
    border-radius: 30px;
    border: 0px;
    margin-top: 0%;
`;
const CloseButton = styled.button`
    width: 25px;
    height: 25px;
    margin-left: 93%;
    margin-top: 3%;
    padding: 0px;
    background-color: ${lightPrimary};
    border-radius: 4px;
    cursor: pointer;
    font-size: 15px;
    padding-bottom: 0%;
`;
const ButtonContainer = styled.div`
    width: 100%;
    height: 5%;
`;
const ContainerUpHalf = styled.div`
    width: 100%;
    margin-top: 10%;
`;
const ContainerDownHalf = styled.div`
    width: 100%;
    margin-top: 5%;
    padding-bottom: 10%;
`;
const SeparatorLine = styled.div`
    background-color: ${accent};
    height: 1px;
    opacity: 0.6;
    width: 75%;
    margin-left: auto;
    margin-right: auto;
`;
const H2Name = styled.h2`
    ${primaryText}
    ${baseText}
    font-size: 24px;
    text-align: center;
`;
const H3Name = styled.h3`
    ${secondaryText}
    ${baseText}
    font-size: 24px;
    text-align: center;
    padding-left: 20%;
    padding-right: 20%;
`;

function ClosedButton() {
    console.log("Closed button was pressed");
}

function RegSuccess() {
    return (
        <Container>
            <ButtonContainer>
                <CloseButton onClick={ClosedButton}>✖</CloseButton>
            </ButtonContainer>
            <ContainerUpHalf>
                <H2Name>Регистрация успешно завершена!</H2Name>
            </ContainerUpHalf>
            <SeparatorLine />
            <ContainerDownHalf>
                <H3Name>
                    Заполните данные в профиле, чтобы бронировать и совершать
                    покупки!
                </H3Name>
            </ContainerDownHalf>
        </Container>
    );
}

export default RegSuccess;
