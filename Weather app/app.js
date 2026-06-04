const locationBtn = document.querySelector("#locationBtn"); //search button
const searchCity = document.querySelector("#searchCity"); //search city
const city = document.querySelector("#city"); //city name
const country = document.querySelector("#country"); //country name
const temp = document.querySelector("#temp"); //main temp
const des = document.querySelector("#description"); //des
const hTemp = document.querySelector("#height"); //height temp
const lTemp = document.querySelector("#low"); //low temp
const visibility = document.querySelector("#visibility"); //visibility
const windSpeed = document.querySelector("#windSpeed"); //wind speed
const humidity = document.querySelector("#humidity"); //humidity
const pressure = document.querySelector("#pressure"); //pressure
const feelsLike = document.querySelector("#feelsLike"); //feels like temp
const sunrise = document.querySelector("#sunrise"); //sunrise time
const sunset = document.querySelector("#sunset"); //sunset time

const currentDate = document.querySelector("#currentDate"); //date
const currentTime = document.querySelector("#currentTime"); //time
const forecastContainer = document.querySelector("#forecastContainer"); //forecast
const mainIcon = document.querySelector("#mainIcon"); //main weather icon
const celsiusBtn = document.querySelector("#celsiusBtn");
const fahrenheitBtn = document.querySelector("#fahrenheitBtn");
const unitLabelEl = document.querySelector("#unitLabel");
const autocompleteDropdown = document.querySelector("#autocompleteDropdown");
const bgImg = document.querySelector("#bg-img");

const API_KEY = "2378e6002965836166817aedd1cd0d96";
const API =
  "https://api.openweathermap.org/data/2.5/weather?appid=" + API_KEY + "&units=metric&q=";
const FORECAST_API =
  "https://api.openweathermap.org/data/2.5/forecast?appid=" + API_KEY + "&units=metric&q=";
const API_COORDS =
  "https://api.openweathermap.org/data/2.5/weather?appid=" + API_KEY + "&units=metric";
const FORECAST_API_COORDS =
  "https://api.openweathermap.org/data/2.5/forecast?appid=" + API_KEY + "&units=metric";
const GEO_API =
  "https://api.openweathermap.org/geo/1.0/direct?appid=" + API_KEY + "&limit=5&q=";

// Unit state: store raw Celsius values for conversion
let currentUnit = "C";
let rawTemps = {
  temp: 0,
  tempMax: 0,
  tempMin: 0,
  feelsLike: 0,
};
let rawForecast = []; // stored forecast day data for re-rendering

const toF = (c) => Math.round((c * 9) / 5 + 32);
const toC = (c) => Math.round(c);
const convertTemp = (c) => (currentUnit === "F" ? toF(c) : toC(c));
const unitLabel = () => (currentUnit === "F" ? "°F" : "°C");

