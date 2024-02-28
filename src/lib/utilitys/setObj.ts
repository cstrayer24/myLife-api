export default function setObj<T>(keys: string[], baseobj: object) {
  let userObj: T = {} as T;
  for (let i = 0; i < keys.length; i++) {
    let current = keys[i];
    userObj[current] = baseobj[current];
  }
  return userObj;
}
