async function fetchData(cityName) {
    const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + cityName;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0c8173e266mshbc61abbf90c7bcap1398b3jsn0857259dc4a8',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        document.getElementById('cityName').textContent = cityName;
        document.getElementById('cloud_pct').innerHTML = result.cloud_pct;
        document.getElementById('temp').innerHTML = result.temp;
        document.getElementById('feels_like').innerHTML = result.feels_like;
        document.getElementById('humidity').innerHTML = result.humidity;
        document.getElementById('min_temp').innerHTML = result.min_temp;
        document.getElementById('max_temp').innerHTML = result.max_temp;
        document.getElementById('wind_speed').innerHTML = result.wind_speed;
        document.getElementById('wind_degrees').innerHTML = result.wind_degrees;
        document.getElementById('sunrise').innerHTML = result.sunrise;
        document.getElementById('sunset').innerHTML = result.sunset;
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

// Call the async function initially with a default city
fetchData("hyderabad");

// Add event listener to the form for submitting city
document.getElementById("cityForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const cityValue = document.getElementById("city").value;
    fetchData(cityValue);
});

async function table_values(city) {
    const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0c8173e266mshbc61abbf90c7bcap1398b3jsn0857259dc4a8',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        
        const tableRows = document.querySelectorAll('.table tbody tr');
        tableRows.forEach(row => {
            const cityNameCell = row.querySelector('th');
            if (cityNameCell.textContent.trim().toLowerCase() === city.toLowerCase()) {
                const cells = row.querySelectorAll('td');
                cells[0].innerHTML = result.temp; // Temperature
                cells[1].innerHTML = result.humidity; // Humidity
                cells[2].innerHTML = result.wind_degrees;
                cells[3].innerHTML = result.wind_speed;
                // You can update other cells similarly based on the API response
            }
        });
    } catch (error) {
        console.error(error);
    }
}

table_values("Mumbai");
table_values("Kolkata");
table_values("ooty");
table_values("Visakhapatnam");
table_values("chennai");
table_values("Thiruvananthapuram");