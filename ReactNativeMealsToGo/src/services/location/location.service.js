import camelize from "camelize";

import { locations } from "./location.mock";

export const locationRequest = (searchTerm) => {
    return new Promise((resolve, reject) => {
        const locationMock = locations[searchTerm];
        if (!locationMock) {
            reject('Not found.')
        }

        resolve(locationMock);
    })
}

export const locationTransform = (result) => {
    const formattedResponse = camelize(result);
    const { geometry = {} } = formattedResponse.results[0];
    const { lng, lat } = geometry.location;

    return { lat, lng, viewport: geometry.viewport };
}