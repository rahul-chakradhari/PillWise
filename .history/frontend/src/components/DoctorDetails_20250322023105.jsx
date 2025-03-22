import { useSelector } from "react-redux";
import { store } from "../redux/store";

// DoctorDetails component
const DoctorDetails = ({ id }) => {
  const { doctors } = useSelector((store) => store.doctorKey);

  return (
    <div className="w-full h-screen">
      {doctors
        .filter((item) => item._id === id.toString())
        .map((item) => {
          return (
            <div key={item._id} className="card bg-base-100 shadow-sm w-full">
              <figure>
                <img
                  src={item.profileImage}
                  alt="Doctor"
                  className="w-full h-auto"
                />
              </figure>
              <div className="card-body flex">
                <h2 className="text-blue-500">{item.name}</h2>
                <p>
                  <strong>Specialization:</strong> {item.speciality}
                </p>
                <p>
                  <strong>Experience:</strong> {item.experience}
                </p>
                <p>
                  <strong>Availability:</strong>
                  {item.available ? "Available" : "Not Available"}
                </p>
                <p>
                  <strong>Contact:</strong> {item.phone}
                </p>
                <p>
                  <strong>Email:</strong> {item.email}
                </p>
                <p>
                  <strong>Languages Spoken:</strong>Hindi, English
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default DoctorDetails;
