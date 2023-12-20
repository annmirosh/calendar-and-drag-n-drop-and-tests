
import * as _ from 'lodash';

export function filterByKey<T>(data: T[], key: string): T[] {
    const foundValues: Record<string, boolean> = {};
    const resultArr = [];

    for (let i = 0; i < data.length; i++) {
        const valueByKey = _.get(data[i], key);
        if (valueByKey && !foundValues[valueByKey]) {
            foundValues[valueByKey] = true;
            resultArr.push(data[i]);
        }
    }

    return resultArr;
}
