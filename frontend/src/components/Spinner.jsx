export default function Spinner({ size = 20 }) {
    return (
        <div
            className="border-2 border-white border-t-transparent rounded-full animate-spin"
            style={{ width: size, height: size }}
        />
    );
}
