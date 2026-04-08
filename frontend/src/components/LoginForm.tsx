import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface LoginFormProps {
    onLogin: (username: string, password: string) => void;
    error: string | null;
    success: string | null;
}

export default function LoginForm({ onLogin, error, success }: LoginFormProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function submit(e: FormEvent) {
        e.preventDefault();
        onLogin(username, password);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 px-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-center">Login</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={submit} className="space-y-4">
                        <Input
                            type="text"
                            placeholder="Benutzername"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <Input
                            type="password"
                            placeholder="Passwort"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && <p className="text-red-400 text-sm">{error}</p>}
                        {success && <p className="text-green-400 text-sm">{success}</p>}

                        <Button type="submit" className="w-full">
                            Einloggen
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}