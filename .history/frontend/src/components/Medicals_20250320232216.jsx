import React from "react";

const rewards = [
  {
    title: "Branded t-shirt (all size)",
    img: "/shirt.webp",
    description:
      "Redeem our standard quality t-shirt which is made of pure cotton.",
    points: 1000,
  },
  {
    title: "Lightweight Helmet",
    img: "/Helmet.jpg",
    description:
      "Redeem Light Weight helmet which is safe for driving purpose.",
    points: 800,
  },
  {
    title: "A small plant",
    img: "/tree.jpg",
    description:
      "Use this plant in your home, give it sunlight and water, and they give you oxygen.",
    points: 200,
  },
  {
    title: "Branded Kurti (all size)",
    img: "/kurti.jpg",
    description:
      "Redeem our standard quality kurti which is made of pure cotton.",
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
      {/* Title & Description - Wrapped in a div to maintain alignment */}
      <div className="text-center mb-4">
        <br />
        <h6 className="iss">
          <i>
            Medicals near by whyer we can reach out so to gain profit from this
            website
          </i>{" "}
        </h6>
        <button type="button" className="btn btn-success">
          View your Orders
        </button>
      </div>

      {/* Rewards Grid */}
      {rewards.map((reward, index) => (
        <div className="card" key={index}>
          <img src={reward.img} className="card-img-top" alt={reward.title} />
          <div className="card-body">
            <h5 className="card-title">{reward.title}</h5>
            <h6 className="card-text">{reward.description}</h6>
            <a href="#" className="btn btn-primary">
              {reward.points} <i className="fa-solid fa-coins"></i>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rewards;
