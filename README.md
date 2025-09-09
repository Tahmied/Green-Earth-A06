# What is the difference between var, let, and const?
Although all of them are meant to declare variables but there are differences between how they behaves. 

var is function scoped, which means we can't access it out of the function its declared. Its hoisted, which means the declaration moves at the top and we can re-assign it.

let is block scoped, so its only accessible withing that block where we make it. Its only accissible withing its block like this - {...}

const is also block scoped like let. But we can't re-assign the value of it unlike let. 

# What is the difference between map(), forEach(), and filter()?
All of them are some methods of array, yet there are significan't differences between them. All of them makes it easier to handle each array items without dealing with complex loops.

map() method allows us to pass through each array item, and do some process what we can declare in the callback function which this method takes. It returns a new array which is modified according to our logic we define in the callback function. 
Basically it goes through each array item, runs our callback function and return a new array which is modified according to our callback function.

forEach() is similar to map, which goes through each array item, runs our callback function but it doesn't returns anything.  

The filter method runs our call back function, passes each array items in the callback function and  check if it fullfills the condition of that function. It returns a new array with those array items that fulfills the condition. 

# What are arrow functions in ES6?
Arrow functions is shorter and cleaner way to create a function in js. We can create a arrow function with this simple syntax like this -
(paramters)=> { 
        // our logic 
}

Its very easy to create a function with this since the syntax is really simple. If there's only one expression and no {}, it returns automatically. It does not have its own 'this' like a normal function. Its really useful when we need a short clean function ( specially like the callback functions ).

# How does destructuring assignment work in ES6?
Destructuring assignment in ES6 is a features that allows us to directly access the values from arrays or properties from object into variables using a shorter, simpler and readable syntax.

In array, we can extract values directly in variables by mathching its positions. For example - const [first, second, third] = ['red', 'green', 'blue'];
where the value of first is now red, second is now gree and third is now blue. We Also get a rest operator here and with it we can get a specific value from the array and the rest values can be assigned in another variable. 
const [first, ...rest] = [10, 20, 30, 40];
where the rest = [20, 30, 40]

In objects, we can extract properties from an object by matching keys. For example - 

const {courseName , roll} = {
        courseName : 'programmingHero',
        roll: 23234
}

where I can use the roll and courseName as a variable in my code. I can also rename a variable like this - 
const {courseName:name , roll} = {
        courseName : 'programmingHero',
        roll: 23234
}
now the value of name = programmingHero. we can also set a default value in the destructured variable if the value of it is not found in the object. 


# Explain template literals in ES6. How are they different from string concatenation?

Template literals in ES6 makes it easier to work with strings. Using template literals, its really easier to get variables in a string. Template literals are declared in backticks (`) unlike normal strings where we use single or double quotes ('' / ""). 
It supportes string interpolation, means we can get the values in strings like this - 

const courseName = 'programming hero';
const price = 5000;
const message = `The course ${courseName} costs ${price}`;
this using this ${}, we can get a value of any variables. We can also add any valid expressions like addition, multiplication or adding conditions in it, we can even call a function in it. For example - 

const a = 5;
const b = 10;
let expression = `total value is ${a+b}`
// calling a function in it
function great(){
        console.log('great')
}
console.log(great())
