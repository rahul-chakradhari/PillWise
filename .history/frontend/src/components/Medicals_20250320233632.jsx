import React from "react";

const rewards = [
  {
    title: "Laxmi Medical Stores Raipur",
    img: "/laxmi.jpg",
    description:
      " Rajbandha Road Opp. Dr. B. R. Ambedkar Hospital (MEKHARA Gate No 2, Chhattisgarh 492001",
    points: " Ph No: 07714088185",
  },
  {
    title: "Bhagyalaxmi Medical Store",
    img: "/bhagya.avif",
    description:
      " front of shantiniketan school, opposite gate no 2, opposite adarsh nagar, Adarsh Nagar, Dubey Colony, Mowa, Raipur, Chhattisgarh 492001",
    points: "Ph No: 07000767203",
  },
  {
    title: "Shree Ganesh Medical Store",
    img: "/ganesh.avif",
    description:
      ": Baudha Vihar, New, near Government School, Changurabhata, Raipur, Chhattisgarh 492013",
    points: "Ph No: 08770864372",
  },
  {
    title: "Manish Medical Stores",
    img: "/manish.avif",
    description:
      " 6JQH+FM5, Tatyapara, Kankalipara, Brahman Para, Raipur, Chhattisgarh 492001",
    points: 1000,
  },
  {
    title: "Happy stickers",
    img: "/happy.jpg",
    description:
      "Who doesn't wanna be happy? Use this in your accessories, be and spread happiness.",
    points: 300,
  },
  {
    title: "1L Water Bottle",
    img: "/bottle.jpg",
    description:
      "Use this water bottle while traveling, schooling, office, etc.",
    points: 250,
  },
];

const Rewards = () => {
  return (
    <div className="rewards-container">
      {/* Centered Header */}
      <div className="rewards-header">
        <h6 className="iss">
          <i>
            Medicals nearby where we can reach out so to gain profit from this
            website
          </i>
        </h6>
        <button type="button" className="btn btn-success">
          Top medicals
        </button>
      </div>

      {/* Rewards Grid */}
      <div className="rewards-grid">
        {rewards.map((reward, index) => (
          <div className="card" key={index}>
            <img src={reward.img} className="card-img-top" alt={reward.title} />
            <div className="card-body">
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
