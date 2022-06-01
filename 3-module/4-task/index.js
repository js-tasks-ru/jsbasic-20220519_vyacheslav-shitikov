// function showSalary(users, age) {
//   const showUsers = users.filter(user => user.age <= age);
//   const resultSort = showUsers.map(user => `${user.name}, ${user.balance}`);
//   return resultSort.join("\n");
// }

function showSalary(users, age) {
  return users.filter(user => user.age <= age).map(user => `${user.name}, ${user.balance}`).join("\n");
}
