import React from 'react';
import '../Stylings/About.css';
const About = () => {
  return (
    <div className="about-container">
      <h1>About Our NoteNest App</h1>
      <p>Welcome to the Notebook App! Our app allows you to create, edit, and organize your notes efficiently. Whether you're a student, professional, or anyone who loves to jot down their thoughts, our app is designed to cater to your needs.</p>
      <p>Features:</p>
      <ul>
      <li>Login and signup functionality</li>
        <li>Create and save notes</li>
        <li>Edit and Delete existing notes</li>
        <li>Responsive and user-friendly interface</li>
      </ul>
      <p>We hope you enjoy using our app. Your feedback is valuable to us, so feel free to share your thoughts and suggestions.</p>
    </div>
  );
}

export default About;
