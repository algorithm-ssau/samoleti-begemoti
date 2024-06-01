import { useEffect, useState } from "react";
import RegSuccess, {
    ContainerDownHalf,
    ContainerUpHalf,
    H2Name,
    H3Name,
    SeparatorLine,
} from "../../RegistrationSuccess";
import { FormRow, type MessageProps } from "../Registration/Registration";
import { Block, Button, Container, PasswordCheck } from "../Registration/style";
import {
    actions,
    loginThunk,
    useAppDispatch,
    useAppSelector,
} from "../../../store/store";
import { useShowPassword } from "../../../hooks/useShowPassword";
import { useNavigate } from "react-router";
import { Dialog } from "@mui/material";
import { NewClose } from "../../Profile/Settings/style";
import CloseIcon from "@mui/icons-material/Close";

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export function Entry() {
    const dispatch = useAppDispatch();
    const { value, status } = useAppSelector(state => state.requests.login);
    const [passwordInputType, invert, showPassword] = useShowPassword();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    console.log(status);
    console.log(JSON.stringify(value));
    const handleLoginChange = (e: InputEvent) => {
        setLogin(e.target.value);
    };
    const handlePasswordChange = (e: InputEvent) => {
        setPassword(e.target.value);
    };
    const navigate = useNavigate();
    if (status == "fulfilled") {
        dispatch(actions.setLogin(true));
        navigate("/profile/settings");
    }
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        if (status == "error") {
            setOpen(true);
        }
    }, [status]);
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
            <Dialog
                fullWidth={true}
                maxWidth={"xs"}
                style={{ padding: 0 }}
                open={open}
                onClose={handleClose}
            >
                <NewClose onClick={handleClose}>
                    <CloseIcon />
                </NewClose>
                <Message status={status} />
            </Dialog>
        </>
    );
}

export function Message(props: MessageProps) {
    let messageTitle = "";
    let description = "";

    if (props.status == "error") {
        messageTitle = "Ошибка!";
        description = "Неверный логин и/или пароль.";
    }
    // else {
    //     messageTitle = "Вы авторизированы!";
    //     description = "Вам доступен личный кабинет.";
    //
    // }

    return (
        <>
            <ContainerUpHalf>
                <H2Name>{messageTitle}</H2Name>
            </ContainerUpHalf>
            <SeparatorLine />
            <ContainerDownHalf>
                <H3Name>{description}</H3Name>
            </ContainerDownHalf>
        </>
        //<RegSuccess mainMessage={messageTitle} secondaryMessage={description} />
    );
}
