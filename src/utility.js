import sun from './icons/sun.svg'
import rain from './icons/rain.svg'
import cloudy from './icons/cloudy.svg'

export function getIcon(id) {
    // '800': sun,
    // '50x': rain,
    // '80x': cloudy,
    // '30x': 'drizzle',
    // '20x': 'thunder'

    switch (id) {
        case 800:
            return sun;
        case 801:
        case 802:
        case 803:
        case 804:
            return cloudy;
        default:
            return rain;
    }
}