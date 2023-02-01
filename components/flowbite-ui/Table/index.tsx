interface IProps {
    items: {
        key: string | number;
        value: string | number;
        createdDate: Date;
    }[];
}

export const Table: React.FC<IProps> = ({ items }) => (
    <div className="relative overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Key
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Value
                    </th>
                </tr>
            </thead>
            <tbody>
                {items.map(({ key, value, createdDate }) => (
                    <tr
                        className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                        key={key}
                    >
                        <th
                            scope="row"
                            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                        >
                            {key}
                        </th>
                        <td className="px-6 py-4">{value}</td>
                        <td className="px-6 py-4">{createdDate.toString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
