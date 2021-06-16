const findPath = (files) => {
    const paths = [];
    for (let file of files) {
        paths.push(file.key);
    }
    return paths;
};

module.exports = { findPath };
