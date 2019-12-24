
const getName = (string) => {
  if (string === 0) {
    return '我'
  } else {
    return '他'
  }
}

const getAge = (string) => {
  if (string === 0) {
    return string + '岁'
  } else {
    return string + '岁'
  }
}

export default {
  getName,
  getAge
}
