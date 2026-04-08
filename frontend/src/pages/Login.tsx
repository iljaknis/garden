import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/LoginForm";

export default function Login() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();
    const auth = useAuth();

    async function handleLogin(username: string, password: string) {
        setError(null);
        setSuccess(null);

        try {
            const data = await login(username, password);

            if (data.success) {
                auth.login();
                navigate("/");
            } else {
                setError(data.message || "Ungültige Zugangsdaten");
            }
        } catch (_err) {
            setError("Serverfehler");
        }
    }

    return (
        <LoginForm onLogin={handleLogin} error={error} success={success} />
    );
}
