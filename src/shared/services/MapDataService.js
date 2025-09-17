const requireJson = require.context('../data/map', false, /\.json$/);

const mapDataArray = requireJson
  .keys()
  .sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)?.[0] || 0, 10);
    const numB = parseInt(b.match(/\d+/)?.[0] || 0, 10);
    return numA - numB;
  })
  .map(fileName => {
    const data = requireJson(fileName);
    return data.default || data;
  });


export default {
  getAllMaps() {
    return mapDataArray;
  }
};