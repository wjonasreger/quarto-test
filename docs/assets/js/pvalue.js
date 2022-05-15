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

export function drawLine(context, x0, x1, y0, y1) {
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.stroke();
}

export function rescale(value, limits, size) {
    return (value - limits.min) / (limits.max - limits.min) * size;
}

export function drawAxes(context) {
    context.save();
    context.lineWidth = 1;
    context.strokeStyle = "rgb(255, 255, 255)";
    context.font = "14px Arial";
    context.fillStyle = "#eaeaea";

    // X Values
    var xvals = {"min": -3.5, "max": 3.5};
    var xgraph = {"min": 20 + rescale(xvals.min, xvals, 440), "max": 20 + rescale(xvals.max, xvals, 440)};

    // Y Values
    var yvals = {"min": 0, "max": dnorm(0)};
    var ygraph = {"min": 20 + rescale(yvals.min, yvals, 230), "max": 20 + rescale(yvals.max, yvals, 230)};
    
    // Axes
    drawLine(context, xgraph.min, xgraph.max, ygraph.max, ygraph.max);
    var xgraph_mean = (xgraph.min + xgraph.max) / 2
    drawLine(context, xgraph_mean, xgraph_mean, ygraph.min-5, ygraph.max+5);
    
    context.restore();
}

export function drawTicks(context) {
    context.save();
    context.lineWidth = 1;
    context.strokeStyle = "rgb(255, 255, 255)";
    context.font = "14px Arial";
    context.fillStyle = "#eaeaea";

    for (var i = -3; i <= 3; i++) {
        var xvals = {"min": -3.5, "max": 3.5};
        var xgraph = 20 + rescale(i, xvals, 440);
        drawLine(context, xgraph, xgraph, 245, 255);
        context.fillText(i, xgraph-3, 270)
    }
}

export function drawCurve(context) {
    // X limits and iterative delta value
    var xvals = {"min": -3.5, "max": 3.5};
    var step = (xvals.max - xvals.min) / 440;

    // Iterate drawing lines for curve
    for (var i = xvals.min; i < xvals.max; i += step) {
        // X graph values
        var xgraph = {"min": 20 + rescale(i, xvals, 440), "max": 20 + rescale(i+step, xvals, 440)};
        // Y limits and graph values
        var yvals = {"min": 0, "max": dnorm(0)};
        var ygraph = {"min": 20 + rescale(dnorm(i), yvals, 230), "max": 20 + rescale(dnorm(i+step), yvals, 230)};
        // Draw lines for curve
        drawLine(context, xgraph.min, xgraph.max, 270-ygraph.min, 270-ygraph.max);
    }
}

export function zscoreLine(context, zscore) {
    var xgraph = 20 + rescale(zscore, {"min":-3.5, "max":3.5}, 440);
    var ygraph = 250 - rescale(0, {"min":0, "max":dnorm(0)}, 230);
    drawLine(context, xgraph, xgraph, 20, ygraph);
}

export function shadeArea(context, zscore, direction) {
    context.save();
    context.lineWidth = 1;
    context.strokeStyle = "rgb(255, 255, 255)";
    context.font = "14px Arial";
    context.fillStyle = "#eaeaea";

    var xlim = {"min":-3.5, "max":3.5};
    var areas = 1;
    if (direction=="left") {
        var xvals = {"min": -3.5, "max": zscore};
    } else if (direction==="right") {
        var xvals = {"min": zscore, "max": 3.5};
    } else if (direction==="middle") {
        var xvals = {"min": -Math.abs(zscore), "max": Math.abs(zscore)};
    } else {
        var xvals = {"min": -Math.abs(zscore), "max": Math.abs(zscore)};
        var areas = 2;
    }

    if (areas == 1) {
        var xgraph = {"min": 20+rescale(xvals.min, xlim, 440),
    "max": 20+rescale(xvals.max, xlim, 440)};
        var step = (xvals.max - xvals.min) / (xgraph.max-xgraph.min);
        var size = (xgraph.max-xgraph.min);
        for (var i = xvals.min; i <= xvals.max; i += step) {
            // X graph values
            var xgraph = 20 + rescale(i, xlim, 440);
            // Y limits and graph values
            var yvals = {"min": 0, "max": dnorm(0)};
            var ygraph = {"min": 20 + rescale(0, yvals, 230), "max": 20 + rescale(dnorm(i), yvals, 230)};
            // Draw lines for curve
            drawLine(context, xgraph, xgraph, 270-ygraph.min, 270-ygraph.max);
        }
    } else {
        var xgraph = {"min": 20+rescale(xvals.min, xlim, 440),
    "max": 20+rescale(xvals.max, xlim, 440)};
        var step = (3.5 - xvals.max) / (460-xgraph.max);
        var size = (xgraph.max-xgraph.min);
        for (var i = -3.5; i <= xvals.min; i += step) {
            // X graph values
            var xgraph = 20 + rescale(i, xlim, 440);
            // Y limits and graph values
            var yvals = {"min": 0, "max": dnorm(0)};
            var ygraph = {"min": 20 + rescale(0, yvals, 230), "max": 20 + rescale(dnorm(i), yvals, 230)};
            // Draw lines for curve
            drawLine(context, xgraph, xgraph, 270-ygraph.min, 270-ygraph.max);
        }
        for (var i = xvals.max; i <= 3.5; i += step) {
            // X graph values
            var xgraph = 20 + rescale(i, xlim, 440);
            // Y limits and graph values
            var yvals = {"min": 0, "max": dnorm(0)};
            var ygraph = {"min": 20 + rescale(0, yvals, 230), "max": 20 + rescale(dnorm(i), yvals, 230)};
            // Draw lines for curve
            drawLine(context, xgraph, xgraph, 270-ygraph.min, 270-ygraph.max);
        }
    }
}

export function plotGraph(context, zscore, direction) {
    drawAxes(context);
    drawTicks(context);
    drawCurve(context);
    zscoreLine(context, zscore);
    shadeArea(context, zscore, direction);
}

export function circle(context) {
    context.beginPath();
    context.arc(95, 50, 40, 0, 2 * Math.PI);
    context.stroke();
}








































