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

export function clearCanvas(context) {
    context.clearRect(0, 0, 480, 270);
}

export function XC(x, p) {
    return (x - p.minX) / p.rangeX * p.Width;
}

export function YC(y, p) {
    return p.Height - (y - p.minY) / p.rangeY * p.Height;
}

export function drawAxes(context, gpar, deltaX, adjust) {
    var xpar = {"minX":gpar.minX, "rangeX":gpar.maxX-gpar.minX, "Width":gpar.Width};
    var ypar = {"minY":gpar.minY, "rangeY":gpar.maxY-gpar.minY, "Height":gpar.Height};

    context.save();
    context.lineWidth = 1;
    context.strokeStyle = "rgb(255, 255, 255)";
    context.font = "14px Arial";
    context.fillStyle = "#eaeaea";
}

export function circle(context) {
    context.beginPath();
    context.arc(95, 50, 40, 0, 2 * Math.PI);
    context.stroke();
}








































