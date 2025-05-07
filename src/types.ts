// create Result Type
// Create counter type? maybe class actually

export type AlgorithmResults = {
    counter: Counter,
    order: string[],
    time: number
}

export class Counter {
    val: number = 0;
}