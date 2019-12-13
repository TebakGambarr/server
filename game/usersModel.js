// const User = require('./user');

// class Users {

//   constructor() {
//     this.users = {};
//     this.drawerIndex = 0;
//   }

//   addUser(username) {
//     this.users[username] = new User(username);
//   };

//   removeUser(username) {
//     this.users[username].deleteUser();
//     delete this.users[username];
//   };

//   find(username) {
//     return this.users[username];
//   };

//   nextDrawer() {
//     let list = this.getUserList(); //array
//     let drawer = list[this.drawerIndex];
//     this.drawerIndex += 1;
//     if (this.drawerIndex === list.length) {
//       this.drawerIndex = 0;
//     }
//     return drawer;
//   };

//   getUserList() {
//     return(Object.keys(this.users))
//   };

//   allReady() {
//     let userArray = this.getUserList();
//     let isReady = R.propEq('isReady', true);
//     // return R.all(isReady)(userArray);
//   };

//   unReadyAll() {
//     Object.keys(this.users).forEach(id => this.users[id].isReady = false);
//   };
// }

// let users;
// exports.Users = Users;
// exports.UsersInstance = (function () {
//   return function () {
//     if (!users) users = new Users();
//     return users;
//   }
// })();