import { useState } from "react";
import RegSuccess from "../../RegistrationSuccess";
import {
    FormRow,
    ShowPassword,
    type MessageProps,
} from "../Registration/Registration";
import { Block, Button, Container, PasswordCheck } from "../Registration/style";
import {
    loginThunk,
    useAppDispatch,
    useAppSelector,
} from "../../../store/store";

export function Entry() {
    let dispatch = useAppDispatch();
    let loginRequest = useAppSelector(state => state.requests.login);
    let value = loginRequest.value;
    let status = loginRequest.status;
    const [login, SetLogin] = useState("");
    const [password, SetPassword] = useState("");
    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetLogin(e.target.value);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetPassword(e.target.value);
    };
    console.log(status);
    console.log(JSON.stringify(value));

    return (
        <>
            <Container>
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
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <Block>
                    <PasswordCheck>
                        <input
                            type="checkbox"
                            id="check"
                            onClick={ShowPassword}
                        />
                        Показать пароль
                    </PasswordCheck>

                    <Button
                        onClick={() =>
                            dispatch(
                                loginThunk({
                                    login: login,
                                    password: password,
                                }),
                            )
                        }
                    >
                        Войти
                    </Button>
                </Block>
            </Container>
            {(status == "error" || status == "fulfilled") && (
                <Message status={status} />
            )}
        </>
    );
}

export function Message(props: MessageProps) {
    let mainMessage = "";
    let secondaryMessage = "";
    if (props.status == "error") {
        mainMessage = "Ошибка!";
        secondaryMessage = "Неверный логин и/или пароль.";
    } else {
        mainMessage = "Вы авторизированы!";
        secondaryMessage = "Вам доступен личный кабинет.";
    }
    return (
        <RegSuccess
            mainMessage={mainMessage}
            secondaryMessage={secondaryMessage}
        />
    );
}
