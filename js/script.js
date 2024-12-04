const weatherAPIKey = "4b2bb8a2cd60426d804191736240212";
const apodAPIKey = "QXpg8FQafEQuc6eKySmvroHYUvCkPjtPEDZy9HUS";

const weatherURL = "https://api.weatherapi.com/v1/current.json";
const apodURL = "https://api.nasa.gov/planetary/apod";

async function formHandler(e){

    // Stop the form from refreshing the page
    // Source: https://www.quora.com/How-do-you-prevent-a-page-reload-in-JavaScript#:~:text=%C2%B7%201y-,To%20prevent%20a%20page%20reload%20in%20JavaScript%2C%20you%20can%20use,normally%20trigger%20a%20page%20reload.
    e.preventDefault();
    
    const city = document.getElementById("city").value.trim();
    const date = document.getElementById("date").value;

    // Reset the previous results
    document.getElementById("weatherResults").innerHTML = "";
    document.getElementById("apodResults").innerHTML = "";

    await weatherData(city);
    await apodData(date);
}

document.getElementById("fetchDataFrom").addEventListener("submit", formHandler);

async function weatherData(city){
    const URL = `${weatherURL}?key=${weatherAPIKey}&q=${city}`;

    try{
        const response = await fetch(URL);
        
        const data = await response.json();

        document.getElementById("weatherResults").innerHTML = `
            <h3>Weather in ${city}</h3>
            <p>Temperature: ${data.current.temp_c}°C</p>
            <p>Humidity: ${data.current.humidity}%</p>
        `;
    }
    catch{
        document.getElementById("weatherResults").innerHTML = `<p>Error fetching the API Data</p>`;
    }
}

async function apodData(date) {
    const URL = `${apodURL}?api_key=${apodAPIKey}&date=${date}`

    try{
        const respone = await fetch(URL);
        
        const data = await respone.json();

        document.getElementById("apodResults").innerHTML = `
            <h3>Astronomy Picture of the Day (NASA)</h3>
            <p>Title: ${data.title}</p>
            <p>Date: ${data.date}</p>
            <p>Explanation: ${data.explanation}</p>
            <img src="${data.url}" alt ="${data.title}" style="max-width: 100%; " >
        `
    }
    catch{
        document.getElementById("apodResults").innerHTML = `<p>Error fetching API Data</p>`;
    }
}