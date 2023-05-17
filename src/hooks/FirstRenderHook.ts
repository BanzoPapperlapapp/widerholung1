import {useRef} from "react";

export const FirstRenderHook = ():boolean => {
    const isFirst = useRef(true)

    if (isFirst.current) {
        isFirst.current = false

        return true
    }

    return isFirst.current
};
