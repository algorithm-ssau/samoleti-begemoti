import {
    ButtonInf,
    Container,
    ContainerHalf,
    ContainerRow,
    ContainerRowRight,
    ContainerVertical,
    H1Name,
    H2Name,
    Ico,
    Link,
    PName,
    Text,
} from "./style";

//import starIcon from '../ico/star72.png'
export interface HotelInfoProps {
    name: string;
    id: number;
    aboutHotel: string;
    address: string;
    rating: number;
    parking: boolean;
    nutrition: boolean;
    wifi: boolean;
    link: string;
    onHotelClicked: (aboutHotel: string) => void;
}

export function HotelInfoCard(props: HotelInfoProps) {
    return (
        <Container>
            <ContainerHalf>
                <H1Name>{props.name}</H1Name>
                <H2Name>Об отеле</H2Name>
                <Text>{props.aboutHotel}</Text>
                <ButtonInf
                    onClick={() => props.onHotelClicked(props.aboutHotel)}
                >
                    Подробнее
                </ButtonInf>
            </ContainerHalf>
            <ContainerHalf>
                <ContainerRowRight>
                    <H2Name>{props.rating}</H2Name>
                    <Ico
                        //src={StarIcon}
                        src="star.ico"
                        alt="Star"
                    />
                </ContainerRowRight>
                <ContainerVertical>
                    <ContainerRow>
                        <Ico src="address.ico" alt="addreass" />
                        <PName>{props.address}</PName>
                    </ContainerRow>
                    {props.parking && (
                        <ContainerRow>
                            <Ico src="parking.ico" alt="parking" />
                            <PName>Парковка</PName>
                        </ContainerRow>
                    )}
                    {props.nutrition && (
                        <ContainerRow>
                            <Ico src="nutrition.ico" alt="nutrition" />
                            <PName>Питание</PName>
                        </ContainerRow>
                    )}
                    {props.wifi && (
                        <ContainerRow>
                            <Ico src="wifi.ico" alt="wifi" />
                            <PName>Wi-Fi на территории отеля</PName>
                        </ContainerRow>
                    )}
                    <ContainerRow>
                        <Ico src="link.ico" alt="link" />
                        <Link href={props.link}>ссылка на сайт отеля</Link>
                    </ContainerRow>
                </ContainerVertical>
            </ContainerHalf>
        </Container>
    );
}
