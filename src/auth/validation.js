export const VALID_USER = {
	login: "anna3",
	password: "123",
};

const LOGIN_PATTERN = /^[A-Za-zА-Яа-яІіЇїЄєҐґ]+[1-6]$/;

export function validateLogin(login, password) {
	const errors = {};
	if (!login.trim()) {
		errors.login = "Введіть логін";
	} else if (!LOGIN_PATTERN.test(login.trim())) {
		errors.login =
			"Логін повинен містити лише ім'я та номер курсу (наприклад, anna3)";
	}

	if (!password.trim()) {
		errors.password = "Введіть пароль";
	}
	return errors;
}

export function checkUserCredentials(login, password) {
	return (
		login.trim() === VALID_USER.login && password.trim() === VALID_USER.password
	);
}
