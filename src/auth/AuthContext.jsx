import { createContext, useContext, useState } from "react";
import { authCookie } from "../utils/cookies.js";
import { checkUserCredentials } from "./validation.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [user, setUser] = useState(() => authCookie.get());

	function login(credentials) {
		if (!checkUserCredentials(credentials.login, credentials.password)) return false;
		const name = credentials.login.trim();
		authCookie.set(name);
		setUser(name);
		return true;
	}

	function logout() {
		authCookie.remove();
		setUser(null);
	}

	const value = { user, isAuthenticated: Boolean(user), login, logout };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth має бути використаний всередині AuthProvider");
	}
	return context;
}
