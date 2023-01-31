const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

class Field {
  constructor(arr) {
    this._arr = arr;
  }

  print() {
    for (let i = 0; i < this._arr.length; i++) {
      let str = this._arr[i].join("");
      console.log(str);
    }
  }

  playGame() {
    let running = true;
    let arrPos = 0;
    let currentArrayIndex = 0;

    while (running) {
      let direction = prompt("In which direction would you like to move in?");

      //Right movement
      if (direction === "r") {
        if (this._arr[arrPos][currentArrayIndex + 1] === fieldCharacter) {
          this._arr[arrPos][currentArrayIndex + 1] = pathCharacter;
          currentArrayIndex++;
          this.print();
        } else if (this._arr[arrPos][currentArrayIndex + 1] === hole) {
          console.log("You fell in a hole");
          running = false;
        } else if (this._arr[arrPos][currentArrayIndex + 1] === hat) {
          console.log("You win!");
          running = false;
        } else {
          console.log("Out of bounds");
          running = false;
        }
      }

      //Left movement
      else if (direction === "l") {
        if (this._arr[arrPos][currentArrayIndex - 1] === fieldCharacter) {
          this._arr[arrPos][currentArrayIndex - 1] = pathCharacter;
          currentArrayIndex--;
          this.print();
        } else if (this._arr[arrPos][currentArrayIndex - 1] === hole) {
          console.log("You fell in a hole");
          running = false;
        } else if (this._arr[arrPos][currentArrayIndex - 1] === hat) {
          console.log("You win!");
          running = false;
        } else {
          console.log("Out of bounds");
          running = false;
        }
      }

      //Down movement
      else if (direction === "d") {
        if (this._arr[arrPos + 1][currentArrayIndex] === fieldCharacter) {
          this._arr[arrPos + 1][currentArrayIndex] = pathCharacter;
          arrPos++;
          this.print();
        } else if (this._arr[arrPos + 1][currentArrayIndex] === hole) {
          console.log("You fell in a hole");
          running = false;
        } else if (this._arr[arrPos + 1][currentArrayIndex] === hat) {
          console.log("You win!");
          running = false;
        } else {
          console.log("out of bounds");
          running = false;
        }
      } 
      
      else if (direction === "x") {
        running = false;
      }
    }
  }

  static generateField(width, height) {
    let noOfArrays = height;
    let elementsInEachArray = width;
    let arr = [];
    let count = 0;
    let fieldChars = [fieldCharacter, hole]
    let random;
    for (let i = 0; i < noOfArrays; i++) {
      arr.push([]);
    }
    for (let j = 0; j < noOfArrays; j++) {
      for (let k = 0; k < elementsInEachArray; k++) {
        random = Math.floor(Math.random() * 2)
        arr[j].push(fieldChars[random])
      }
    }
    arr[0][0] = '*'

    let randomArray = getRandomInt(1, noOfArrays)
    let randomIndex = getRandomInt(1, elementsInEachArray)
    arr[randomArray][randomIndex] = hat
    return arr;
  }
}

let randomWidth = getRandomInt(1, 11)
let randomHeight = getRandomInt(1, 11)
const myField = new Field(Field.generateField(randomWidth, randomHeight));
myField.print()
myField.playGame()

