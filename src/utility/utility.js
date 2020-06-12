import sun from '../icons/sun.svg'
import rain from '../icons/rain.svg'
import cloudy from '../icons/cloudy.svg'
import drizzle from '../icons/drizzle.svg'
import thunderstorm from '../icons/thunderstorm.svg'

export function getWeather(id) {
    // '800': sun,
    // '50x': rain,
    // '80x': cloudy,
    // '30x': 'drizzle',
    // '20x': 'thunderstorm'

    switch (id) {
        case 800:
            return {
                icon: sun,
                label: 'Sunny'
            };
        case 801:
        case 802:
        case 803:
        case 804:
            return {
                icon: cloudy,
                label: 'Cloudy'
            };
        case String(id).includes('30'):
            return {
                icon: drizzle,
                label: 'Light rain'
            };
        case String(id).includes('20'):
            return {
                icon: thunderstorm,
                label: 'Heavy rain'
            };
        default:
            return {
                icon: rain,
                label: 'Rain'
            };
    }
}