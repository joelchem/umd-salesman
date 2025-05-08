import { Counter, type AlgorithmResults } from "../types";
import { countTraveltime } from "./buildings";

export async function allPermutations(buildings: string[]):  Promise<string[][]> {    
    
    if(Math.random() < 0.001) {
        await new Promise(r => setTimeout(r))
    }

    if(buildings.length == 0) {
        return [[],];
    }

    let out: string[][] = [];
    for (let b of buildings) {
        let tails = await allPermutations(buildings.filter(x => x !== b));
        for (let t of tails) {
            out.push([b].concat(t));
            if(Math.random() < 0.001) {
                await new Promise(r => setTimeout(r))
            }
        }
    }
    
    return out;
}

export function getTime(counter: Counter, order: string[]): number{
    let total = 0;
    order.forEach((b,i) => {
        total += countTraveltime(counter, b, order[(i+1)%order.length]);
    });
    return total;
}

export async function bruteForce(buildings: string[]): Promise<AlgorithmResults> {

    let start = Date.now();

    let counter = new Counter();
    let startBuilding = buildings[0]

    let perms = (await allPermutations(buildings.filter(x => x != startBuilding))).map(p => [startBuilding].concat(p));

    let fastestTotal = getTime(counter, perms[0]);
    let fastestPerm = perms[0]


    perms.forEach(perm => {
        let t = getTime(counter, perm);
        if (t < fastestTotal) {
            fastestTotal = t;
            fastestPerm = perm;

        }
    })
    let time = (Date.now() - start);
    return {counter, order: fastestPerm, time};

}

export async function twoOpt(buildings: string[]): Promise<AlgorithmResults> {
    
    let start = Date.now();
    let counter = new Counter();

    function twoOptSwap(order: string[], i: number, j: number): string[] {
        return order.slice(0,i).concat(order.slice(i,j+1).reverse()).concat(order.slice(j+1));
    }

    let nnRes = await nearestNeighbor(buildings);
    counter.val += nnRes.counter.val;

    let bestOrder = nnRes.order;
    let bestTime = getTime(counter, bestOrder);

    let changeMade = true;
    while(changeMade) {
        changeMade = false;
        let currBest = bestOrder;
        let currBestTime = bestTime;

        pairLoop: for(let i = 1; i < bestOrder.length-1; i++) {
            for(let j = i + 1; j < bestOrder.length; j++) {
                let tempRoute = twoOptSwap(bestOrder, i, j);
                let tempTime = getTime(counter, tempRoute);
                if(tempTime < currBestTime) {
                    currBest = tempRoute;
                    currBestTime = tempTime;
                    changeMade = true;
                }
            }
        }

        bestOrder = currBest;
        bestTime = currBestTime;

    }

    let time = (Date.now() - start);
    return {counter, order: bestOrder, time};
}

export async function nearestNeighbor(buildings: string[]) {

    let start = Date.now();
    let counter = new Counter();

    let order = [buildings[0],];
    buildings = buildings.filter(x => x != order[0]);
    
    while (buildings.length > 0) {

        let closestBuilding = buildings[0];
        let closestDist = Infinity;

        buildings.forEach(b => {
            let dist = countTraveltime(counter, b, order[order.length - 1]);
            if(dist < closestDist) {
                closestBuilding = b;
                closestDist = dist;
            }
        });

        order.push(closestBuilding);
        buildings = buildings.filter(x => x != closestBuilding);
    }

    let time = (Date.now() - start);
    return {counter, order, time};

}