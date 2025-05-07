import type { Counter } from "../types";

export const buildings = await (await fetch("building-names.json")).json();

const traveltimes = await (await fetch("traveltimes.json")).json();

export function countTraveltime(counter: Counter, b1: string, b2: string) {
    counter.val += 1;
    return getTraveltime(b1, b2);
} 

export function getTraveltime(b1: string, b2: string) {
    if(!b1 || !b2) {
        console.log(b1, b2)
    }
    b1 = b1.substring(0,3);
    b2 = b2.substring(0,3);

    let key = [b1, b2].sort().join(" ");

    return traveltimes[key];
}
