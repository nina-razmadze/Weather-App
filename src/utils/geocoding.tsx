import axios from "axios";

export async function getCityNameFromCoordinates(lat: number, lon: number) {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    );

    if (response.data && response.data.address && response.data.address.city) {
      return response.data.address.city;
    } else {
      return "Unknown City";
    }
  } catch (error) {
    console.error("Error fetching city name:", error);
    return "Error fetching city name";
  }
}
