/**
 * Random UUID generator.
 * 
 * eg. f1cb6925-c158-6134-3e05-ebbdeecf2c8e
 */
export default function () {
    const s4 = function () {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
};