import { useRequest } from "../../store/store";

interface Props {}

export function UsersPage(props: Props) {
    const { status, value } = useRequest(requests => requests.users);
    if (status == "fulfilled") {
        const values = value.map(user => user._id);
    }
    const first = value?.[0];
    return (
        <div>
            <div>user #1</div>
            {status} {value?.length}
            <div>
                <div>{first?._id}</div>
                <div>{first?.email}</div>
                <div>{first?.info?.name}</div>
                <div>{first?.reviews?.length}</div>
                <div>{first?.passwordHash}</div>
            </div>
        </div>
    );
}
