import { Counter } from "../types";
import { countTraveltime } from "./buildings";

export function allPermutations(buildings: string[]) {
    if(buildings.length == 0) {
        return [[],];
    }

    let out: string[][] = [];
    buildings.forEach(b => {
        let tails = allPermutations(buildings.filter(x => x != b));
        tails.forEach(t => {
            out.push([b].concat(t))
        })
    })
    return out;
}

export function getTime(counter: Counter, order: string[]) {
    let total = 0;
    order.forEach((b,i) => {
        total += countTraveltime(counter, b, order[(i+1)%order.length]);
    });
    return total;
}

export async function bruteForce(buildings: string[]) {

    let counter = new Counter();

    let perms = allPermutations(buildings);
    let fastestTotal = getTime(counter, perms[0]);
    let fastestPerm = perms[0]


    perms.forEach(perm => {
        let t = getTime(counter, perm);
        if (t < fastestTotal) {
            fastestTotal = t;
            fastestPerm = perm;

        }
    })
    return {counter, order: fastestPerm};

}

export async function twoOpt(buildings: string[]) {

}

export async function nearestNeighbor(buildings: string[]) {

}