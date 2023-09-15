import {useEffect} from "react";

export function useKey(key, action) {

    useEffect(function () {
        function keyPressedRemove (e) {
            if (e.code.toLowerCase() === key.toLowerCase()) {
                action();
            }
        }

        document.addEventListener("keydown", keyPressedRemove);

        return function () {
            document.removeEventListener("keydown", keyPressedRemove);
        }
    }, [action, key])
}