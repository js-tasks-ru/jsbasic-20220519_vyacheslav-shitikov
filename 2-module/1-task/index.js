function sumSalary(salaries) {
  let sum = 0;
  for (let salary in salaries) {
    if (salaries[salary] && typeof salaries[salary] == 'number' && isFinite(salaries[salary])) {
      sum += salaries[salary];
    }
  }
  return sum;
}
