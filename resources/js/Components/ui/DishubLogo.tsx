import React from 'react';

interface DishubLogoProps {
    className?: string;
}

export const DishubLogo: React.FC<DishubLogoProps> = ({ className = 'w-9 h-9' }) => {
    return (
        <svg
            viewBox="0 0 250 285"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M125 7C59.8 7 7 59.8 7 125c0 38.6 18.5 72.8 47.3 94.6l.3.2 70.4 60.2 70.4-60.2.3-.2c28.8-21.8 47.3-56 47.3-94.6 0-65.2-52.8-118-118-118z"
                fill="#242875"
                stroke="#F9B200"
                strokeWidth="11"
            />
            <path
                d="M125 18c59.1 0 107 47.9 107 107 0 35.1-16.9 66.2-43.1 85.8L125 266l-63.9-55.2C34.9 191.2 18 160.1 18 125 18 65.9 65.9 18 125 18z"
                fill="#242875"
            />
            <circle cx="125" cy="125" r="105" stroke="#F9B200" strokeWidth="6" />
            <path d="M20 125h210M125 20v210" stroke="#F9B200" strokeWidth="6" />
            <ellipse cx="125" cy="125" rx="55" ry="105" stroke="#F9B200" strokeWidth="6" />
            <path
                d="M232 125h-107v62c0 14-11 25-25 25h-5c-14 0-25-11-25-25v-27l-53-35h103l25 25h40l-25-25h47z"
                fill="#242875"
            />
            <path
                d="M20 125c35 25 75 35 105 35v-35H20z"
                fill="#FFFFFF"
            />
            <path
                d="M125 125v70c0 16.5 13.5 30 30 30h10l-40 40v-70c0-16.5-13.5-30-30-30h30z"
                fill="#F9B200"
            />
            <circle cx="145" cy="145" r="4" fill="#FFFFFF" />
            <path
                d="M125 240l15-12 10 5 12-14 11 3 8-17 12 1 5-18 12-2 1-19 12-4-2-19 11-7-5-18 9-9-9-17 7-12-12-14 5-14-15-10 2-15-17-7"
                stroke="#F9B200"
                strokeWidth="10"
                strokeLinecap="round"
                fill="none"
            />
        </svg>
    );
};