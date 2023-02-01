interface IProps {
    label: string;
    className?: string;
    onClick: () => void;
}

export const Button: React.FC<IProps> = ({ label, onClick }) => {
    return (
        <button
            type="button"
            className="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={onClick}
        >
            {label}
        </button>
    );
};
