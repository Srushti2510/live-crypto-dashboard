let numbers = [3, 8, 15, 20, 7, 10, 5];

let count = 0;

for(let i = 0; i < numbers.length; i++){
    if(numbers[i] % 2 === 0){
        count++;
    }
}

console.log("There are", count, "even numbers.");