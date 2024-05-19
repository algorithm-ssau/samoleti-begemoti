import { purple } from "@mui/material/colors";
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
    IcoMui,
    Link,
    PName,
    Text,
} from "./style";
import StarRateIcon from "@mui/icons-material/StarRate";
import { LocalParking, Place, Restaurant, Wifi } from "@mui/icons-material";

import LinkIcon from "@mui/icons-material/Link";
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
                    <IcoMui>
                        <StarRateIcon
                            sx={{ fontSize: 40, color: purple["A200"] }}
                        />
                    </IcoMui>
                </ContainerRowRight>
                <ContainerVertical>
                    <ContainerRow>
                        <Place sx={{ fontSize: 50 }} />
                        <PName>{props.address}</PName>
                    </ContainerRow>
                    {props.parking && (
                        <ContainerRow>
                            <LocalParking sx={{ fontSize: 50 }} />
                            <PName>Парковка</PName>
                        </ContainerRow>
                    )}
                    {props.nutrition && (
                        <ContainerRow>
                            <Restaurant sx={{ fontSize: 50 }} />
                            <PName>Питание</PName>
                        </ContainerRow>
                    )}
                    {props.wifi && (
                        <ContainerRow>
                            <Wifi sx={{ fontSize: 50 }} />
                            <PName>Wi-Fi на территории отеля</PName>
                        </ContainerRow>
                    )}
                    <ContainerRow>
                        <LinkIcon sx={{ fontSize: 50 }} />
                        <Link href={props.link}>ссылка на сайт отеля</Link>
                    </ContainerRow>
                </ContainerVertical>
            </ContainerHalf>
        </Container>
    );
}