// Weather icon SVGs based on condition
const getWeatherIcon = (description, size = 28) => {
  const desc = description.toLowerCase();
  if (desc.includes("rain") || desc.includes("drizzle")) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3.25A4.75 4.75 0 0 0 7.298 7.04a.75.75 0 0 1-.636.53a3.25 3.25 0 0 0 .338 6.43h1a.75.75 0 0 1 0 1.5H7a4.75 4.75 0 0 1-.743-9.446A6.25 6.25 0 0 1 18.069 7.59A4.25 4.25 0 0 1 17 15.5h-1a.75.75 0 0 1 0-1.5h1a2.75 2.75 0 0 0 .598-5.437a.75.75 0 0 1-.555-.727A4.75 4.75 0 0 0 12 3.25M9.75 15a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0v-5.5a.75.75 0 0 1 .75-.75m4.5 2a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0v-5.5a.75.75 0 0 1 .75-.75"/></svg>`;
  }
  if (desc.includes("cloud")) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24"><path fill="currentColor" d="M6.5 20q-2.275 0-3.888-1.575T1 14.575q0-1.95 1.175-3.475T5.25 9.15q.625-2.3 2.5-3.725T12 4q2.925 0 4.963 2.038T19 11q1.725.2 2.863 1.488T23 15.5q0 1.875-1.312 3.188T18.5 20z"/></svg>`;
  }
  if (desc.includes("snow")) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a1 1 0 0 1 1 1v2.586l1.293-1.293a1 1 0 1 1 1.414 1.414L12 9.414L8.293 5.707a1 1 0 0 1 1.414-1.414L11 5.586V3a1 1 0 0 1 1-1m0 12.586l3.707 3.707a1 1 0 0 1-1.414 1.414L13 18.414V21a1 1 0 1 1-2 0v-2.586l-1.293 1.293a1 1 0 0 1-1.414-1.414zM3 11a1 1 0 1 0 0 2h2.586l-1.293 1.293a1 1 0 1 0 1.414 1.414L9.414 12L5.707 8.293a1 1 0 0 0-1.414 1.414L5.586 11zm11.586 1l3.707-3.707a1 1 0 0 0-1.414-1.414L15.586 8.17H13v-2.586l1.293 1.293a1 1 0 1 0 1.414-1.414m3.707 3.707L14.586 12l3.707-3.707M21 13h-2.586l1.293 1.293a1 1 0 0 1-1.414 1.414L14.586 12"/></svg>`;
  }
  if (desc.includes("thunder") || desc.includes("storm")) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24"><path fill="currentColor" d="M6.5 20q-2.275 0-3.888-1.575T1 14.575q0-1.95 1.175-3.475T5.25 9.15q.625-2.3 2.5-3.725T12 4q2.925 0 4.963 2.038T19 11q1.725.2 2.863 1.488T23 15.5q0 1.875-1.312 3.188T18.5 20H13l1-4h-3l2-5h-3l-1 4h3z"/></svg>`;
  }
  if (desc.includes("mist") || desc.includes("fog") || desc.includes("haze")) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24"><path fill="currentColor" d="M3 16h5v2H3zm6 0h5v2H9zm6 0h6v2h-6zM3 12h8v2H3zm10 0h8v2h-8zM3 8h6v2H3zm8 0h10v2H11z"/></svg>`;
  }
  // Default: clear/sunny
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 704a192 192 0 1 0 0-384a192 192 0 0 0 0 384m0 64a256 256 0 1 1 0-512a256 256 0 0 1 0 512m0-704a32 32 0 0 1 32 32v64a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 768a32 32 0 0 1 32 32v64a32 32 0 1 1-64 0v-64a32 32 0 0 1 32-32M195.2 195.2a32 32 0 0 1 45.248 0l45.248 45.248a32 32 0 1 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248m543.104 543.104a32 32 0 0 1 45.248 0l45.248 45.248a32 32 0 0 1-45.248 45.248l-45.248-45.248a32 32 0 0 1 0-45.248M64 512a32 32 0 0 1 32-32h64a32 32 0 0 1 0 64H96a32 32 0 0 1-32-32m768 0a32 32 0 0 1 32-32h64a32 32 0 1 1 0 64h-64a32 32 0 0 1-32-32M195.2 828.8a32 32 0 0 1 0-45.248l45.248-45.248a32 32 0 0 1 45.248 45.248L240.448 828.8a32 32 0 0 1-45.248 0m543.104-543.104a32 32 0 0 1 0-45.248l45.248-45.248a32 32 0 0 1 45.248 45.248l-45.248 45.248a32 32 0 0 1-45.248 0"/></svg>`;
};

