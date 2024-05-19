import styled from "styled-components";
import { accent, lightPrimary, primaryText, baseText } from "./BaseStyle";

const Container = styled.div`
    background-color: ${lightPrimary};
    display: block;
    box-shadow: 0px 2px 4px ${lightPrimary};
    width: 26%;
    margin: auto;
    margin-top: 10%;
    align-items: center;
    border-radius: 55px;
`;
const CloseButton = styled.button`
    width: 25px;
    height: 25px;
    margin-right: 10%;
    margin-left: 90%;
    margin-top: 5%;
    padding: 0px;
    background-color: ${lightPrimary};
    border-radius: 4px;
    cursor: pointer;
    font-size: 15px;
    float: left;
`;
const ButtonContainer = styled.div`
    width: 100%;
    height: 10%;
`;
const ContainerUpHalf = styled.div`
    width: 100%;
    height: 15%;
    margin-right: 5%;
    padding-top: 5%;
`;
const ContainerDownHalf = styled.div`
    width: 100%;
    height: 35%;
    padding-top: 10%;
    padding-bottom: 2%;
    display: flex;
`;
const ContainerDownLeft = styled.div`
    width: 30%;
`;
const ContainerDownRight = styled.div`
    width: 60%;
    margin: auto;
    padding-top: 1%;
`;
const ContainerDownLow = styled.div`
    width: 100%;
    margin: auto;
    margin-top: 5%;
    margin-bottom: 5%;
    display: flex;
    align-items: center;
`;
const Separator1 = styled.div`
    background-color: ${accent};
    height: 1px;
    opacity: 0.6;
    width: 50%;
    margin: auto;
    margin-top: 8%;
`;
const Separator2 = styled.div`
    background-color: ${accent};
    height: 1px;
    opacity: 0.6;
    width: 75%;
    margin: auto;
`;
const H2Name = styled.h2`
    ${primaryText}
    ${baseText}
    font-size: 24px;
    text-align: center;
`;
const H2Name2 = styled.h2`
    ${primaryText}
    ${baseText}
    font-size: 24px;
    text-align: right;
`;
const WhiteButton1 = styled.button`
    height: 30px;
    ${baseText}
    ${primaryText}
    font-size: 24px;
    border: none;
    margin-left: auto;
    margin-right: auto;
    padding-left: 7%;
    padding-right: 7%;
    background-color: white;
    border-radius: 20px;
    cursor: pointer;
`;
const WhiteButton2 = styled.button`
    height: 30px;
    ${baseText}
    ${primaryText}
    font-size: 24px;
    border: none;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 6%;
    padding-left: 2%;
    padding-right: 2%;
    background-color: white;
    border-radius: 20px;
    cursor: pointer;
`;
const Email = styled.input`
    height: 24px;
    width: 65%;
    margin-bottom: 3%;
`;
const Passward = styled.input`
    height: 24px;
    width: 65%;
    margin-top: 3%;
`;
function ShowPassword() {
    let check = document.getElementById("check") as HTMLInputElement;
    let pass = document.getElementById("password") as HTMLInputElement;
    let isChecked = check.checked;
    if (isChecked) pass.type = "text";
    else pass.type = "password";
}

function EnterButton() {
    console.log("Enter Button was pressed");
}

function RegistrButton() {
    console.log("Registration Button was pressed");
}

function ClosedButton() {
    console.log("Closed Button was pressed");
}

function EnterProfile() {
    return (
        <Container>
            <ButtonContainer>
                <CloseButton onClick={ClosedButton}>✖</CloseButton>
            </ButtonContainer>
            <ContainerUpHalf>
                <Separator1 />
                <H2Name>Вход в профиль</H2Name>
                <Separator2 />
            </ContainerUpHalf>
            <ContainerDownHalf>
                <ContainerDownLeft>
                    <H2Name2>Логин:</H2Name2>
                    <H2Name2>Пароль:</H2Name2>
                </ContainerDownLeft>
                <ContainerDownRight>
                    <Email placeholder="электронная почта" />
                    <Passward
                        placeholder="пароль"
                        type="password"
                        id="password"
                    />
                    <input type="checkbox" id="check" onClick={ShowPassword} />
                    Показать
                </ContainerDownRight>
            </ContainerDownHalf>
            <ContainerDownLow>
                <WhiteButton1 onClick={EnterButton}>Войти</WhiteButton1>
            </ContainerDownLow>
            <ContainerDownLow>
                <WhiteButton2 onClick={RegistrButton}>
                    Зарегистрироваться
                </WhiteButton2>
            </ContainerDownLow>
        </Container>
    );
}

export default EnterProfile;
