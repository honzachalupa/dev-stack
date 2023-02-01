export const TidioChat: React.FC = () => {
    const token = process.env.NEXT_PUBLIC_TIDIO_TOKEN;

    return token ? (
        <script src={`//code.tidio.co/${token}.js`} async></script>
    ) : null;
};
