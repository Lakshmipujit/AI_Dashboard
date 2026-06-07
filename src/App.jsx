import { useEffect, useState } from "react";

function App() {
    const [weather, setWeather] = useState(null);
    const [news, setNews] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState("");

    const weatherApiKey = import.meta.env.VITE_OPENWEATHER_KEY;
    const newsApiKey = import.meta.env.VITE_NEWSAPI_KEY;

    useEffect(() => {
        fetchWeather();
        fetchNews();
    }, []);

    const fetchWeather = async () => {
        if (!weatherApiKey) {
            console.error("Missing OpenWeather API key");
            setWeather(null);
            return;
        }

        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${weatherApiKey}&units=metric`
            );
            const data = await res.json();

            if (!res.ok) {
                console.error("Weather API error", data);
                setWeather(null);
                return;
            }

            setWeather(data);
        } catch (error) {
            console.error("Weather fetch failed", error);
            setWeather(null);
        }
    };

    const fetchNews = async () => {
        if (!newsApiKey) {
            console.error("Missing NewsAPI key");
            setNews([]);
            return;
        }

        try {
            const res = await fetch(
                `https://newsapi.org/v2/top-headlines?category=technology&country=us&apiKey=${newsApiKey}`
            );
            const data = await res.json();

            if (!res.ok || !data.articles) {
                console.error("News API error", data);
                setNews([]);
                return;
            }

            setNews(data.articles.slice(0, 5));
        } catch (error) {
            console.error("News fetch failed", error);
            setNews([]);
        }
    };

    const addTask = () => {
        if (!taskInput.trim()) return;

        setTasks([...tasks, taskInput]);
        setTaskInput("");
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>AI Agent Dashboard</h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                }}
            >
                <div>
                    <h2>Weather</h2>

                    {weather ? (
                        <>
                            <p>City: {weather.name}</p>
                            <p>Temp: {weather?.main?.temp}°C</p>
                            <p>{weather?.weather?.[0]?.description}</p>
                        </>
                    ) : (
                        <p>Weather data unavailable. Check your API key and network.</p>
                    )}
                </div>

                <div>
                    <h2>Tech News</h2>

                    {news.length > 0 ? (
                        news.map((item, index) => (
                            <p key={index}>{item.title}</p>
                        ))
                    ) : (
                        <p>News data unavailable. Check your API key and network.</p>
                    )}
                </div>

                <div>
                    <h2>Tasks</h2>

                    <input
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        placeholder="Enter task"
                    />

                    <button onClick={addTask}>Add</button>

                    <ul>
                        {tasks.map((task, index) => (
                            <li key={index}>{task}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2>AI Assistant</h2>
                    <p>
                        Connect your backend OpenAI API and allow users to ask questions.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default App;