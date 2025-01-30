async function fetchAnimalExcerpt(animal) {
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${animal}`
    );
    const data = await response.json();
    return data;
}

export {
    fetchAnimalExcerpt
}