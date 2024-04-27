import styled from "styled-components"
import {lightPrimary} from "./BaseStyle"
import {primaryText} from "./BaseStyle"
import {secondaryText} from "./BaseStyle"
import {baseText} from "./BaseStyle"
//import starIcon from '../ico/star72.png'
export interface HotelInfoProps{
    name: string,    
    id: number,
    aboutHotel: string,
    address: string,
    rating: number,
    parking: boolean,
    nutrition: boolean,
    wifi: boolean,
    link:string,
    onHotelClicked: (aboutHotel: string) => void,
}

export function HotelInfoCard(props: HotelInfoProps){
    return(<Container>        
        <ContainerHalf>
            <H1Name>{props.name}</H1Name>
            <H2Name>Об отеле</H2Name>
            <Text>{props.aboutHotel}</Text>
            <ButtonInf onClick={()=>props.onHotelClicked(props.aboutHotel)}>Подробнее</ButtonInf>
        </ContainerHalf>
        <ContainerHalf>
            <ContainerRowRight>
                <H2Name>{props.rating}</H2Name>
                <Ico
                    //src={StarIcon}
                    src='star.ico'
                    alt='Star'
                />
            </ContainerRowRight>
            <ContainerVertical>                
                <ContainerRow>                    
                    <Ico 
                        src='address.ico'
                        alt='addreass'
                    />
                    <PName>{props.address}</PName>
                </ContainerRow>
                { props.parking &&
                <ContainerRow>
                    <Ico 
                        src='parking.ico'
                        alt='parking'
                    />
                    <PName>Парковка</PName>
                </ContainerRow>}
                {props.nutrition&&
                <ContainerRow>
                    <Ico
                        src='nutrition.ico'
                        alt='nutrition'
                    />
                    <PName>Питание</PName>
                </ContainerRow>}
                {props.wifi&&
                <ContainerRow>
                    <Ico 
                        src='wifi.ico'
                        alt='wifi'
                    />
                    <PName>Wi-Fi на территории отеля</PName>
                </ContainerRow>}
                <ContainerRow>
                    <Ico
                        src='link.ico'
                        alt='link'
                    />
                    <Link href ={props.link} >ссылка на сайт отеля</Link>
                </ContainerRow>
            </ContainerVertical>
        </ContainerHalf>
    </Container>
    )
}

export const cardText = `
    color: #4A4848;
`
const H1Name = styled.h1`
    ${primaryText}
    ${baseText}
    font-size: 36px;
    weight: 508px;
`
const H2Name = styled.h2`
    ${secondaryText}
    ${baseText}
    font-size: 24px;
`
const PName = styled.h2`
    ${secondaryText}
    ${baseText}
    font-size: 18px;
`
const Text = styled.p`
    ${primaryText}
    ${baseText}
    font-size: 18px;    
    text-align: justify;
    display: -webkit-box;
    -webkit-line-clamp: 16;
    -webkit-box-orient: vertical;
    overflow:hidden;
`
const ButtonInf = styled.button`
    ${secondaryText}
    ${baseText}
    font-size: 24px;
    background-color: ${lightPrimary};   
    box-shadow: 0px 2px 4px ${lightPrimary};
    border: 0px;
    margin-bottom:3%;
` 
const Container = styled.div`
    display: flex;
    padding-left: 3%;
    box-shadow: 0px 2px 4px ${lightPrimary};
    width: 60%;      
    margin:auto;  
    margin-top:5%;
    margin-bottom:5%;
    
`

const ContainerHalf = styled.div`    
    width: 50%;
    height: 100%;    
    margin-right: 5%;
`
const ContainerRow = styled.div`
    display: flex;  
    margin-top:5%;
    margin-bottom:5%;
    align-items: center;  
`
const ContainerRowRight = styled.div`
    display: flex;  
    justify-content: flex-end  ;
    margin-top:5%;
    margin-bottom:5%;
    align-items: center;
    height: 20%;
`
const ContainerVertical = styled.div`
    
    height: 65%;
    align-items: center;
`

const Ico = styled.img`
    width: 40px;
    height: 40px;
    margin-right:5%;
    margin-left:5%;
    background-color: ${lightPrimary};
`
const Link  = styled.a`
    text-decoration:none;
    ${secondaryText}
    ${baseText}
    font-size: 18px;
    
`
