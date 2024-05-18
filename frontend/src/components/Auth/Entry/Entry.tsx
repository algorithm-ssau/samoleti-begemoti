import { useState } from "react";
import RegSuccess from "../../RegistrationSuccess";
import { FormRow, type MessageProps } from "../Registration/Registration";
import { Block, Button, Container, PasswordCheck } from "../Registration/style";
import {
    loginThunk,
    useAppDispatch,
    useAppSelector,
} from "../../../store/store";
import { useShowPassword } from "../../../hooks/useShowPassword";

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export function Entry() {
    const dispatch = useAppDispatch();
    const { value, status } = useAppSelector(state => state.requests.login);
    const [passwordInputType, invert, showPassword] = useShowPassword();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginChange = (e: InputEvent) => {
        setLogin(e.target.value);
    };
    const handlePasswordChange = (e: InputEvent) => {
        setPassword(e.target.value);
    };

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
    let messageTitle = "";
    let description = "";

    if (props.status == "error") {
        messageTitle = "Ошибка!";
        description = "Неверный логин и/или пароль.";
    } else {
        messageTitle = "Вы авторизированы!";
        description = "Вам доступен личный кабинет.";
    }

    return (
        <RegSuccess mainMessage={messageTitle} secondaryMessage={description} />
    );
}
