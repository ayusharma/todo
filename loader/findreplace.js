/**
 * find & replace Webpack Loader
 * changes isEnabled(<query>) to true and false
 * 
 * Things to remeber:
 * Pass a valid regex from webpack config.
 * 
 * 
 * @param {string} source
 * @returns {string} modified source
 * 
 * @example
 * 
 * {
 *   test: /\.js$/,
 *   loader: path.resolve('loader/findreplace'),
 *   query: [
 *       {
 *           find: "isEnabled\\('filter'\\)",
 *           replace: 'true'
 *       }
 *   ]
 * }
 * 
 */
module.exports = function(source) {
  const query = JSON.parse(this.query.substring(1));
  return query.reduce((prev, current) => {
    const filterRegex = new RegExp(current.find, 'g');
    return prev.replace(filterRegex, current.replace);
  }, source);
};
