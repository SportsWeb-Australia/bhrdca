/* ============================================================================
   BHRDCA — Box Hill 10-day forecast widget (top-right of the topbar).
   Data: Open-Meteo (free, no API key required). Attribution required by
   their terms — kept as a small link inside the forecast panel.
   ========================================================================== */
(function () {
  var LAT = -37.8199, LON = 145.1225; // Box Hill, VIC
  var CACHE_KEY = "bhrdca_wx_v1";
  var CACHE_MS = 30 * 60 * 1000; // 30 min

  var WX = {
    0: ["ti-sun", "Clear"], 1: ["ti-sun", "Mostly clear"], 2: ["ti-cloud", "Partly cloudy"], 3: ["ti-cloud", "Overcast"],
    45: ["ti-cloud-fog", "Fog"], 48: ["ti-cloud-fog", "Fog"],
    51: ["ti-cloud-drizzle", "Drizzle"], 53: ["ti-cloud-drizzle", "Drizzle"], 55: ["ti-cloud-drizzle", "Drizzle"],
    56: ["ti-cloud-drizzle", "Freezing drizzle"], 57: ["ti-cloud-drizzle", "Freezing drizzle"],
    61: ["ti-cloud-rain", "Light rain"], 63: ["ti-cloud-rain", "Rain"], 65: ["ti-cloud-rain", "Heavy rain"],
    66: ["ti-cloud-rain", "Freezing rain"], 67: ["ti-cloud-rain", "Freezing rain"],
    71: ["ti-snowflake", "Light snow"], 73: ["ti-snowflake", "Snow"], 75: ["ti-snowflake", "Heavy snow"], 77: ["ti-snowflake", "Snow grains"],
    80: ["ti-cloud-rain", "Rain showers"], 81: ["ti-cloud-rain", "Rain showers"], 82: ["ti-cloud-rain", "Heavy showers"],
    85: ["ti-snowflake", "Snow showers"], 86: ["ti-snowflake", "Snow showers"],
    95: ["ti-cloud-storm", "Thunderstorm"], 96: ["ti-cloud-storm", "Thunderstorm"], 99: ["ti-cloud-storm", "Thunderstorm"]
  };
  function wx(code) { return WX[code] || ["ti-cloud", "—"]; }
  function dayName(iso, i) {
    if (i === 0) return "Today";
    var d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-AU", { weekday: "short" });
  }

  function render(data) {
    var mount = document.getElementById("wx-widget");
    if (!mount || !data || !data.daily) return;
    var cur = data.current_weather || {};
    var curIcon = wx(cur.weathercode)[0];
    var curTemp = cur.temperature != null ? Math.round(cur.temperature) : null;

    var chip = '<button class="wx-chip" id="wx-chip" type="button" aria-label="Box Hill weather">'
      + '<i class="ti ' + curIcon + '"></i>'
      + (curTemp != null ? '<span class="wx-chip-t">' + curTemp + '&deg;</span>' : '')
      + '<span class="wx-chip-loc">Box Hill</span>'
      + '</button>';

    var days = data.daily.time.map(function (iso, i) {
      var code = data.daily.weathercode[i];
      var w = wx(code);
      var hi = Math.round(data.daily.temperature_2m_max[i]);
      var lo = Math.round(data.daily.temperature_2m_min[i]);
      return '<div class="wx-day">'
        + '<div class="wx-day-nm">' + dayName(iso, i) + '</div>'
        + '<i class="ti ' + w[0] + '" title="' + w[1] + '"></i>'
        + '<div class="wx-day-hi">' + hi + '&deg;</div>'
        + '<div class="wx-day-lo">' + lo + '&deg;</div>'
        + '</div>';
    }).join("");

    var panel = '<div class="wx-panel" id="wx-panel">'
      + '<div class="wx-panel-head">10-Day Forecast &mdash; Box Hill, VIC</div>'
      + '<div class="wx-days">' + days + '</div>'
      + '<a class="wx-credit" href="https://open-meteo.com/" target="_blank" rel="noopener">Weather data by Open-Meteo.com</a>'
      + '</div>';

    mount.innerHTML = chip + panel;

    var chipEl = document.getElementById("wx-chip");
    var panelEl = document.getElementById("wx-panel");
    chipEl.addEventListener("click", function (e) {
      e.stopPropagation();
      panelEl.classList.toggle("open");
    });
    document.addEventListener("click", function (e) {
      if (!mount.contains(e.target)) panelEl.classList.remove("open");
    });
  }

  function fetchWeather() {
    var cached = null;
    try { cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null"); } catch (e) {}
    if (cached && cached.ts && (Date.now() - cached.ts) < CACHE_MS) {
      render(cached.data);
      return;
    }
    var url = "https://api.open-meteo.com/v1/forecast?latitude=" + LAT + "&longitude=" + LON
      + "&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true"
      + "&timezone=Australia%2FMelbourne&forecast_days=10";
    fetch(url).then(function (r) { return r.json(); }).then(function (data) {
      try { localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: data })); } catch (e) {}
      render(data);
    }).catch(function () {
      if (cached && cached.data) render(cached.data);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fetchWeather);
  } else {
    fetchWeather();
  }
})();
