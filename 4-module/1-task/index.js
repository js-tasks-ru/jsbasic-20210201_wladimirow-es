function makeFriendsList(friends) {
  let result = document.createElement('ul');
  let friendList = friends.map(friend => '<li>' + friend.firstName + ' ' + friend.lastName + '</li>');
  result.insertAdjacentHTML("afterbegin", friendList.join(''));

  return result;
}
