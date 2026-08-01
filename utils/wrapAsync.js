module.exports = function wrapAsync(fn) {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch((err) => {
            console.log("================================");
            console.log("ERROR NAME:", err.name);
            console.log("ERROR MESSAGE:", err.message);
            console.log("ERROR STACK:");
            console.log(err.stack);
            console.log("================================");
            next(err);
        });
    };
};