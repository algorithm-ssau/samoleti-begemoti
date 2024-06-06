import type { Address } from "samolet-common";

export function formatAddress({ country, city, place }: Address) {
    return `${country} ${city} ${place}`;
}
