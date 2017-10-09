
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, first_name: 'jack', last_name: 'bader', email: 'jacktbader5@gmail.com', username: 'jbader', hashed_password: 'sl345kjh534kl5h3453j4l'},
        {id: 2, first_name: 'dalton', last_name: 'winter', email: 'daltonwinter@gmail.com', username: 'dwinter', hashed_password: 'sl345ksdfljkh389433453j4l'},
        {id: 3, first_name: 'brodie', last_name: 'balser', email: 'brodiebalser@gmail.com', username: 'bbalser', hashed_password: 'jsdhflshdf3o78t9p45h53j4l'},
      ]);
    });
};
