// import type { login } from "samolet-common";
import { Dialog } from "@mui/material";
import { useShowPassword } from "../../../hooks/useShowPassword";
import {
    authThunks,
    useAppDispatch,
    useAppSelector,
} from "../../../store/store";
import {
    ContainerDownHalf,
    ContainerUpHalf,
    H2Name,
    H3Name,
    SeparatorLine,
} from "../../RegistrationSuccess";
import { Block, Button, Container, Input, PasswordCheck, Row } from "./style";
import { useEffect, useState } from "react";
import { NewClose } from "../../Profile/Settings/style";
import CloseIcon from "@mui/icons-material/Close";

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
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        if (status == "error" || status == "fulfilled") {
            setOpen(true);
        }
    }, [status]);
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
                                authThunks.register({
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
        // <RegSuccess
        //     mainMessage={mainMessage}
        //     secondaryMessage={secondaryMessage}
        // />
        <>
            <ContainerUpHalf>
                <H2Name>{mainMessage}</H2Name>
            </ContainerUpHalf>
            <SeparatorLine />
            <ContainerDownHalf>
                <H3Name>{secondaryMessage}</H3Name>
            </ContainerDownHalf>
        </>
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
