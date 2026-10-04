# University Course Management System – Assignment 3

This assignment builds the core logic of a university grading system in JavaScript. Student data is fetched from a simulated asynchronous server, modeled with ES6 classes that have immutable IDs, and used to generate an analytics report.

## File Organization

```
lab3/
├── models.js       # Student class: read-only id via Object.defineProperty(), addCourse() and getAverage()
├── database.js     # fetchStudents(callback): returns raw student data after a 2-second setTimeout
├── analytics.js    # calculateClassAverage(), findTopStudent() with .reduce(), filterStudents()
├── main.js         # Entry point: fetches data, creates Student instances, tests immutability, prints report
└── README.md       # This file
```

## Challenges I Faced

- **Keeping all logic inside the callback:** The student data only exists after the 2-second delay simulated by `setTimeout`, so every step that depends on it — creating `Student` instances, testing immutability, running the analytics — had to live inside the `fetchStudents` callback. Code placed after the call would otherwise run before the data arrived.
- **Making the id assignment fail silently:** Since the files use `require`/`module.exports` instead of ES modules, they are not automatically in strict mode, so `students[0].id = 999` fails silently instead of throwing — which matches the expected output exactly without needing a `try/catch`.
- **Using `.reduce()` without an initial value:** For `findTopStudent()`, leaving out the initial value meant the first student became the starting accumulator, and each comparison had to correctly return whichever student had the higher `getAverage()`.
- **Matching grades to the right course:** For `calculateClassAverage()`, I used `.find()` to pull out each student's grade for a specific `courseId`, then `.filter()` to drop any `undefined` results from students who hadn't taken that course, so they wouldn't skew the average.
