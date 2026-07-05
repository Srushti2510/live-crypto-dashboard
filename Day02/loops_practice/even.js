// ===============================
// Program 2 - Print Even Numbers (Method 1)
// ===============================

for (let i = 2; i <= 20; i++) {
    if (i % 2 === 0) {
        console.log(i);
    }
}

// ===============================
// Program 3 - Print Even Numbers (Optimized)
// ===============================

for (let i = 2; i <= 20; i += 2) {
    console.log(i);
}