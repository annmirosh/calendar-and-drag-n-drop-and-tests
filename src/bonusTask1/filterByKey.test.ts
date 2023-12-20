import { filterByKey } from "./filterByKey";

const data = [
    {
        id: 1,
        phone: '123',
        user: {
            name: {
                first: 'John',
                last: 'Doe',
            },
        },
        address: {
            street: '123 Main St',
            city: 'Anytown',
            state: 'CA',
        },
    },
    {
        id: 2,
        phone: '123',
        user: {
            name: {
                first: 'Jane',
                last: 'Doe',
            },
        },
        address: {
            street: '456 Oak St',
            city: 'Anytown',
            state: 'CA',
        },
    },
    {
        id: 3,
        phone: '456',
        user: {
            name: {
                first: 'John',
                last: 'Doe',
            },
        },
        address: {
            street: '789 Elm St',
            city: 'Othertown',
            state: 'NY',
        },
    },
    {
        id: 4,
        phone: '456',
        user: {
            name: {
                first: 'Bob',
                last: 'Smith',
            },
        },
        address: {
            street: '555 Pine St',
            city: 'Someville',
            state: 'CA',
        },
    },
    {
        id: 5,
        phone: '789',
        user: {
            name: {
                first: 'Jane',
                last: 'Smith',
            },
        },
        address: {
            street: '999 Maple St',
            city: 'Othertown',
            state: 'NY',
        },
    },
];

describe('filterByKey tests:', () => {

    it('filterByKey works for simple keys', () => {
        const result = filterByKey(data, 'phone');
        expect(result.length).toEqual(3);
        expect(result[0].id).toEqual(1);
        expect(result[1].id).toEqual(3);
        expect(result[2].id).toEqual(5);
    });

    it('filterByKey works for nested keys (e.g address.city)', () => {
        const result = filterByKey(data, 'address.city');
        expect(result.length).toEqual(3);
        expect(result[0].id).toEqual(1);
        expect(result[1].id).toEqual(3);
        expect(result[2].id).toEqual(4);
    });

    it('filterByKey works for nested keys (e.g user.name.first)', () => {
        const result = filterByKey(data, 'user.name.first');
        expect(result.length).toEqual(3);
        expect(result[0].id).toEqual(1);
        expect(result[1].id).toEqual(2);
        expect(result[2].id).toEqual(4);
    });
});
