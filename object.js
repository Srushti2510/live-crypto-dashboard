// Objects use keys to label the data
let devProfile = {
    username: "Arun",
    targetRole: "MERN Intern",
    streak: 3,
    skills: ["JavaScript", "React", "MongoDB"] // You can easily put arrays inside objects
};

// 1. Read the whole object
console.log(devProfile);

// 2. Access specific data using dot notation (.)
console.log(`Developer ${devProfile.username} is on a ${devProfile.streak}-day streak.`);

// 3. Update a value inside the object
devProfile.streak = 4;
console.log(`Streak updated to: ${devProfile.streak}`);