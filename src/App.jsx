import { useEffect, useState } from "react";

function App() {
    const [weather, setWeather] = useState(null);
    const [news, setNews] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState("");

    useEffect(() => {
        fetchWeather();
        fetchNews();
    }, []);

    const fetchWeather = async () => {
        const res = await fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY&units=metric"
        );
        const data = await res.json();
        setWeather(data);
    };

    const fetchNews = async () => {
        const res = await fetch(
            "https://newsapi.org/v2/top-headlines?category=technology&country=us&apiKey=YOUR_API_KEY"
        );
        const data = await res.json();
        setNews(data.articles.slice(0, 5));
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

                    {weather && (
                        <>
                            <p>City: {weather.name}</p>
                            <p>Temp: {weather.main.temp}°C</p>
                            <p>{weather.weather[0].description}</p>
                        </>
                    )}
                </div>

                <div>
                    <h2>Tech News</h2>

                    {news.map((item, index) => (
                        <p key={index}>{item.title}</p>
                    ))}
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