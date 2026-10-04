function calculateClassAverage(students, courseId) {
  const grades = students
    .map((student) => student.courses.find((course) => course.courseId === courseId))
    .filter((course) => course !== undefined)
    .map((course) => course.grade);

  if (grades.length === 0) return 0;

  const total = grades.reduce((sum, grade) => sum + grade, 0);
  return total / grades.length;
}

function findTopStudent(students) {
  return students.reduce((topStudent, currentStudent) => {
    return currentStudent.getAverage() > topStudent.getAverage() ? currentStudent : topStudent;
  });
}

function filterStudents(students, criteriaFn) {
  return students.filter(criteriaFn);
}

module.exports = { calculateClassAverage, findTopStudent, filterStudents };
