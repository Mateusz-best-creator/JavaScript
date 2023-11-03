import {mocks, mockImages} from './mock/index';
import camelize from 'camelize';

export const restaurantsRequest = (location) => {
    return new Promise((resolve, reject) => {
        const mock = mocks[location];
        if (!mock) {
            reject('Not Found.');
        }

        resolve(mock);
    })
}

export const restaurantTransform = ({ results = [] }) => {
    const mappedResult = results.map((restaurant) => {
        restaurant.photos = mockImages.map((_) => {
            const randomIndex = Math.floor(Math.random() * mockImages.length);
            return mockImages[randomIndex]
        })
        return {
            ...restaurant,
            isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
            isTemporarilyClosed: restaurant.business_status === 'CLOSED_TEMPORARILY',
        }
    })

    return camelize(mappedResult);
}