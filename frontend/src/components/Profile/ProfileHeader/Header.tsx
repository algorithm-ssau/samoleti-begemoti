import { Outlet, Route, Routes } from "react-router";
import { Button, Container } from "./style";
import { Cash } from "../Cash/Cash";
import { Booking } from "../Booking/Booking";
import NotFoundPage from "../../../routes/component/NotFoundPage";
import { NavLink } from "react-router-dom";
interface ProfileHeaderProps {
    onPersonalDataClicked: () => void;
    onBookingClicked: () => void;
    onTicketsClicked: () => void;
    onCashClicked: () => void;
}

export function ProfileHeader(props: ProfileHeaderProps) {
    return (
        <>
            <Container>
                <NavLink to="setting">
                    <Button onClick={() => props.onPersonalDataClicked()}>
                        Личнные данные
                    </Button>
                </NavLink>
                <NavLink to="booking">
                    <Button onClick={() => props.onBookingClicked()}>
                        Бронь
                    </Button>
                </NavLink>
                <NavLink to="setting">
                    <Button onClick={() => props.onTicketsClicked()}>
                        Билеты
                    </Button>
                </NavLink>
                <NavLink to="cash">
                    <Button onClick={() => props.onCashClicked()}>
                        Кошелек
                    </Button>
                </NavLink>
            </Container>
            <Routes>
                <Route path="cash" element={<Cash money={100000} />} />
                <Route path="booking" element={<Booking />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Outlet />
        </>
    );
}
