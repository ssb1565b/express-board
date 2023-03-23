const arr = [1, 2, 3];
const one = arr[0];
const two = arr[1];
const three = arr[2];

console.log(one, two, three);

// 배열 구조분해 사용
const [deOne, deTwo, deThree] = arr;
console.log(deOne, deTwo, deThree);

// 날짜
const today = new Date(new Date().getTime() + 1000 * 60 * 60 * 9);
console.log(today.toISOString().slice(0, 10).split('-'));
const [a, b, c] = today.toISOString().slice(0, 16).split('-');
console.log(a, '년', b, '월', c, '일');

// 객체 구조 분해 할당 전
const obj = { firstName: '효석', lastName: '이' };

const { firstName, lastName } = obj;
// === const firstName = obj.firstName;
// === const lastName = obj.lastName;

console.log(firstName, lastName);

const person = {
  name: 'subin',
  address: {
    zipCode: '09876',
    city: 'Seoul',
  },
};

const {
  address: { zipCode, city },
} = person;

console.log(zipCode, city);
