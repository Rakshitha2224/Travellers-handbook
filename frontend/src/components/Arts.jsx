const pochampallyImg = "/images/pochampally-saree.jpg";
const phadImg = "/images/phad-painting.jpg";
const cheriyalImg = "/images/cheriyal-scroll-painting.jpg";
const kalamkariImg = "/images/kalamkari-painting.jpg";


export default function Arts() {
  const ARTS = [
    {
      name: "Pochampally Saree",
      img: pochampallyImg,
      desc: "A traditional handwoven saree from Telangana, famous for its intricate geometric patterns and vibrant colors.",
      fact: "Did you know? A Pochampally saree was once woven so small that it could fit inside a matchbox!",
    },
    {
      name: "Phad Painting",
      img: phadImg,
      desc: "A classical folk painting from Rajasthan depicting stories of local deities on long cloth scrolls.",
      fact: "Did you know? Phad paintings can extend over 30 feet and are used by folk storytellers.",
    },
    {
      name: "Cheriyal Scroll Painting",
      img: cheriyalImg,
      desc: "A narrative scroll painting from Telangana showcasing folklore, myths, and village life.",
      fact: "Did you know? Cheriyal scrolls can stretch up to 40 feet and are revealed scene by scene.",
    },
    {
      name: "Kalamkari Painting",
      img: kalamkariImg,
      desc: "A traditional hand-painted textile art from Andhra Pradesh using natural dyes.",
      fact: "Did you know? Kalamkari involves up to 23 detailed steps using bamboo pens and natural dyes.",
    },
  ];

  return (
    <div className="page-bg arts-bg">
      <main className="page-container">
        <h2 className="page-title">Indian Arts & Crafts</h2>

        <div className="grid-3">
          {ARTS.map((art) => (
            <div className="art-hover-wrapper" key={art.name}>
              {/* MAIN CARD */}
              <div className="card">
                <div className="image-wrap">
                  <img src={art.img} alt={art.name} />
                </div>

                <div className="card-body">
                  <h3 className="card-title">{art.name}</h3>
                  <p className="card-desc">{art.desc}</p>
                </div>
              </div>

              {/* FACT HOVER CARD */}
              {art.fact && (
                <div className="art-fact-card">
                  💡 {art.fact}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
