import { Notification } from "../Notification";

interface IProps {
    messages: string[];
    onClose: (index: number) => void;
}

export const NotificationsContainer: React.FC<IProps> = ({
    messages,
    onClose,
}) => {
    return (
        <div className="absolute top-3 right-3 z-10">
            {messages.map((message, i) => (
                <Notification
                    key={message}
                    message={message}
                    onClose={() => onClose(i)}
                />
            ))}
        </div>
    );
};
