import React, { useState, useEffect } from 'react';
import './StudentForm.css';

const StudentForm = ({ fetchStudents, editingStudent, setEditingStudent }) => {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    course: '',
    age: '',
    department: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (editingStudent) {
      setStudent(editingStudent);
    } else {
      setStudent({
        name: '',
        email: '',
        course: '',
        age: '',
        department: '',
        phone: '',
        address: ''
      });
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingStudent) {
        // PUT request to update
        await fetch(`http://localhost:8080/api/students/${editingStudent.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(student),
        });
      } else {
        // POST request to add
        await fetch('http://localhost:8080/api/students', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(student),
        });
      }

      fetchStudents();
      setEditingStudent(null);
      setStudent({
        name: '',
        email: '',
        course: '',
        age: '',
        department: '',
        phone: '',
        address: ''
      });
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>{editingStudent ? 'Edit Student' : 'Add Student'}</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={student.name} onChange={handleChange} placeholder="Name" required />
        <input name="email" value={student.email} onChange={handleChange} placeholder="Email" required />
        <input name="course" value={student.course} onChange={handleChange} placeholder="Course" />
        <input name="age" type="number" value={student.age} onChange={handleChange} placeholder="Age" />
        <input name="department" value={student.department} onChange={handleChange} placeholder="Department" />
        <input name="phone" value={student.phone} onChange={handleChange} placeholder="Phone" />
        <input name="address" value={student.address} onChange={handleChange} placeholder="Address" />
        <button type="submit">{editingStudent ? 'Update Student' : 'Add Student'}</button>
      </form>
    </div>
  );
};

export default StudentForm;
