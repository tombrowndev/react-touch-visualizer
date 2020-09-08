"use strict";

if(process.env.NODE_ENV === "production") {
    module.exports = require("./cjs/react-touch-visualizer.min.js");
} else {
    module.exports = require("./cjs/react-touch-visualizer.js");
}