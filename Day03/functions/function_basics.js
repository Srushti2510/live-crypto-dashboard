// Function 1: Greeting

function greet(name) {
    console.log("Hello", name);
}

greet("Srushti");
greet("ChatGPT");


// Function 2: Addition using return

function add(a, b) {
    return a + b;
}

let result = add(7, 8);
console.log("Result is", result);


// Function 3: Square

function square(num) {
    return num * num;
}

let answer = square(9);
console.log("Square is", answer);


// Function 4: Check if a number is even

function isEven(num) {
    if (num % 2 === 0) {
        return true;
    } else {
        return false;
    }
}

let check = isEven(14);
console.log(check);

check = isEven(17);
console.log(check);

// Function 5: largest number

function findLargest(a,b){
    if (a>b){
    return a;
    }
    else{
    return b;
    }
}

let result  = findLargest(15, 27);
console.log(result,"is Largest");

// Function 6: Check if a number is Positive, Zero, or Negative

function isPositive(num) {
    if (num > 0) {
        return 1;
    } else if (num === 0) {
        return 0;
    } else {
        return -1;
    }
}

// Test Cases
console.log(isPositive(10));   // 1
console.log(isPositive(0));    // 0
console.log(isPositive(-8));   // -1

//Function 7 - Calculator

function calculator(a, b,operation) {
    if (operation === "+") {
        return a+b;
}
   else if (operation === "-"){
       return a-b;
   }
   
   else if (operation === "*"){
       return a*b;
   }
   
   else{
       return a/b;
   }
}

console.log(calculator(10, 5, "+"));
console.log(calculator(10, 5, "-"));
console.log(calculator(10, 5, "*"));
console.log(calculator(10, 5, "/"));

// grade calculator

function getGrade(marks) {
    if (marks<100 && marks>=90) {
        return "A";
}
   else if (marks<89 && marks>=80){
       return "B";
   }
   
   else if (marks<79 && marks>=70){
       return "C";
   }
   
   else if (marks<69 && marks>=60){
       return "D";
   }
   
   else if (marks<60 && marks>=0){
       return "F";
   }
   
   else{
       return "Invalid";
   }
}

console.log(getGrade(95));
console.log(getGrade(83));
console.log(getGrade(74));
console.log(getGrade(68));
console.log(getGrade(45));
console.log(getGrade(120));
console.log(getGrade("hello"));
console.log(getGrade(-49));