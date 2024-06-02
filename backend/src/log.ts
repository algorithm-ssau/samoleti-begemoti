// TODO: replace with logging library

export function log(message: string) {
    console.log(message);
}

export function testOnly(message: string) {
    log(message);
}

export function warn(message: string) {
    console.warn(message);
}
