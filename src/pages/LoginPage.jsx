import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import { validateLogin } from "../auth/validation.js";
import "../styles/login.css";

export default function LoginPage() {
	const { login } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const redirectTo = location.state?.from?.pathname || "/dashboard";

	const [form, setForm] = useState({ login: "", password: "" });
	const [errors, setErrors] = useState({});
	const [formError, setFormError] = useState("");

	function handleChange(event) {
		const { name, value } = event.target;
		setForm((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: undefined }));
		setFormError("");
	}

	function handleSubmit(event) {
		event.preventDefault();

		const validationErrors = validateLogin(form.login, form.password);
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		if (login(form)) {
			navigate(redirectTo, { replace: true });
		} else {
			setFormError("Невірний логін або пароль");
		}
	}

	return (
		<div className="login-page">
			<section className="login-hero">
				<h2 className="login-hero__title">Твій улюблений прогноз погоди</h2>
				<p className="login-hero__text">Погода на 5 днів завжди під рукою.</p>
			</section>

			<section className="login-side">
				<form className="auth-card" onSubmit={handleSubmit} noValidate>
					<h1 className="auth-card__brand">Прогноз погоди</h1>

					<label className="field">
						<span className="field__label">Логін</span>
						<input
							className={`field__input ${errors.login ? "field__input--error" : ""}`}
							type="text"
							name="login"
							value={form.login}
							onChange={handleChange}
							placeholder="anna3"
							autoComplete="username"
						/>
						{errors.login && (
							<span className="field__error">{errors.login}</span>
						)}
					</label>

					<label className="field">
						<span className="field__label">Пароль</span>
						<input
							className={`field__input ${errors.password ? "field__input--error" : ""}`}
							type="password"
							name="password"
							value={form.password}
							onChange={handleChange}
							placeholder="••••••••"
							autoComplete="current-password"
						/>
						{errors.password && (
							<span className="field__error">{errors.password}</span>
						)}
					</label>

					{formError && (
						<div className="form-error" role="alert">
							{formError}
						</div>
					)}

					<button className="btn btn--primary" type="submit">
						Увійти
					</button>
				</form>
			</section>
		</div>
	);
}