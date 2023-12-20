import { createLazyPromise } from "./createLazyPromise";
import isPromise from 'is-promise';

describe('createLazyPromise tests:', () => {

    it('lazy promise contains promise and cancel method', () => {
        const lazyPromise = createLazyPromise(100);
        expect(isPromise(lazyPromise.promise)).toEqual(true);
        expect(typeof lazyPromise.cancel).toEqual('function');
    });

    it('lazy promise can be resolved after specific delay', async () => {
        const lazyPromise = createLazyPromise(200);
        await expect(lazyPromise.promise).resolves.toEqual(undefined);
    });

    it('lazy promise can be cancelled before it is resolved', async () => {
        const lazyPromise = createLazyPromise(2000);
        setTimeout(() => {
            lazyPromise.cancel();
        }, 100);
        await expect(lazyPromise.promise).rejects.toEqual({ "message": "Cancelled" });
    });

});
