import React from "react";

const rewards = [
  {
    title: "Laxmi Medical Stores Raipur",
    img: "/laxmi.jpg",
    description:
      "Rajbandha Road Opp. Dr. B. R. Ambedkar Hospital (MEKHARA Gate No 2, Chhattisgarh 492001",
    points: "Ph No: 07714088185",
  },
  {
    title: "Sanjeevani CBCC USA Cancer Hospital",
    img: "/sanji.png",
    description:
      "In front of Jain Mandir, Davda Colony, Bhairav Society, Pachpedi Naka, Raipur, Mathpurena, Chhattisgarh 492091",
    points: "Ph No: 7389904010",
    sponsored: true, // Add a flag to indicate it's sponsored
  },
  {
    title: "RamKrishna Care Hospital",
    img: "/ram.webp",
    description:
      "Aurobindo Enclave, Dhamtari Rd, Pachpedi Naka, Raipur, Chhattisgarh 492001",
    points: "Ph No: 40 6810 6589",
  },
  {
    title: "Manish Medical Stores",
    img: "/manish.avif",
    description:
      "6JQH+FM5, Tatyapara, Kankalipara, Brahman Para, Raipur, Chhattisgarh 492001",
    points: "Ph No: 09098764654",
  },
  {
    title: "Seema Medicals",
    img: "/seema.jpg",
    description:
      "Nagdev Plaza Infornt of Raipur Hospital, Kutchery Chowk, Raipur, Chhattisgarh 492001",
    points: "Ph No: 08518887133",
  },
  {
    title: "Shivam Medical Stores",
    img: "/shivam.webp",
    description:
      "Tikrapara, Raipur, Dhamtari Road, Tikrapara, Raipur-Chhattisgarh - 492001 (Near Hardev Lala Mandir Chowk)",
    points: "Ph No: 9999999999",
  },
];

const Rewards = () => {
  return (
    <div className="rewards-container">
      {/* Centered Header */}
      <div className="rewards-header">
        <h6 className="iss">
          <i>
            Some Medicals and Hospitals nearby where we can reach out so to gain
            profit from this website
          </i>
        </h6>
        <button type="button" className="btn btn-success">
          Some Medicals and Hospitals
        </button>
      </div>

      {/* Rewards Grid */}
      <div className="rewards-grid">
        {rewards.map((reward, index) => (
          <div className="card" key={index}>
            <img src={reward.img} className="card-img-top" alt={reward.title} />

            <div className="card-body">
              {/* Sponsored Badge */}
              {reward.sponsored && (
                <span className="badge rounded-pill text-bg-success">
                  Sponsored
                </span>
              )}

              <h5 className="card-title">{reward.title}</h5>
              <h6 className="card-text">{reward.description}</h6>
              <a href="#" className="btn btn-primary">
                {reward.points}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rewards;
