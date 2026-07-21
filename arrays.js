// Arrays hold multiple values in a single box, wrapped in square brackets
let techStack = ["MongoDB", "Express", "React", "Node"];

// 1. Print the entire list
console.log(techStack);

// 2. Access just one specific item (React is at index 2, not 3!)
console.log(`My frontend framework will be: ${techStack[2]}`);

// 3. Add a new skill to the end of the list using .push()
techStack.push("TailwindCSS");
console.log(`Updated Stack: ${techStack}`);


// The Loop: Start at 0, keep going as long as we haven't hit the end of the array, and go up by 1 each time.
for (let i = 0; i < techStack.length; i++) {
    console.log(`Skill ${i + 1}: ${techStack[i]}`);
}