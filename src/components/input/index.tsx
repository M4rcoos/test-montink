import type { FieldError, UseFormRegister, FieldValues, Path } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface InputProps<T extends FieldValues> {
    register: UseFormRegister<T>;
    name: Path<T>;
    placeholder: string;
    errors?: FieldError;
    type?: string;
    className?: string;
}

export const InputComponent = <T extends FieldValues>({
    register,
    name,
    placeholder,
    errors,
    type = "text",
    className,
}: InputProps<T>) => {
    return (
        <div className="flex flex-col w-full">
            <input
                type={type}
                placeholder={placeholder}
                {...register(name)}
                className={twMerge(
                    "border rounded p-2 placeholder:text-base_label placeholder:text-text-s flex flex-col outline-none w-full",
                    errors && "border-red-500",
                    !errors && "border-gray-300",
                    className
                )}
            />
            {errors?.message && (
                <span className="text-red-500 text-sm">{errors.message}</span>
            )}
        </div>

    );
};
