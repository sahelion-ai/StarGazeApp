<script>
  import { onMount } from 'svelte';
  
  // State variables
  let score = null;
  let isLoading = false;
  let error = null;
  let map = null;
  let userPosition = null;

  // Initialize map when component mounts
  onMount(() => {
    initMap();
  });

  function initMap() {
    import('leaflet').then((L) => {
      map = L.map('map').setView([0, 0], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(map);
    });
  }

  async function checkStargazing() {
    isLoading = true;
    score = null;
    error = null;

    try {
      // Get user location
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          { timeout: 5000, enableHighAccuracy: true }
        );
      });

      userPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      console.log("Your location:", userPosition);

      // Center map on user's location
      if (map) {
        map.setView([userPosition.lat, userPosition.lng], 10);
        L.marker([userPosition.lat, userPosition.lng])
          .addTo(map)
          .bindPopup("Your location")
          .openPopup();
      }

      // Calculate random score (will replace with real data later)
      score = Math.floor(Math.random() * 10);
      
    } catch (err) {
      error = "Could not get your location. Please enable permissions.";
      console.error(err);
    } finally {
      isLoading = false;
    }
  }
</script>

<main>
  <h1>Can I Stargaze Tonight?</h1>
  
  <div id="map" style="height: 300px; width: 100%; margin: 1rem 0;"></div>
  
  <button on:click={checkStargazing} disabled={isLoading}>
    {isLoading ? "Checking..." : "Tell Me"}
  </button>

  {#if error}
    <div class="error">{error}</div>
  {/if}

  {#if score !== null}
    <div class="result">
      <p>{score}/10</p>
      {#if score > 5}
        <p>Heck yeah! 🌠 <small>Great viewing conditions!</small></p>
      {:else}
        <p>Nope. ☁️ <small>Not ideal for stargazing</small></p>
      {/if}
    </div>
  {/if}
</main>

<style>
  @import 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
  
  main {
    text-align: center;
    padding: 2rem;
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: 0 auto;
  }
  
  #map {
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    border: 1px solid #ddd;
  }
  
  button {
    padding: 0.75rem 1.5rem;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s;
    margin-top: 1rem;
  }
  
  button:hover {
    background: #3e8e41;
    transform: translateY(-1px);
  }
  
  button:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
  }
  
  .result {
    margin-top: 2rem;
    font-size: 1.2rem;
    padding: 1rem;
    background: #f5f5f5;
    border-radius: 8px;
  }
  
  .result small {
    display: block;
    font-size: 0.9rem;
    color: #666;
    margin-top: 0.5rem;
  }
  
  .error {
    color: #d32f2f;
    margin-top: 1rem;
    padding: 0.75rem;
    background: #ffebee;
    border-radius: 6px;
    font-size: 0.9rem;
  }
</style>