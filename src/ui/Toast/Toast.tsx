import React, { useEffect, useState, useRef } from "react";
import "./Toast.css";

interface ToastProps {
    message: string;
    type?: "success" | "error" | "info";
    duration?: number;
    onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({
    message,
    type = "info",
    duration = 3000,
    onClose,
}) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [progress, setProgress] = useState(100);
    const timerRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(Date.now());
    const remainingTimeRef = useRef<number>(duration);

    useEffect(() => {
        if (!isHovered) {
            timerRef.current = window.setInterval(() => {
                const elapsed = Date.now() - startTimeRef.current;
                const remaining = duration - elapsed;
                if (remaining <= 0) {
                    setIsVisible(false);
                    if (onClose) onClose();
                    if (timerRef.current) clearInterval(timerRef.current);
                } else {
                    setProgress((remaining / duration) * 100);
                }
            }, 50);
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                remainingTimeRef.current = duration * (progress / 100);
                startTimeRef.current = Date.now();
            }
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isHovered, duration, onClose, progress]);

    if (!isVisible) return null;

    return (
        <div
            className={`toast toast-${type}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                startTimeRef.current = Date.now();
            }}
        >
            <div className="toast-content">
                <span>{message}</span>
                <button
                    onClick={() => {
                        setIsVisible(false);
                        if (onClose) onClose();
                    }}
                    className="toast-close"
                >
                    ×
                </button>
            </div>
            <div
                className="toast-progress"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};

export default Toast;
