import { useState } from "react";

interface Toast {
    id: number;
    message: string;
    type: "success" | "error" | "info";
}

const useToast = () => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = (message: string, type: "success" | "error" | "info") => {
        const id = Date.now();

        setToasts([...toasts, { id, message, type }]);
    };

    const removeToast = (id: number) => {
        setToasts(toasts.filter((toast) => toast.id !== id));
    };

    return { toasts, addToast, removeToast };
};

export default useToast;
