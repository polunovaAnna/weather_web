import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import Loader from "../components/Loader.jsx";
import WeatherCard from "../components/WeatherCard.jsx";
import { useAuth } from "../auth/AuthContext.jsx";
import { fetchForecast, getUserLocation } from "../services/weather.js";
import "../styles/dashboard.css";

export default function DashboardPage() {
	const { user } = useAuth();
	const [place, setPlace] = useState("");
	const [days, setDays] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let cancelled = false;

		async function loadWeather() {
			try {
				const location = await getUserLocation();
				const forecast = await fetchForecast(location);
				if (cancelled) return;

				setPlace(location.name);
				setDays(forecast);
			} catch (err) {
				if (!cancelled) setError(err.message);
			} finally {
				if (!cancelled) setLoading(false);
			}
		}

		loadWeather();

		return () => {
			cancelled = true;
		};
	}, []);

	return (
		<div className="dashboard">
			<Header />

			<main className="dashboard__content">
				<h1 className="dashboard__greeting">Привіт, {user}!</h1>

				{loading && <Loader />}

				{!loading && error && (
					<div
						className="dashboard__panel dashboard__panel--error"
						role="alert"
					>
						{error}
					</div>
				)}

				{!loading && !error && (
					<section className="dashboard__panel">
						<h2 className="dashboard__place">{place}</h2>

						<div className="weather-grid">
							{days.map((day, index) => (
								<WeatherCard key={day.date} day={day} index={index} />
							))}
						</div>
					</section>
				)}
			</main>
		</div>
	);
}