// Background image based on condition
const updateBackground = (description) => {
  const desc = description.toLowerCase();
  if (desc.includes("clear")) {
    bgImg.style.backgroundImage = "url('/asset/bg.jpg')";
  } else if (desc.includes("rain") || desc.includes("drizzle")) {
    bgImg.style.backgroundImage = "url('/asset/rain.jpg')";
  } else if (desc.includes("cloud")) {
    bgImg.style.backgroundImage = "url('/asset/cloud.jpg')";
  } else if (desc.includes("snow")) {
    bgImg.style.backgroundImage = "url('/asset/snow.jpg')";
  } else if (desc.includes("thunder") || desc.includes("storm")) {
    bgImg.style.backgroundImage = "url('/asset/thunder.jpg')";
  } else if (desc.includes("mist") || desc.includes("fog") || desc.includes("haze")) {
    bgImg.style.backgroundImage = "url('/asset/mist.jpg')";
  } else {
    bgImg.style.backgroundImage = "url('/asset/bg.jpg')";
  }
};

const checkWeather = async (cityname) => {
  try {
    const response = await fetch(API + cityname);
    if (searchCity.value === "") {
      alert("Enter city name");
      return;
    }

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();
    console.log(data);
    city.innerHTML = data.name; //city
    country.innerHTML = data.sys.country; //country
    des.innerHTML = data.weather[0].description;
    mainIcon.innerHTML = getWeatherIcon(data.weather[0].description, 70);
    visibility.innerHTML = data.visibility / 1000 + "km";
    windSpeed.innerHTML = data.wind.speed + "km/h";
    humidity.innerHTML = data.main.humidity + "%";
    pressure.innerHTML = data.main.pressure + "hpa";

    updateBackground(data.weather[0].description);

    // Store raw Celsius values
    rawTemps.temp = data.main.temp;
    rawTemps.tempMax = data.main.temp_max;
    rawTemps.tempMin = data.main.temp_min;
    rawTemps.feelsLike = data.main.feels_like;
    updateTempDisplay();

    //sunrise time
    const sunriseDate = new Date(data.sys.sunrise * 1000);
    const sunriseTime = sunriseDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    sunrise.innerHTML = sunriseTime;
    //sunrise time

    //sunset time
    const sunsetDate = new Date(data.sys.sunset * 1000);
    const sunsetTime = sunsetDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    sunset.innerHTML = sunsetTime;
    //sunset time

    // Get the current date/time
    // 1. Get the current UTC time in milliseconds
    const now = new Date();
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;

    // 2. Calculate the city's local time using the 'timezone' value from API (in seconds)
    const cityTimeInMs = utcTime + data.timezone * 1000;
    const cityDate = new Date(cityTimeInMs);

    // 3. Update the Date: "Thursday, Apr 2"
    currentDate.innerHTML = cityDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });

    // 4. Update the Time: "03:37 PM"
    currentTime.innerHTML = cityDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    // Fetch 5-day forecast
    checkForecast(cityname);
  } catch (error) {
    console.log(error.message);
  }
};

// Process forecast API response data (shared by city search and geolocation)
const processForecastData = (data) => {
  // Group forecast entries by day (the API returns 3-hour intervals)
  const dailyMap = {};
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  data.list.forEach((entry) => {
    const date = entry.dt_txt.split(" ")[0]; // "YYYY-MM-DD"
    if (date === today) return; // skip today (already shown in main card)

    if (!dailyMap[date]) {
      dailyMap[date] = {
        temps: [],
        descriptions: [],
        rain: 0,
        count: 0,
      };
    }
    dailyMap[date].temps.push(entry.main.temp);
    dailyMap[date].descriptions.push(entry.weather[0].description);
    dailyMap[date].rain += entry.pop || 0;
    dailyMap[date].count++;
  });

  const days = Object.keys(dailyMap).slice(0, 5);

  rawForecast = days.map((dateStr, index) => {
    const dayData = dailyMap[dateStr];
    const highTempC = Math.max(...dayData.temps);
    const lowTempC = Math.min(...dayData.temps);
    const avgRain = Math.round((dayData.rain / dayData.count) * 100);

    const descCounts = {};
    dayData.descriptions.forEach((d) => {
      descCounts[d] = (descCounts[d] || 0) + 1;
    });
    const description = Object.keys(descCounts).reduce((a, b) =>
      descCounts[a] > descCounts[b] ? a : b
    );

    const dateObj = new Date(dateStr + "T12:00:00");
    const dayLabel =
      index === 0
        ? "Tomorrow"
        : dateObj.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        });

    return { dayLabel, description, highTempC, lowTempC, avgRain };
  });

  renderForecastCards(rawForecast);
  searchCity.value = "";

};

