import { useState } from "react";

export function useShowPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const passwordInputType = showPassword ? "text" : "password";

    const invert = () => setShowPassword(showPassword => !showPassword);
    return [passwordInputType, invert, showPassword] as const;
}
