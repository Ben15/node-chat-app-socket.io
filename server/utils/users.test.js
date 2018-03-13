const expect = require('expect')

const {Users} = require('./users')


describe('Users', () => {
var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id:'1',
      name:'Mike',
      room: 'Node Course'
    },{
      id:'2',
      name:'Stacy',
      room: 'React Course'
    },{
      id:'3',
      name:'Kenny',
      room: 'Node Course'
    }];
  });

  it('should add new user', () => {
    let users = new Users();
    let user = {
      id: '123',
      name: 'Ben',
      room: 'Javascript'
    };

    let resUser = users.addUser(user.id, user.name, user.room)

    expect(users.users).toEqual([user])
    })

  it('should remove a user', () => {
    let userId = '1';
    let user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2)


  })
  it('should not remove a user', () => {
    let userId = '99';
    let user = users.removeUser(userId);

    expect(user).toBeFalsy()
    expect(users.users.length).toBe(3)


  })

  it('should find user', () => {
    let userId = '1'
    let findUser = users.getUser(userId)

    expect(findUser).toEqual({
      id:'1',
      name:'Mike',
      room: 'Node Course'
    })

  })

  it('should not find user', () => {
    let userId = '99'
    let findUser = users.getUser(userId)

    expect(findUser).toBeFalsy()
  })


  it('should return names for node course', () => {
    console.log(users);
    let userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Mike', 'Kenny'])
  })

  it('should return names for react course', () => {
    console.log(users);
    let userList = users.getUserList('React Course');

    expect(userList).toEqual(['Stacy'])
  })


})