// 5-day forecast by city name
const checkForecast = async (cityname) => {
  try {
    const response = await fetch(FORECAST_API + cityname);
    if (!response.ok) throw new Error("Forecast fetch failed");
    const data = await response.json();
    console.log("Forecast data:", data);
    processForecastData(data);
  } catch (error) {
    console.log("Forecast error:", error.message);
    forecastContainer.innerHTML =
      '<p class="text-sm text-red-300 text-center py-5">Failed to load forecast</p>';
  }
};

// Render forecast cards (called on initial load and on unit toggle)
const renderForecastCards = (forecastData) => {
  forecastContainer.innerHTML = "";

  forecastData.forEach((day, index) => {
    const highTemp = convertTemp(day.highTempC);
    const lowTemp = convertTemp(day.lowTempC);

    const card = document.createElement("div");
    card.className =
      "w-full p-3 bg-white/20 rounded-md border-white/50 border-[0.1px] flex justify-between items-center transition-all duration-300 hover:bg-white/30";
    card.style.opacity = "0";
    card.style.transform = "translateY(10px)";

    card.innerHTML = `
      <div class="flex items-center gap-2">
        ${getWeatherIcon(day.description)}
        <div>
          <p class="">${day.dayLabel}</p>
          <p class="text-xs text-white/70">${day.description}</p>
        </div>
      </div>
      <div class="flex items-center gap-5">
        <div class="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24">
            <mask id="rainMask${index}" width="18" height="22" x="3" y="1" fill="#000" maskUnits="userSpaceOnUse">
              <path fill="#fff" d="M3 1h18v22H3z"/>
              <path d="M19 14.571C19 18.121 15.866 21 12 21s-7-2.878-7-6.429c0-4.52 4.644-9.353 6.367-10.99a.913.913 0 0 1 1.266 0C14.356 5.217 19 10.05 19 14.57"/>
            </mask>
            <g fill="none" stroke="currentColor">
              <path stroke-width="4" d="M19 14.571C19 18.121 15.866 21 12 21s-7-2.878-7-6.429c0-4.52 4.644-9.353 6.367-10.99a.913.913 0 0 1 1.266 0C14.356 5.217 19 10.05 19 14.57Z" mask="url(#rainMask${index})"/>
              <path stroke-linecap="round" stroke-width="2" d="M12 18a4 4 0 0 1-4-4"/>
            </g>
          </svg>
          <p class="text-xs font-light text-white/50">${day.avgRain}%</p>
        </div>
        <div>
          <p>${highTemp}°</p>
          <p class="text-xs font-light text-white/50">${lowTemp}°</p>
        </div>
      </div>
    `;

    forecastContainer.appendChild(card);

    // Animate cards in with staggered delay
    setTimeout(() => {
      card.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 100);
  });
};

// Update temperature displays based on current unit
const updateTempDisplay = () => {
  temp.innerHTML = convertTemp(rawTemps.temp);
  hTemp.innerHTML = "H" + convertTemp(rawTemps.tempMax) + "°";
  lTemp.innerHTML = "L" + convertTemp(rawTemps.tempMin) + "°";
  feelsLike.innerHTML = convertTemp(rawTemps.feelsLike) + unitLabel();
  unitLabelEl.innerHTML = unitLabel();

  // Re-render forecast cards with correct unit
  if (rawForecast.length > 0) {
    renderForecastCards(rawForecast);
  }
};

// Unit toggle
celsiusBtn.addEventListener("click", () => {
  if (currentUnit === "C") return;
  currentUnit = "C";
  celsiusBtn.classList.add("bg-white/50");
  fahrenheitBtn.classList.remove("bg-white/50");
  updateTempDisplay();
});

fahrenheitBtn.addEventListener("click", () => {
  if (currentUnit === "F") return;
  currentUnit = "F";
  fahrenheitBtn.classList.add("bg-white/50");
  celsiusBtn.classList.remove("bg-white/50");
  updateTempDisplay();
});

locationBtn.addEventListener("click", () => {
  hideDropdown();
  checkWeather(searchCity.value);
});

// Allow Enter key to search (when no autocomplete item is active)
searchCity.addEventListener("keydown", (e) => {
  const items = autocompleteDropdown.querySelectorAll(".autocomplete-item");
  const hasItems = items.length > 0;

  if (e.key === "ArrowDown" && hasItems) {
    e.preventDefault();
    activeIndex = Math.min(activeIndex + 1, items.length - 1);
    updateActiveItem(items);
  } else if (e.key === "ArrowUp" && hasItems) {
    e.preventDefault();
    activeIndex = Math.max(activeIndex - 1, 0);
    updateActiveItem(items);
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (activeIndex >= 0 && activeIndex < items.length) {
      items[activeIndex].click();
    } else {
      hideDropdown();
      checkWeather(searchCity.value);
    }
  } else if (e.key === "Escape") {
    hideDropdown();
    searchCity.blur();
  }
});

// ============ AUTOCOMPLETE ============
let debounceTimer = null;
let activeIndex = -1;
let currentCities = [];

const showDropdown = () => {
  autocompleteDropdown.classList.add("show");
};

const hideDropdown = () => {
  autocompleteDropdown.classList.remove("show");
  activeIndex = -1;
};

const updateActiveItem = (items) => {
  items.forEach((item, i) => {
    item.classList.toggle("active", i === activeIndex);
  });
  // Scroll active item into view
  if (activeIndex >= 0 && items[activeIndex]) {
    items[activeIndex].scrollIntoView({ block: "nearest" });
  }
};

searchCity.addEventListener("input", (e) => {
  const query = e.target.value.trim();
  clearTimeout(debounceTimer);
  activeIndex = -1;

  if (query.length < 2) {
    hideDropdown();
    autocompleteDropdown.innerHTML = "";
    return;
  }

  // Show loading state
  autocompleteDropdown.innerHTML = `
    <div class="autocomplete-loading">
      <div class="spinner"></div>
      <span>Searching cities...</span>
    </div>
  `;
  showDropdown();

  debounceTimer = setTimeout(() => fetchCitySuggestions(query), 300);
});

const fetchCitySuggestions = async (query) => {
  try {
    const response = await fetch(GEO_API + encodeURIComponent(query));
    if (!response.ok) throw new Error("Geocoding failed");

    const cities = await response.json();
    currentCities = cities;
    activeIndex = -1;

    if (cities.length === 0) {
      autocompleteDropdown.innerHTML = `
        <div class="autocomplete-no-results">
          No cities found for "${query}"
        </div>
      `;
      showDropdown();
      return;
    }

    autocompleteDropdown.innerHTML = "";
    showDropdown();

    cities.forEach((cityData, index) => {
      const item = document.createElement("div");
      item.className = "autocomplete-item";

      const stateStr = cityData.state ? cityData.state + ", " : "";

      item.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style="flex-shrink:0; opacity:0.5">
          <path fill="currentColor" d="M12 12q.825 0 1.413-.587T14 10t-.587-1.412T12 8t-1.412.588T10 10t.588 1.413T12 12m0 7.35q3.05-2.8 4.525-5.087T18 10.2q0-2.725-1.737-4.462T12 4T7.738 5.738T6 10.2q0 1.775 1.475 4.063T12 19.35M12 22q-4.025-3.425-6.012-6.362T4 10.2q0-3.75 2.413-5.975T12 2t5.588 2.225T20 10.2q0 2.5-1.987 5.438T12 22m0-12"/>
        </svg>
        <div>
          <div class="city-name">${cityData.name}</div>
          <div class="city-detail">${stateStr}${cityData.country}</div>
        </div>
      `;

      item.addEventListener("click", () => {
        searchCity.value = cityData.name;
        hideDropdown();
        autocompleteDropdown.innerHTML = "";
        fetchWeatherByCoords(cityData.lat, cityData.lon);
      });

      autocompleteDropdown.appendChild(item);
    });
  } catch (error) {
    console.log("Autocomplete error:", error.message);
    autocompleteDropdown.innerHTML = `
      <div class="autocomplete-no-results">
        Failed to fetch suggestions
      </div>
    `;
  }
};

// Close dropdown when clicking outside — use mousedown so it fires before blur
document.addEventListener("mousedown", (e) => {
  if (!e.target.closest("#searchCity") && !e.target.closest("#autocompleteDropdown")) {
    hideDropdown();
  }
});

// Also hide on focus loss (e.g. tab away)
searchCity.addEventListener("blur", (e) => {
  // Delay to allow click on autocomplete item to register
  setTimeout(() => {
    if (!autocompleteDropdown.matches(":hover")) {
      hideDropdown();
    }
  }, 150);
});

// Fetch weather and forecast using precise coordinates
const fetchWeatherByCoords = async (latitude, longitude) => {
  try {
    // Fetch current weather by coordinates
    const response = await fetch(
      API_COORDS + "&lat=" + latitude + "&lon=" + longitude
    );
    if (!response.ok) throw new Error("Location weather fetch failed");

    const data = await response.json();
    console.log("Location weather:", data);

    city.innerHTML = data.name;
    country.innerHTML = data.sys.country;
    des.innerHTML = data.weather[0].description;
    mainIcon.innerHTML = getWeatherIcon(data.weather[0].description, 70);
    visibility.innerHTML = data.visibility / 1000 + "km";
    windSpeed.innerHTML = data.wind.speed + "km/h";
    humidity.innerHTML = data.main.humidity + "%";
    pressure.innerHTML = data.main.pressure + "hpa";

    updateBackground(data.weather[0].description);

    rawTemps.temp = data.main.temp;
    rawTemps.tempMax = data.main.temp_max;
    rawTemps.tempMin = data.main.temp_min;
    rawTemps.feelsLike = data.main.feels_like;
    updateTempDisplay();

    // Sunrise
    const sunriseDate = new Date(data.sys.sunrise * 1000);
    sunrise.innerHTML = sunriseDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Sunset
    const sunsetDate = new Date(data.sys.sunset * 1000);
    sunset.innerHTML = sunsetDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // City local time
    const now = new Date();
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
    const cityTimeInMs = utcTime + data.timezone * 1000;
    const cityDate = new Date(cityTimeInMs);

    currentDate.innerHTML = cityDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
    currentTime.innerHTML = cityDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    // Fetch 5-day forecast by coordinates
    const forecastRes = await fetch(
      FORECAST_API_COORDS + "&lat=" + latitude + "&lon=" + longitude
    );
    if (!forecastRes.ok) throw new Error("Location forecast fetch failed");

    const forecastData = await forecastRes.json();
    processForecastData(forecastData);
  } catch (error) {
    console.log("Location error:", error.message);
  }
};

// Auto-detect user location on page load
const loadWeatherByLocation = () => {
  if (!navigator.geolocation) {
    console.log("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      fetchWeatherByCoords(latitude, longitude);
    },
    (error) => {
      console.log("Geolocation denied:", error.message);
    }
  );
};

// Load weather on page start
loadWeatherByLocation();
