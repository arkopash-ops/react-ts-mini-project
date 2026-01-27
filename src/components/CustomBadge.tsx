import type { BadgeProps } from "../Interfaces/badgeProps";

export const CustomBadge = ({ children, color = "secondary", pill = false, className = "" }: BadgeProps) => {
    const pillClass = pill ? 'rounded-pill' : '';

    return (
        <span className={`badge text-bg-${color} ${pillClass} ${className}`}>
            {children}
        </span>
    )
}
