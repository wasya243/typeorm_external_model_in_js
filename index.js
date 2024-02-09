const typeorm = require('typeorm')
const { User, Admin } = require('typeorm-models');

const dataSource = new typeorm.DataSource({
  type: 'mysql',
  host: 'your_host',
  port: 3306,
  username: 'your_user',
  password: 'your_pass',
  database: 'your_db',
  entities: [User, Admin],
  synchronize: true,
});

dataSource
  .initialize()
  .then(async function () {
    const user = {
      firstName: 'test name',
      lastName: 'test last name'
    };

    const userRepository = dataSource.getRepository(User);

    userRepository
      .save(user)
      .then(function (savedUser) {
        console.log('User has been saved: ', savedUser);
        console.log('Now lets load all users: ');

        return userRepository.find();
      })
      .then(function (users) {
        console.log("All users: ", users)
        process.exit(0);
      })
  })
  .catch(function (error) {
    console.log("Error: ", error);
    process.exit(1);
  })