import styled from "styled-components"
import {accent, lightPrimary, primaryText, baseText, secondaryText} from "./BaseStyle"

const Container = styled.div`
    display: flex;
    box-shadow: 0px 2px 4px ${lightPrimary};
    width: 55%;      
    margin:auto;  
    margin-top:5%;
    align-items: center;
    border-radius: 5px;
    border-left: solid ${accent} 2px;
    border-top: 0px;
    border-right: 0px;
    border-bottom: 0px;
`
const LeftContainer = styled.div `
    width: 160%;
    margin: 0%;
    margin-left:3%;
`
const LeftUpContainer = styled.div`
    width: 95%;
    display: flex;
    justify-content: flex-end;
`
const LeftDownContainer = styled.div`
    width:100%;
    margin:0%;
    margin-bottom: 5%;
`
const RightContainer = styled.div `
    margin: 0%;
    display: flex;
    align-items: center;
`
const Text = styled.p`
    ${primaryText}
    ${baseText}
    font-size: 16px;    
    text-align: justify;
    word-break: normal;
    margin: 2%;

`
const H2Name = styled.h2`
    ${secondaryText}
    ${baseText}
    font-size: 24px;
    margin: 0%;
    margin-left: 5%;
    text-align: left;
`
const H2Name2 = styled.h2`
    ${secondaryText}
    ${baseText}
    font-size: 18px;
    margin: 0%;
    margin-left: 5%;
    text-align: left;
`

const Photo = styled.img`
    width: 280px;
    height: 220px;
    margin: auto;
    margin-left: auto;
    margin-right: auto;
`
const StarPic = styled.img`
    width: 25px;
    height: 25px;
    vertical-align: middle;
    margin: auto;
`
const LeftArrow = styled.button`
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-right: 15px solid ${accent};
    background: white;
    border-left: none;
    display: inline-block;
    position: relative;
    cursor: pointer;
    outline: none;
    margin-right: 2%;
`
const RightArrow = styled.button`
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-right: none;
    background: white;
    border-left: 15px solid ${accent};
    cursor: pointer;
    outline: none;
    margin-left: 2%;
`
function LeftArrowClick() {
    alert("Left Arrow was pressed")
}
function RightArrowClick() {
    alert("Right Arrow was pressed")
}
function RoomReview() {
  return (
    <Container>
        <LeftContainer>
            <LeftUpContainer>
                <H2Name>7.5 <StarPic src='' /> </H2Name>
            </LeftUpContainer>
            <LeftDownContainer>
                <H2Name2>Понравилось:</H2Name2>
                <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Eveniet ratione voluptatibus ipsum rem deserunt, voluptas doloribus ab modi ad rerum. 
                    In possimus quam rem, dolorem explicabo quas a. Iure, quis? Фото просто для примера</Text>
                <H2Name2>Не понравилось:</H2Name2>
                <Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas fugiat quidem a magni saepe aut dicta quo distinctio maxime aliquid, 
                    repellendus laborum aspernatur sequi voluptas similique esse earum impedit aperiam! Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Nam exercitationem harum ad cupiditate impedit asperiores quo eaque! 
                    Veniam rerum assumenda iure harum quisquam. Fugiat nulla non iusto voluptatum eum perspiciatis?</Text>
            </LeftDownContainer>
        </LeftContainer>
        <RightContainer>
            <LeftArrow onClick={LeftArrowClick} />
            <Photo src='' alt="photos"/>
            <RightArrow onClick={RightArrowClick} />
        </RightContainer>
    </Container>   
  )
}

export default RoomReview
