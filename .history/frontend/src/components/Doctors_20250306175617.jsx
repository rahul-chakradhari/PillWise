import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import "./styles.css";

const Doctors = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/Animation - 1741258183863.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, []);

  return (
    <>
      <div className="doctors-container">
        <div className="doctors-content">
          <div className="doctors-text">
            <div className="title">Meet Our Doctors 👨‍⚕️👩‍⚕️</div>
            <div className="texts">
              <b>
                {" "}
                1. Your Health, Our Priority! ❤️ <br />
              </b>
              <div className="subtexts">
                Our team of expert doctors 🏥 is here to provide the best
                healthcare solutions for you.
              </div>
              <b>
                2. Connect with Specialists 🩺 <br />
              </b>
              <div className="subtexts">
                Schedule consultations 📅 and get medical advice from top
                doctors.
              </div>
              <b>
                {" "}
                3. 24/7 Medical Assistance 🚑 <br />
              </b>
              <div className="subtexts">
                Get round-the-clock support and emergency medical help when
                needed.
              </div>
              <br />
              <button className="button-64" role="button">
                <span className="text">Book appointment</span>
              </button>
            </div>
          </div>
          <div className="doctors-image">
            {animationData && (
              <Lottie
                animationData={animationData}
                loop={true}
                className="animation-style"
              />
            )}
          </div>
        </div>
      </div>
      <div>
        <button type="button" class="btn btn-danger">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat
          inventore provident reprehenderit eos autem dolore exercitationem,
          iusto excepturi laborum, corporis iste. Sunt voluptatem eos saepe
          earum ex numquam! Veritatis corrupti dignissimos in ratione quidem
          labore ut, modi quis iste ipsam necessitatibus numquam sunt doloremque
          nobis autem error, suscipit magni illo eius maxime possimus. Obcaecati
          quod placeat doloribus dolore, porro a beatae. Officia sint
          reprehenderit assumenda ad ducimus, velit dolore et eligendi libero
          consequuntur repellendus quo esse distinctio illo odio voluptatum ut?
          Maiores perferendis facilis corporis porro quasi aliquid, quos
          explicabo, in voluptatem officia nostrum hic error cum earum id
          voluptates distinctio ullam deserunt, repudiandae animi debitis
          aspernatur quibusdam. Sint doloremque tempora perspiciatis consequatur
          ipsum fuga nemo cum! Obcaecati ullam nemo doloremque quod, explicabo
          aut, natus, exercitationem deleniti sint ipsum voluptate porro
          perferendis animi sapiente minima dolor assumenda sequi error soluta.
          Eos perferendis at consequuntur iste! Ea earum qui repellendus,
          temporibus expedita magnam modi suscipit ullam molestiae aliquid
          cupiditate doloremque, placeat dicta? Aspernatur ipsam impedit
          necessitatibus, facilis minus voluptas exercitationem blanditiis
          itaque soluta architecto voluptatem harum similique, perspiciatis
          aliquam dicta mollitia aut culpa enim debitis odio voluptatum
          corporis! Repellendus modi accusantium similique expedita alias
          inventore animi optio dignissimos mollitia praesentium, deleniti
          incidunt quis qui molestiae labore? Qui corporis ipsa officia eos
          sint. Odit temporibus id facere, saepe doloremque excepturi quibusdam
          deserunt reiciendis itaque aliquid laboriosam nesciunt. Iusto,
          ducimus. Expedita, ullam. Corporis corrupti, itaque, laborum maxime
          sint quis numquam suscipit ea nulla accusantium quo? Porro optio ipsam
          hic, doloribus eveniet quos? Reiciendis quaerat at possimus delectus,
          fugiat repudiandae sapiente temporibus. Sed, reprehenderit veniam!
          Fugiat voluptas dolorum, voluptatibus tempora porro quae reiciendis
          sapiente omnis, natus neque quia delectus veniam quasi aliquam quod
          minus est perferendis impedit doloremque consectetur vero. Ipsa cumque
          vero error incidunt odit! Velit cupiditate sapiente deleniti sit minus
          vel ducimus in, error similique hic, nesciunt animi itaque at totam
          rerum expedita placeat labore saepe. Earum, nisi consequatur, possimus
          dolore nobis est quis voluptatibus velit reprehenderit dolores
          incidunt adipisci! Consectetur minima nulla illum quis eos suscipit
          autem. Fugit, labore ut pariatur sapiente quod dolore at atque
          reprehenderit consectetur similique, rerum fugiat. Tenetur quae culpa
          dicta accusamus. Totam molestiae natus officia sequi voluptatum
          cupiditate doloremque quam nihil ratione. Quae harum eligendi fuga
          temporibus dignissimos dolorem, ducimus omnis, amet consequatur optio
          nemo, voluptatem est similique earum? Numquam obcaecati recusandae
          odit laudantium saepe consectetur ad iusto sequi perspiciatis labore
          omnis accusamus dolorem accusantium atque culpa nobis eligendi
          molestias vitae sapiente expedita, quae laborum minima placeat
          corrupti. Ducimus molestias mollitia voluptates sapiente veniam
          assumenda, explicabo officiis iusto labore perferendis eaque unde quis
          quasi iure tempora corrupti repudiandae iste. Corporis culpa
          cupiditate nihil minima perspiciatis enim voluptatum cumque impedit
          blanditiis, quod quia qui, quae dignissimos doloribus repellendus odit
          adipisci ex sequi ut facere delectus architecto. Deleniti harum amet
          sed aperiam incidunt architecto, iste asperiores doloremque iusto
          officia quod nemo adipisci, distinctio molestias! Atque in maiores
          similique, adipisci impedit eius quos nulla ipsam hic iste, quae
          sapiente earum error ipsum molestiae corporis amet aliquam corrupti
          rerum necessitatibus?
        </button>
      </div>
    </>
  );
};

export default Doctors;
