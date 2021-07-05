import React, { useEffect, useState } from 'react'
import './App.css';
import Weather from './components/Weather';
import Error from './components/Error';

function App() {
  const API_KEY = "bc643f7295e74b9897a162710210507";
  const [weather, setWeather] = useState({})
  const [errors, setError] = useState([])
  const [search, setSearch] = useState("")
  const [query, setQuery] = useState("")
  const [isLoading, setLoading] = useState(true)
  const [initText, setInitText] = useState("")

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}&aqi=no`
      )
      const data = await response.json()

      if (data.error) {
        setError([data.error])
      } else {
        setWeather({
          city: data.location.name,
          temperature: data.current.temp_c,
          icon: data.current.condition.icon,
          description: data.current.condition.text,
        })
      }
      setLoading(false)
      setInitText("")
    }
    if (query) {
      fetchData()
    } else {
      setLoading(false)
      setInitText("Enter a Value")
    }
  }, [query])

  const runSearch = (event) => {
    setSearch(event.target.value)
  }

  const getResults = (event) => {
    event.preventDefault();
    setError([])
    setSearch("")
    setLoading(true)
    if (search.length === 0) {
      setError([{
        code: 100001,
        message: "Please fill in the Search Field"
      }])
      setLoading(false)
      setInitText("")
      return;
    } else {
      setQuery(search)
    }
  }

  return (
    <div className="App">
      <form className="search-form" onSubmit={getResults}>
        <input className="search-bar" type="text" value={search} onChange={runSearch} />
        <button className="search-button" type="submit">Search</button>
      </form>

      {initText && <h3>{initText}</h3>}
      {isLoading && <h3>Loading...</h3>}
      {!isLoading &&
        errors.length === 0 ?
        <Weather weather={weather} />
        :
        <Error errors={errors} />
      }
    </div >
  );
}

export default App;
