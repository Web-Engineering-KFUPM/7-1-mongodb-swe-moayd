import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://shahatmoayd_db_user:1122334455mM@cluster0.rmcpkds.mongodb.net/TestDB";

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  major: String,
});

const Student = mongoose.model("Student", studentSchema);

async function createStudents() {
  await Student.insertMany([
    { name: "Ali", age: 21, major: "CS" },
    { name: "Sara", age: 23, major: "SE" },
  ]);
  console.log("Inserted students");
}

async function readStudents() {
  const all = await Student.find();
  console.log(all);
}

async function updateStudent() {
  await Student.updateOne({ name: "Ali" }, { age: 22 });
  console.log("Updated Ali");
}

async function deleteStudent() {
  await Student.deleteOne({ name: "Sara" });
  console.log("Deleted Sara");
}

async function main() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    await createStudents();
    await readStudents();
    await updateStudent();
    await deleteStudent();
    await readStudents();
  } catch (error) {
    console.error("MongoDB error:", error.message);
  } finally {
    await mongoose.connection.close();
  }
}

main();
