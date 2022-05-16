'use strict';

// Math.js
// Math functions

export function erf(x) {
    var t = 1.0 / (1 + 0.5 * Math.abs(x))
    var c = [-1.26551223, 1.00002368, 0.37409196, 0.09678418, -0.18628806, 0.27886807, -1.13520398, 1.48851587, -0.82215223, 0.17087277]
    var tn = [1, t, t**2, t**3, t**4, t**5, t**6, t**7, t**8, t**9]
    var ctn = c.map(function(x, ind){
        return tn[ind] * x
    });
    var tau = t * Math.exp(-(x**2) + ctn.reduce(function(x, y){
        return x+y
    }));
    if (x < 0) {
        var result = tau-1;
    } else {
        var result = 1-tau;
    }
    return result;
}









































