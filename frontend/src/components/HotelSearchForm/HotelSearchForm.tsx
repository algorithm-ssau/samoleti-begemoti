import { useForm, type UseFormRegister } from "react-hook-form";
import { hotelThunks } from "../../store/requests";
import { useAppDispatch } from "../../store/store";
import { hotels } from "../Card";
import {
    ContainerUp,
    ContainerLeftHalf,
    HeadingsContainer,
    H2Headings,
    SelectContainer,
    DataPriceInput,
    CustomSelect,
    ContainerRightHalf,
    ContainerDown,
    H2Filters,
    FindButton,
    Container,
    Checkbox,
} from "./style";

export type HotelSearchFormState = {
    dateFrom: Date;
    dateTo: Date;
    guests: number;
    city: string;
};

const guestAmount = [1, 2, 3, 4, 5, 6, 7, 8];
const guests = guestAmount.map(item => (
    <option key={item} value={item}>
        {item}
    </option>
));

type Props = {
    cities: string[];
    register: UseFormRegister<HotelSearchFormState>;
    onChange?: (form: HotelSearchFormState) => void;
};

export function HotelSearchForm(props: Props) {
    const { cities, register, onChange } = props;
    const dispatch = useAppDispatch();

    return (
        <Container>
            <ContainerUp>
                <ContainerLeftHalf>
                    <HeadingsContainer>
                        <H2Headings>Дата заезда:</H2Headings>
                        <H2Headings>Дата выезда:</H2Headings>
                        <H2Headings>Количество гостей:</H2Headings>
                    </HeadingsContainer>
                    <SelectContainer>
                        <DataPriceInput type="date" {...register("dateFrom")} />
                        <DataPriceInput type="date" {...register("dateTo")} />
                        <CustomSelect {...register("guests")}>
                            <option value="" selected disabled hidden>
                                --
                            </option>
                            {guests}
                        </CustomSelect>
                    </SelectContainer>
                </ContainerLeftHalf>

                <ContainerRightHalf>
                    <HeadingsContainer>
                        <H2Headings>Город:</H2Headings>
                        <H2Headings>Цена от:</H2Headings>
                        <H2Headings>до:</H2Headings>
                    </HeadingsContainer>
                    <SelectContainer>
                        <CustomSelect {...register("city")}>
                            <option value="" selected disabled hidden>
                                --
                            </option>
                            {cities.map(city => (
                                <option value={city} key={city}>
                                    {city}
                                </option>
                            ))}
                        </CustomSelect>
                        <DataPriceInput type="text" placeholder="мало" />
                        <DataPriceInput type="text" placeholder="много" />
                    </SelectContainer>
                </ContainerRightHalf>
            </ContainerUp>
            <ContainerDown>
                <Checkbox type="checkbox" />
                <H2Filters>Парковка</H2Filters>
                <Checkbox type="checkbox" />
                <H2Filters>Питание</H2Filters>
                <Checkbox type="checkbox" />
                <H2Filters>Wi-Fi</H2Filters>

                <FindButton onClick={() => {}}>
                    <H2Headings>Найти</H2Headings>
                </FindButton>
            </ContainerDown>
        </Container>
    );
}
