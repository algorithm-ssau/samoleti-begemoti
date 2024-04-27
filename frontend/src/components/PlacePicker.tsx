import { useState } from "react";

export type DataType = {
    place: string;
    date: string;
    hours: string;
    minutes: string;
};

type Props = {
    listOfPlaces: string[];
    onSubmit: (data: DataType) => void;
};

type SelectProps = {
    selectList?: string[];
    emptySelectSlot?: string;
    onInput: (data: string) => void;
};

function DateSelect(props: SelectProps) {
    return (
        <input
            type="date"
            onChange={(e) => props.onInput(e.target.value)}
        ></input>
    );
}

function SmartSelect(props: SelectProps) {
    const minSelect = props.selectList?.map((item) => (
        <option key={item}>{item}</option>
    ));
    return (
        <select onChange={(e) => props.onInput(e.target.value)}>
            <option value="" selected disabled hidden>
                {props.emptySelectSlot}
            </option>
            {minSelect}
        </select>
    );
}

export const PlacePicker = (props: Props) => {
    const [place, setPlace] = useState("");
    const [date, setDate] = useState("");
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const hoursList = [
        "00",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
    ];
    const minutesList = ["00", "15", "30", "45"];
    return (
        <div>
            <span>Выбор места: </span>
            <SmartSelect
                selectList={props.listOfPlaces}
                onInput={setPlace}
                emptySelectSlot="место"
            />
            <br />
            <span>Выбор времени: </span>
            <DateSelect onInput={setDate} />
            <SmartSelect
                selectList={hoursList}
                onInput={setHours}
                emptySelectSlot="--"
            />
            <SmartSelect
                selectList={minutesList}
                onInput={setMinutes}
                emptySelectSlot="--"
            />
            <br />
            <button
                onClick={() => {
                    let data = { place, date, hours, minutes };
                    const isFull = Object.values(data).every(
                        (x) => x !== null && x !== "",
                    );
                    if (isFull) props.onSubmit(data);
                    else alert("Заполните все поля");
                }}
            >
                Выбрать
            </button>
        </div>
    );
};
