// smallest number

let numbers = [15, 42, 8, 99, 27, 63];

let smallest=numbers[0];
for(let i=1;i<numbers.length;i++){
    if(numbers[i]<smallest){
        smallest=numbers[i];
    }
}
    console.log("Smallest number is ",smallest);


// largest number

let numbers = [15, 42, 8, 99, 27, 63];

let largest=numbers[0];
for(let i=1;i<numbers.length;i++){
    if(numbers[i]>largest){
        largest=numbers[i];
    }
}
    console.log("Largest number is ",largest);


// addition of all elements

let numbers = [15, 42, 8, 99, 27, 63];

let sum=0;
for(let i=0;i<numbers.length;i++){
    sum=sum+numbers[i];
}
    console.log("Sum of the numbers is ",sum);

// Average of the elements of the array

let numbers = [15, 42, 8, 99, 27, 63];

let sum=0;
for(let i=0;i<numbers.length;i++){
    sum=sum+numbers[i];
}
let avg=sum/numbers.length;
    console.log("Average of numbers is ",avg);

// reverse an array

let numbers = [15, 42, 8, 99, 27, 63];

for(let i = numbers.length - 1; i >= 0; i--){
    console.log(numbers[i]);
}


