const COOKIE_NAME = "weather_auth";
const SEVEN_DAYS = 6048000; // 7 days in seconds

export function setCookie(name, value, maxAgeSeconds = SEVEN_DAYS) {
	document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAgeSeconds}; path=/; SameSite=Lax`;
}

export function getCookie(name) {
	const match = document.cookie
		.split("; ")
		.find((row) => row.startsWith(`${name}=`));
	return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

export function deleteCookie(name) {
	document.cookie = `${name}=; max-age=0; path=/; SameSite=Lax`;
}

export const authCookie = {
	get: () => getCookie(COOKIE_NAME),
	set: (login) => setCookie(COOKIE_NAME, login),
	remove: () => deleteCookie(COOKIE_NAME),
};
