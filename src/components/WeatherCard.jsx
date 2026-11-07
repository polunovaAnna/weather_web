import { describeWeather } from "../utils/weatherCodes.js";
import "../styles/weather-card.css";

function formatDay(dateString, index) {
	if (index === 0) return "Сьогодні";
	if (index === 1) return "Завтра";

	return new Date(`${dateString}T12:00:00`).toLocaleDateString("uk-UA", {
		weekday: "short",
		day: "numeric",
		month: "long",
	});
}

export default function WeatherCard({ day, index }) {
	const { label, icon } = describeWeather(day.code);

	return (
		<article className="weather-card">
			<h3 className="weather-card__day">{formatDay(day.date, index)}</h3>

			{icon ? (
				<img className="weather-card__icon" src={icon} alt="" />
			) : (
				<div
					className="weather-card__icon weather-card__icon--empty"
					aria-hidden="true"
				>
					?
				</div>
			)}

			<p className="weather-card__label">{label}</p>

			<div className="weather-card__temps">
				<span className="weather-card__temp-max">{day.tempMax}°</span>
				<span className="weather-card__temp-min">{day.tempMin}°</span>
			</div>

			<dl className="weather-card__stats">
				<div>
					<dt>Відчувається як</dt>
					<dd>{day.feelsLike}°</dd>
				</div>
				<div>
					<dt>Вітер</dt>
					<dd>{day.wind} км/год</dd>
				</div>
				<div>
					<dt>Опади</dt>
					<dd>{day.precipitation}%</dd>
				</div>
				<div>
					<dt>УФ-індекс</dt>
					<dd>{day.uv}</dd>
				</div>
			</dl>
		</article>
	);
}