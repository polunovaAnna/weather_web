const GEO_ERRORS = {
	1: "Доступ до геолокації заборонено. Будь ласка, увімкніть доступ у налаштуваннях браузера.",
	2: "Позиція недоступна. Будь ласка, перевірте ваше підключення до мережі або налаштування GPS.",
	3: "Час вичерпано. Не вдалося отримати ваше місцезнаходження вчасно.",
};

const FALLBACK_PLACE = "Ваше місцезнаходження";

function getPosition() {
	return new Promise((resolve, reject) => {
		if (!("geolocation" in navigator)) {
			reject(new Error("Геолокація не підтримується вашим браузером."));
			return;
		}
		navigator.geolocation.getCurrentPosition(
			resolve,
			(error) => reject(new Error(GEO_ERRORS[error.code] ?? GEO_ERRORS[2])),
			{ timeout: 8000 },
		);
	});
}

async function fetchPlaceName({ latitude, longitude }) {
	try {
		const params = new URLSearchParams({
			latitude,
			longitude,
			localityLanguage: "uk",
		});

		const response = await fetch(
			`https://api.bigdatacloud.net/data/reverse-geocode-client?${params}`,
		);
		if (!response.ok) {
			throw new Error(
				"Зворотний геокодинг не вдався. Будь ласка, спробуйте ще раз.",
			);
		}

		const data = await response.json();
		const place = data.city || data.locality || data.principalSubdivision;
		if (!place) return FALLBACK_PLACE;

		return data.countryName ? `${place}, ${data.countryName}` : place;
	} catch {
		return FALLBACK_PLACE;
	}
}

export async function getUserLocation() {
	const { coords } = await getPosition();
	const location = {
		latitude: coords.latitude,
		longitude: coords.longitude,
	};
	return { ...location, name: await fetchPlaceName(location) };
}

export async function fetchForecast({ latitude, longitude }) {
	const params = new URLSearchParams({
		latitude,
		longitude,
		daily: [
			"weather_code",
			"temperature_2m_max",
			"temperature_2m_min",
			"apparent_temperature_max",
			"wind_speed_10m_max",
			"precipitation_probability_max",
			"uv_index_max",
		].join(","),
		timezone: "auto",
		forecast_days: 5,
	});

	let response;
	try {
		response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
	} catch {
		throw new Error(
			"Не вдалося підключитися до сервера прогнозу погоди. Будь ласка, перевірте ваше підключення до мережі.",
		);
	}

	if (!response.ok) {
		throw new Error("Не вдалося отримати прогноз погоди.(${response.status})");
	}

	const { daily } = await response.json();

	return daily.time.map((date, index) => ({
		date,
		code: daily.weather_code[index],
		tempMax: Math.round(daily.temperature_2m_max[index]),
		tempMin: Math.round(daily.temperature_2m_min[index]),
		feelsLike: Math.round(daily.apparent_temperature_max[index]),
		wind: Math.round(daily.wind_speed_10m_max[index]),
		precipitation: daily.precipitation_probability_max[index],
		uv: daily.uv_index_max[index],
	}));
}
