async function fetchData(cityName) {
    const url = 'https://weather-api138.p.rapidapi.com/weather?city_name=' + cityName;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'db29f73903msh5568417ac8e3ec2p11a9d2jsn9c7f9261b8e8',
            'x-rapidapi-host': 'weather-api138.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        // Convert temperature from Fahrenheit to Celsius
        // console.log(result);
        const tempCelsius = (result.main.temp-273.15).toFixed(2);
        const feelsLikeCelsius = (result.main.feels_like - 273.15).toFixed(2);
        const minTempCelsius = (result.main.temp_min - 273.15).toFixed(2);
        const maxTempCelsius = (result.main.temp_max - 273.15).toFixed(2);

        // Update main weather details
        document.getElementById('cityName').textContent = cityName;
        document.getElementById('description').innerHTML = result.weather[0].main;
        document.getElementById('temp').innerHTML = tempCelsius;
        document.getElementById('feels_like').innerHTML = feelsLikeCelsius + "°C";
        document.getElementById('humidity').innerHTML = result.main.humidity;
        document.getElementById('min_temp').innerHTML = minTempCelsius + "°C";
        document.getElementById('max_temp').innerHTML = maxTempCelsius + "°C";
        document.getElementById('wind_speed').innerHTML = result.wind.speed;
        document.getElementById('wind_degrees').innerHTML = result.wind.deg;
        document.getElementById('sunrise').innerHTML = result.sys.sunrise;
        document.getElementById('sunset').innerHTML = result.sys.sunset;

        // Update "Weather of Other Cities" table with the latest searched city
        // const tableRows = document.querySelectorAll('.table tbody tr');
        // let cityFound = false;


        // console.log(result);
    } catch (error) {
        console.error(error);
    }
}

// Call the async function initially with a default city
fetchData("hyderabad");



async function data(cityname)
{
    const url = 'https://weather-api138.p.rapidapi.com/weather?city_name=' + cityname;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'db29f73903msh5568417ac8e3ec2p11a9d2jsn9c7f9261b8e8',
            'x-rapidapi-host': 'weather-api138.p.rapidapi.com'
        }
    };
    console.log(cityname);
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        // console.log(result);
        return result;
    }catch(error)
    {
        console.log(error);
    }
    return null;
}

async function table_values() {
    // console.log("Updating table values...");
    const tableRows = document.querySelectorAll('.table tbody tr');
    for (const row of tableRows) {
        const cityNameCell = row.querySelector('th');
        const cityName = cityNameCell.textContent.trim().toLowerCase();
        const result = await data(cityName);  // Await the result here

        if (result && result.main) {
            const cells = row.querySelectorAll('td');
            cells[0].innerHTML = (result.main.temp - 273.15).toFixed(2);  // Temperature
            cells[1].innerHTML = result.main.humidity;  // Humidity
            cells[2].innerHTML = result.wind.deg;  // Wind Degrees
            cells[3].innerHTML = result.wind.speed;  // Wind Speed
        }
    }
}

table_values();  // Call this when the page loads to populate the table


document.getElementById("cityForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const cityValue = document.getElementById("city").value.trim(); // Trim to remove extra spaces
    if (cityValue) {
        fetchData(cityValue);  // Fetch weather data for the entered city
    } else {
        alert("Please enter a city name.");
    }
});
