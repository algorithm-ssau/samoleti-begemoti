import styled from "styled-components"
import {lightPrimary, primaryText, secondaryText, baseText} from "./BaseStyle"

const Container = styled.div`
    display: block;
    box-shadow: 0px 2px 4px ${lightPrimary};
    width: 30%;      
    margin:auto;  
    margin-top:5%;
    align-items: center;
    border-radius: 30px;
`
const CloseButton = styled.button `
    width: 25px;
    height: 25px;
    margin-right: 10%;
    margin-left: 90%;
    margin-top: 5%;
    margin-bottom: 2%;
    padding: 0px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 15px;
    float: left;
    padding-bottom: 0%
`
const ButtonContainer = styled.div `
    height: 10%;
    margin-bottom: 5%;
`
const SeparatorLine = styled.div `
    background-color: ${lightPrimary};
    height: 1px;
    opacity: 0.6;
    width: 85%;
    margin: auto;
`
const ContainerComment = styled.div `
    width: 100%;
    height: 20%;
    margin: auto;
`
const ContainerLoad = styled.div `
    margin: auto;
    height: 100%;
    margin-top: 10%;
    overflow: hidden;
    display: block;
    align-items: center;
`
const TextArea = styled.textarea`
    margin-left: 10%;
    width: 80%;
    height: 100%;
    border: 0px;
    resize: none;
    padding-bottom: 5%;
`
const H2Name = styled.h2`
    ${primaryText}
    ${baseText}
    font-size: 18px;
    margin-left: 5%;
    text-align: left;
`
const H3Name = styled.h3`
    ${secondaryText}
    ${baseText}
    font-size: 18px;
    text-align: center;
    margin-top: 0%;
    margin-bottom: 7%;
`
const SendReviewButton = styled.button`
    color: white;    
    ${baseText}
    font-size: 16px;
    display: block;
    background-color: ${lightPrimary};   
    box-shadow: 0px 2px 4px ${lightPrimary};
    width: 130px;
    margin: auto;
    margin-bottom: 5%;
    padding-top: 1%;
    padding-bottom: 1%;
    padding-left: 5%;
    padding-right: 5%;
    border-radius: 25px;
    border: 0px;
    cursor: pointer;

`
const SelectRate = styled.select `
    border: 0px;
    font-size: 18px;
    cursor: pointer;
    ${secondaryText}
    ${baseText}
`
const Pic = styled.img`
    width: 20px;
    height: 20px;
    margin-left: 1%;
    position: absolute;
`
const AddPhotoPicButton = styled.button`
    background-image: url() no-repeat;
    background-size: cover;
    width: 40px;
    height: 40px;
    cursor: pointer;
    vertical-align: middle;
    margin-left: 2%;
    border: none;
`
function ClosedButton() {
    console.log("Closed Button was pressed")
}

function SendReview () {
    console.log("SendReview Button was pressed")
}

function AddReview() {
    const rateList = [0.5, 1, 1.5, 2, 2.5, 3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10]
    const rating = rateList.map(item => <option key={item}>{item}</option>)
  return (
    <Container>
            <ButtonContainer>
                <CloseButton onClick={ClosedButton}>✖</CloseButton>
            </ButtonContainer>
            <ContainerComment>
                <H2Name>Понравилось:</H2Name>
                <TextArea placeholder='Комментарий'></TextArea>
            </ContainerComment>
            <SeparatorLine/>
            <ContainerComment>
                <H2Name>Не понравилось:</H2Name>
                <TextArea placeholder='Комментарий'></TextArea>
            </ContainerComment>
            <SeparatorLine/>
            <ContainerLoad>
                <H3Name>Загрузить фото:
                    <AddPhotoPicButton/>
                </H3Name>
                <H3Name>Оценка:                 
                    <SelectRate>
                        {rating}
                    </SelectRate> / 10
                    <Pic src=''/>
                </H3Name>
                <SendReviewButton onClick={SendReview}>Оставить отзыв</SendReviewButton>
            </ContainerLoad>
        </Container>   
  )
}

export default AddReview
