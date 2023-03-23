const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(arr);
console.log(...arr);

const obj = {
  name: '송수빈',
  status: '공부중',
};
const obj2 = {
  age: 26,
  gender: 'female',
};

console.log(obj);

const subinData = {
  ...obj,
  ...obj2,
};
console.log(subinData);
// key와 value값은 객체안에 있어야하기때문에 {}안에서 실행해야함

const arr1 = [1, 2, 3];
const arr2 = ['1', '2', '3'];

const merge = [...arr1, ...arr2];
console.log(merge);

const text = 'test';
console.log([...text]);
console.log({ ...text });
console.log(...text);

const test = {
  name: '송수빈',
  gender: 'F',
  nickName: '두비두밥',
  email: 'ssb1565b@naver.com',
};

const { name, gender, ...restInfo } = test;

console.log(name, gender, restInfo);

const [firstName, ...rest] = arr;
console.log(firstName, rest);

function spread(first, second, ...rest) {
  console.log('first', first);
  console.log('second', second);
  console.log('rest', rest);
}
spread(1, 2, 3, 4, 5, 6, 7, 8, 8);
