let db = require('../config');

module.exports = {

  getAll: function () {
    return db.query('select messages.*, users.firstname, users.lastname\
     from users inner join messages on users.user_id=messages.user_id');
  },
  getUserEvents: function (userid) {
    return db.query('select event_id from users_events\
     where user_id = $1 and (current_status=\'accepted\' or\
      current_status=\'pending\')', [userid]);
  },

  getUserEvent: function (obj) {
    return db.query('select event_id from users_events\
     where user_id = $1 and event_id = $2 and (current_status=\'accepted\' or\
      current_status=\'pending\')', [obj.user_id, obj.event_id]);
  },
  
  getUserFriends: function (userid) {
    return db.query('select * from users inner join friends\
     on (users.user_id = friends.user2 and friends.user1 =$1)', [userid]);
  },

  getUserFriendsID: function (userid) {
    return db.query('select user_id from users inner join friends\
     on (users.user_id = friends.user2 and friends.user1 =$1)', [userid]);
  },

  getEventUsers: function (eventRequest) {
    return db.query('select * from users inner join users_events\
     on users.user_id = users_events.user_id\
      where users_events.event_id =${event_id}\
      and (users_events.current_status=${status}', eventRequest);
  },

  addUserFriend: function (friendRequest) {
    
    /*friend objects received in the form of
      {
        user_id: int
        friend_id: int
      }*/
    return db.one('insert into friends (user1, user2)\
      values (${user_id}, ${friend_id}) returning *', friendRequest);

  },

  getUsername: function (userid) {
    return db.one('select firstname, lastname from users where user_id=$1', [userid]);
  },

  write: function (message) {
    /*
      message objects received in the form of
      {
        user_id: int
        event_id: int
        text: string
        created: new Date()
        token: string
      }
    */

    return db.one('insert into messages (event_id, user_id, text, created)\
     values (${event_id}, ${user_id}, ${text}, ${created}) returning *', message);
  },

}