import { twMerge } from "tailwind-merge";
import type { InputHTMLAttributes } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    registration: UseFormRegisterReturn; // register(...)의 반환값 타입
    error?: FieldError;
}

const Input = ({ className, registration, error, ...props }: InputProps) => {
    return (
        <div className="w-full">
            <input
                className={twMerge(
                    "w-full border border-gray-300 p-4 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-gray-400",
                    error ? "border-red-500 focus:border-red-500" : "",
                    className
                )}
                autoComplete="off"
                {...registration} // 여기서 register의 반환값(ref, onChange, onBlur 등)을 input에 주입
                {...props}
            />
            {error && (
                <p className="text-red-600 text-xs mt-1 pl-1">{error.message}</p>
            )}
        </div>
    );
};

export default Input;