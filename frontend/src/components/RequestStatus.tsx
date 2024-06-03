import type { RequestState } from "../store/utils/tracker";

interface Props {
    status: RequestState<any, any>["status"];
}

export function RequestStatus(props: Props) {
    const requestStatus = props.status;
    if (requestStatus == "error") {
        return <>грустно получилось</>;
    }
    if (requestStatus != "fulfilled") {
        return <>так, падажжи</>;
    }

    return null;
}
