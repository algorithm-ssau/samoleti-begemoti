import { useNavigate } from "react-router-dom";
import {
    actions,
    getTokenThunk,
    useAppDispatch,
    useAppSelector,
} from "../../../store/store";
import { network } from "../../..";
import { ProfileButton } from "./style";
import { ContainerChapter, Line, Text } from "../Cash/style";
import {
    Block,
    Button,
    Container,
    PasswordCheck,
} from "../../Auth/Registration/style";
import {
    FormRow,
    type MessageProps,
} from "../../Auth/Registration/Registration";
import RegSuccess from "../../RegistrationSuccess";
import { useShowPassword } from "../../../hooks/useShowPassword";
import { useEffect, useState } from "react";
import {
    getUserPersonalInfoThunk,
    updatePasswordThunk,
    updatePersonalInfoThunk,
} from "../../../store/requestThunks";

type InputEvent = React.ChangeEvent<HTMLInputElement>;
export function exit() {}
export function DataPersonal() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const upvalue = useAppSelector(state => state.requests.updatePersonalInfo);

    console.log(upvalue);
    const personalInfo = useAppSelector(
        state => state.requests.getUserPersonalInfo,
    );
    useEffect(() => {
        dispatch(getUserPersonalInfoThunk());
    }, []);
    const [passwordInputType, invert, showPassword] = useShowPassword();
    const [surname, setSurname] = useState("");
    const [name, setName] = useState("");
    const [cardNumber, setCardNumber] = useState(0);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const value = personalInfo.value!;
    useEffect(() => {
        if (value != null) {
            if (value.surname) setSurname(value.surname);
            if (value.name) setName(value.name);
            if (value.cardNumber) setCardNumber(value.cardNumber);
        }
    }, [value]);
    const handleSurnameChange = (e: InputEvent) => {
        setSurname(e.target.value);
    };
    const handlNameChange = (e: InputEvent) => {
        setName(e.target.value);
    };
    const handlCardNumberChange = (e: InputEvent) => {
        setCardNumber(Number(e.target.value));
    };
    const handleOldPasswordChange = (e: InputEvent) => {
        setOldPassword(e.target.value);
    };
    const handleNewPasswordChange = (e: InputEvent) => {
        setNewPassword(e.target.value);
    };
    return (
        <>
            <ContainerChapter>
                <Text>Аккаунт</Text>
                <Line />
            </ContainerChapter>
            <Container>
                <FormRow
                    name="Фамилия:"
                    value={surname}
                    placeHolder="Фамилия"
                    id="surname"
                    onChange={handleSurnameChange}
                />

                <FormRow
                    name="Имя:"
                    placeHolder="Имя"
                    id="name"
                    value={name}
                    onChange={handlNameChange}
                />
            </Container>
            <ContainerChapter>
                <Text>Счет</Text>
                <Line />
            </ContainerChapter>
            <Container>
                <FormRow
                    name="Номер счета:"
                    value={cardNumber.toString()}
                    placeHolder="2222 2222 2222"
                    id="cardNumber"
                    onChange={handlCardNumberChange}
                />
            </Container>
            <ProfileButton
                onClick={() =>
                    dispatch(
                        updatePersonalInfoThunk({
                            name,
                            surname,
                            cardNumber,
                        }),
                    )
                }
            >
                Сохранить
            </ProfileButton>
            <ContainerChapter>
                <Text>Данные для входа</Text>
                <Line />
            </ContainerChapter>
            <Container>
                <FormRow
                    name="Старый пароль:"
                    value={oldPassword}
                    type={passwordInputType}
                    placeHolder="Старый пароль"
                    id="oldPassword"
                    onChange={handleOldPasswordChange}
                />

                <FormRow
                    name="Новый пароль:"
                    placeHolder="Новый пароль"
                    type={passwordInputType}
                    id="newPassword"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                />
                <Block>
                    <PasswordCheck>
                        <input
                            type="checkbox"
                            id="check"
                            checked={showPassword}
                            onClick={invert}
                        />
                        Показать пароль
                    </PasswordCheck>
                </Block>
            </Container>
            <ProfileButton
                onClick={() =>
                    dispatch(
                        updatePasswordThunk({
                            oldPassword,
                            newPassword,
                        }),
                    )
                }
            >
                Сохранить
            </ProfileButton>
            <ProfileButton
                onClick={() => {
                    navigate("/auth/entry");
                    network.setToken("");
                    dispatch(actions.setLogin(false));
                    dispatch(actions.reset());
                }}
            >
                Выйти
            </ProfileButton>

            {/* {(upvalue.status == "error" || upvalue.status == "fulfilled") && (
                <Message status={upvalue.status} />
            )} */}
        </>
    );
}
export function Message(props: MessageProps) {
    let messageTitle = "";
    let description = "";

    if (props.status == "error") {
        messageTitle = "Ошибка!";
        description = "Не возможно обновить данные";
    } else {
        messageTitle = "Данные изменены!";
        description = "Профиль обновлен";
    }

    return (
        <RegSuccess mainMessage={messageTitle} secondaryMessage={description} />
    );
}
