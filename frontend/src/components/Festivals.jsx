import rakhiImg from "../assets/project images/rakhi.png";
import christmasImg from "../assets/project images/christmas.png";
import bathukammaImg from "../assets/project images/bathukamma.png";
import onamImg from "../assets/project images/onam.png";

export default function Festivals() {
  const FESTIVALS = [
    {
      name: "Rakhi (Raksha Bandhan)",
      img: rakhiImg,
      desc: "A festival celebrating the bond of love and protection between brothers and sisters across India.",
    },
    {
      name: "Christmas",
      img: christmasImg,
      desc: "Celebrated to mark the birth of Jesus Christ, spreading joy, love, and togetherness worldwide.",
    },
    {
      name: "Bathukamma",
      img: bathukammaImg,
      desc: "A vibrant floral festival of Telangana that celebrates womanhood, nature, and cultural heritage.",
    },
    {
      name: "Onam",
      img: onamImg,
      desc: "The harvest festival of Kerala, known for floral designs, snake boat races, and grand feasts.",
    },
  ];

  return (
    <div className="page-bg festivals-bg">
      <main className="page-container">
        <h2 className="page-title">Festivals of India</h2>

        <div className="grid-3">
          {FESTIVALS.map((festival) => (
            <div className="card" key={festival.name}>
              <div className="image-wrap">
                <img src={festival.img} alt={festival.name} />
              </div>

              <div className="card-body">
                <h3 className="card-title">{festival.name}</h3>
                <p className="card-desc">{festival.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
