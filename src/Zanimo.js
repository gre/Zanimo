// Zanimo.js
// (c) 2011-2012 Paul Panserrieu

var Zanimo = (function () {

    var VERSION = "0.0.1",

        Z = function (domElt) {
            var d = Q.defer();
            d.resolve(domElt);
            return d.promise;
        };

    Z.kDelta = 100;

    Z.when = Q.when;

    Z.delay = function (ms, domElt) {
        var d = Q.defer();
        setTimeout(function () { d.resolve(domElt || ms); }, ms);
        return d.promise;
    };

    Z.transition = function (domElt, attr, value, duration, timing) {
        var d = Q.defer(),
            pos = -1;

        if (!domElt || !domElt.nodeType || !(domElt.nodeType >= 0)) {
            d.resolve(Q.fcall(function () {
                throw new Error("Zanimo transition: no given dom Element!");
            }));
            return d.promise;
        }

        var timeout,
            cb = function (evt) {
                if (timeout) { clearTimeout(timeout); timeout = null }
                d.resolve(domElt);
                // FIXME just remove what you need to remove and not all transitions
                //Zanimo.utils.removeTransition(domElt, attr);
                //domElt.style.webkitTransition = "";
                //domElt.style.webkitTransitionDuration = "";
                //domElt.style.webkitTransitionTimingFunction = "";
                domElt.removeEventListener(
                    Zanimo.utils.prefix.evt,
                    cb,
                    false
                );
            };

        domElt.addEventListener(Zanimo.utils.prefix.evt, cb, false);

        timeout = setTimeout(function() {
          d.reject(new Error("Zanimo transition: " + domElt.id + " with " + attr + ":" + value));
        }, duration + Z.kDelta);

        pos = Zanimo.utils.addTransition(domElt, attr);
        Zanimo.utils.setAttributeAt(domElt, "TransitionDuration", duration + "ms", pos);
        Zanimo.utils.setAttributeAt(domElt, "TransitionTimingFunction", timing || "linear", pos);
        Zanimo.utils.setProperty(domElt, attr, value);

        return d.promise;
    };

    return Z;
})();
