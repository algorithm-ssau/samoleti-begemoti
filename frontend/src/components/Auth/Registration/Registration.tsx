// import type { login } from "samolet-common";
import { useShowPassword } from "../../../hooks/useShowPassword";
import {
    useAppDispatch,
    useAppSelector,
    registerThunk,
} from "../../../store/store";
import RegSuccess from "../../RegistrationSuccess";
import { Block, Button, Container, Input, PasswordCheck, Row } from "./style";
import { useState } from "react";

export function Registration() {
    const dispatch = useAppDispatch();
    const registerRequest = useAppSelector(state => state.requests.register);
    const [passwordInputType, invert, showPassword] = useShowPassword();
    const status = registerRequest.status;
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    return (
        <>
            <Container>
                {/* <FormRow name="Фамилия:" placeHolder="Фамилия" />
                <FormRow name="Имя:" placeHolder="Имя" />
                <FormRow name="Отчество:" placeHolder="Отчество" /> */}
                <FormRow
                    name="Логин:"
                    value={login}
                    placeHolder="Логин"
                    id="login"
                    onChange={handleLoginChange}
                />

                <FormRow
                    name="Пароль:"
                    placeHolder="Пароль"
                    type={passwordInputType}
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
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

                    <Button
                        onClick={() =>
                            dispatch(
                                registerThunk({
                                    login: login,
                                    password: password,
                                }),
                            )
                        }
                    >
                        Зарегистрироваться
                    </Button>
                </Block>
            </Container>
            {(status == "error" || status == "fulfilled") && (
                <Message status={status} />
            )}
        </>
    );
}
export interface MessageProps {
    status: string;
}
export function Message(props: MessageProps) {
    let mainMessage = "";
    let secondaryMessage = "";
    if (props.status == "error") {
        mainMessage = "Ошибка!";
        secondaryMessage = "Пользователь с таким именем уже существует!";
    } else {
        mainMessage = "Регистрация успешно завершена!";
        secondaryMessage =
            "Заполните данные в профиле, чтобы бронировать и совершать покупки!";
    }
    return (
        <RegSuccess
            mainMessage={mainMessage}
            secondaryMessage={secondaryMessage}
        />
    );
}
export interface FormRowProps {
    name: string;
    placeHolder?: string;
    type?: string;
    id?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export function FormRow(props: FormRowProps) {
    return (
        <Row>
            <div>{props.name}</div>
            <Input
                placeholder={props.placeHolder}
                value={props.value}
                type={props.type}
                id={props.id}
                onChange={props.onChange}
            />
        </Row>
    );
}
