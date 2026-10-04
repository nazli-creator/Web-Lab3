const Student = require("./models");
const fetchStudents = require("./database");
const { calculateClassAverage, findTopStudent, filterStudents } = require("./analytics");

console.log("Fetching data from database...");

fetchStudents((rawData) => {
  console.log("Data received!");

  const students = rawData.map((data) => new Student(data.id, data.name, data.courses));

  console.log("\nTesting Immutability:");
  console.log(`Original ID: ${students[0].id}`);
  console.log("Attempting to change ID to 999...");
  students[0].id = 999;
  console.log(`Final ID: ${students[0].id} (Success: ID did not change)`);

  console.log("\n--- Analytics Report ---");

  const classAverage101 = calculateClassAverage(students, 101);
  console.log(`Class Average for Course 101: ${classAverage101.toFixed(2)}`);

  const topStudent = findTopStudent(students);
  console.log(`Top Student: ${topStudent.name} (Average: ${topStudent.getAverage().toFixed(2)})`);

  const course102Students = filterStudents(students, (student) =>
    student.courses.some((course) => course.courseId === 102)
  );
  console.log(`Students in Course 102: ${course102Students.map((s) => s.name).join(", ")}`);
});
