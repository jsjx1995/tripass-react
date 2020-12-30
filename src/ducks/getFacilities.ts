const BASE_URL = 'http://localhost:3000/';

const getFacilities = async (genres: string[], lat: number, lng: number) => {
  const genres_params = genres.reduce((prev: string, current: string) => {
    prev += `genres[]=${current}&`;
    return prev;
  }, 'queries?');
  const geo_params = `lat=${lat}&lng=${lng}`;

  console.log(BASE_URL + 'facility/' + genres_params + geo_params);
  // const response: any = await fetch(BASE_URL + 'facility', {
  //   method: 'GET',
  // });
  // const json = await response.json();
  // if (!response.ok) throw new Error(json.message);
  // return json;
};

export default getFacilities;
