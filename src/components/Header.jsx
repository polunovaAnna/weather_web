import { useAuth } from "../auth/AuthContext.jsx";
import "../styles/header.css";

export default function Header() {
    const { user, logout } = useAuth();

    return (
        <header className="header">
			<span className="header__title">Прогноз погоди</span>

			<div className="header__user">
				<span className="header__name">{user}</span>
				<button className="header__logout" type="button" onClick={logout}>
					Вийти
				</button>
			</div>
		</header>
    );
}