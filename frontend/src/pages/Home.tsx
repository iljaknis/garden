import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="min-h-screen w-full mx-auto bg-gray-900 text-gray-100 flex flex-col items-center
        justify-center text-center px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Willkommen in deinem Digital Garden 🌱
            </h1>

            <p className="text-gray-400 max-w-xl mb-8 text-base md:text-lg">
                Ein Ort, an dem deine Gedanken wachsen, sich entwickeln und zu etwas
                Großem werden können.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    to="/login"
                    className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 text-center"
                >
                    Loslegen
                </Link>

                <a
                    href="#"
                    className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800
                    text-center"
                >
                    Mehr erfahren
                </a>
            </div>
        </div>
    );
}
