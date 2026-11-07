import sunIcon from "../images/animated/day.svg";
import cloudyEasyIcon from "../images/animated/cloudy-day-1.svg";
import cloudyHeavyIcon from "../images/animated/cloudy-day-3.svg";
import cloudsIcon from "../images/animated/cloudy.svg";
import barelySunSnowIcon from "../images/animated/snowy-2.svg";
import smallRainIcon from "../images/animated/rainy-4.svg";
import rainIcon from "../images/animated/rainy-5.svg";
import strongRainIcon from "../images/animated/rainy-6.svg";
import smallSnowIcon from "../images/animated/snowy-4.svg";
import snowIcon from "../images/animated/snowy-5.svg";
import strongSnowIcon from "../images/animated/snowy-6.svg";
import thunderIcon from "../images/animated/thunder.svg";

const WEATHER_CODES = {
	0: { label: "Ясно", icon: sunIcon },
	1: { label: "Переважно ясно", icon: cloudyEasyIcon },
	2: { label: "Мінлива хмарність", icon: cloudyHeavyIcon },
	3: { label: "Похмуро", icon: cloudsIcon },
	45: { label: "Туман", icon: cloudsIcon },
	48: { label: "Паморозь", icon: smallSnowIcon },
	51: { label: "Легка мряка", icon: smallRainIcon },
	53: { label: "Мряка", icon: rainIcon },
	55: { label: "Сильна мряка", icon: smallRainIcon },
	56: { label: "Крижана мряка", icon: barelySunSnowIcon },
	57: { label: "Сильна крижана мряка", icon: strongSnowIcon },
	61: { label: "Невеликий дощ", icon: smallRainIcon },
	63: { label: "Дощ", icon: rainIcon },
	65: { label: "Сильний дощ", icon: strongRainIcon },
	66: { label: "Крижаний дощ", icon: barelySunSnowIcon },
	67: { label: "Сильний крижаний дощ", icon: snowIcon },
	71: { label: "Невеликий сніг", icon: smallSnowIcon },
	73: { label: "Сніг", icon: snowIcon },
	75: { label: "Сильний сніг", icon: strongSnowIcon },
	77: { label: "Снігова крупа", icon: snowIcon },
	80: { label: "Короткочасні дощі", icon: rainIcon },
	81: { label: "Зливи", icon: strongRainIcon },
	82: { label: "Сильні зливи", icon: strongRainIcon },
	85: { label: "Снігопад", icon: snowIcon },
	86: { label: "Сильний снігопад", icon: strongSnowIcon },
	95: { label: "Гроза", icon: thunderIcon },
	96: { label: "Гроза з градом", icon: thunderIcon },
	99: { label: "Сильна гроза з градом", icon: thunderIcon },
};

export function describeWeather(code) {
	return WEATHER_CODES[code] ?? { label: "Невідомо" };
}
