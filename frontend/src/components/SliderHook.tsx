import { Slider, type SliderProps } from "@mui/material";
import { Controller, type Control, type FieldValues } from "react-hook-form";

type Props = HookControlledInput<any> & SliderProps;

interface HookControlledInput<T extends FieldValues> {
    control: Control<T, any>;
    namePrefix?: string;
    name: string;
}
export function SliderHook(props: Props) {
    const { control, name, namePrefix, ...sliderProps } = props;

    const prefix = namePrefix ?? "";
    return (
        <Controller
            name={`${prefix}${name}`}
            control={control}
            defaultValue={5.5}
            render={({ field }) => <Slider {...sliderProps} {...field} />}
        />
    );
}
