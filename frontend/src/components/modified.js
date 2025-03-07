import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    bloodGroup: "",
    address: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Submit form data to backend using axios 
  };

  return (
    <div className="signup p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <h6 className="text-sm text-gray-600 mb-4">
          <i>* Only for new Users</i> <br />
          <i>* If already signed in, please login</i> <br />
          <i>* Password must be at least 8 characters long</i>
          <br />
          <i>* Use a strong password with a mix of characters and letters</i>
        </h6>
        <div className="mb-3">
          <label htmlFor="name" className="form-label block mb-1">
            Name
          </label>
          <input
            type="text"
            className="form-input w-full p-2 border rounded"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label block mb-1">
            Email address
          </label>
          <input
            type="email"
            className="form-input w-full p-2 border rounded"
            id="email"
            name="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <small className="text-gray-500">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label block mb-1">
            Password
          </label>
          <input
            type="password"
            className="form-input w-full p-2 border rounded"
            id="password"
            name="password"
            placeholder="Enter a strong password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label block mb-1">
            Age
          </label>
          <select
            className="form-select w-full p-2 border rounded"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select
            </option>
            <option value="0-5">Age (0 - 5 years)</option>
            <option value="6-10">Age (6 - 10 years)</option>
            <option value="11-17">Age (11 - 17 years)</option>
            <option value="18-40">Adult (18 - 40 years)</option>
            <option value="41+">Veterans (41+ years)</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label block mb-1">
            Gender
          </label>
          <select
            className="form-select w-full p-2 border rounded"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="transgender">Transgender</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="bloodGroup" className="form-label block mb-1">
            Blood Group
          </label>
          <select
            className="form-select w-full p-2 border rounded"
            id="bloodGroup"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select
            </option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label block mb-1">
            Address
          </label>
          <input
            type="text"
            className="form-input w-full p-2 border rounded"
            id="address"
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label block mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-input w-full p-2 border rounded"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="10-digit phone number"
            pattern="[0-9]{10}"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
