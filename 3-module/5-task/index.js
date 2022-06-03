function getMinMax(str) {
  const nums = str
                .split(' ')
                .filter(value => isFinite(value))
                .map(value => parseFloat(value, 100));

  return {
    max: Math.max(...nums),
    min: Math.min(...nums)
  }
}
