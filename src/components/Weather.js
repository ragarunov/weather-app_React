const Weather = ({ weather }) => {
    const { city, temperature, icon, description } = weather
    return (
        <div>
            <h1>{city}</h1>
            <h2>{temperature}{temperature && "°"}</h2>
            <h3>{description} <img src={icon} alt=""></img></h3>
        </div>
    )
}

export default Weather
