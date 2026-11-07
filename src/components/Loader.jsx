import "../styles/loader.css";

export default function Loader({ text = "Питаємо в небесної канцелярії..." }) {
    return (
        <div className="loader" role="status" aria-live="polite">
            <div className="loader__spinner" />
            <p className="loader__text">{text}</p>
        </div>
    );
}