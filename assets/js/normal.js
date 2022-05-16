'use strict';

// normal.js
// Functions for Normal Distribution

import {erf} from './math.js';

export function dnorm(z) {
    return Math.exp(- (z**2) / 2) / Math.sqrt(2 * Math.PI)
}
 
export function pnorm(z, direction) {
    var x = z / Math.SQRT2
    if (direction == "left") {
        var area = 0.5 * (1 + erf(x))
    } else if (direction == "right") {
        var area = 1 - 0.5 * (1 + erf(x))
    } else if (direction == "middle") {
        if (z < 0) {
            var area = 1 - (1 + erf(x))
        } else {
            var area = (1 + erf(x)) - 1
        }
    } else {
        if (z < 0) {
            var area = (1 + erf(x))
        } else {
            var area = 2 - (1 + erf(x))
        }
    }
    return Math.abs(Math.round(area * 10000)/10000)
}