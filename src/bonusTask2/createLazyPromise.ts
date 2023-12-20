
export function createLazyPromise(resolveDelay: number) {
    let timeoutId: NodeJS.Timeout;
    let cancelCb: () => void;

    const promise = new Promise<void>((resolve, reject) => {
        timeoutId = setTimeout(() => {
            if (timeoutId) {
                resolve();
            }
        }, resolveDelay);

        cancelCb = () => {
            reject({ message: 'Cancelled' });
        }

    });
    return {
        promise,
        cancel: () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
                cancelCb();
            }
        }
    }
}
