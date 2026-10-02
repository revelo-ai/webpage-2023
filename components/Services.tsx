import Image from "next/image";
import { ITranslations } from "@/i18n/get-dictionary";
import coverImage from "@images/advantages-cover.webp";
import Icon1 from "@images/advantages1.svg";
import Icon2 from "@images/advantages2.svg";
import Icon3 from "@images/integrated-icon.svg";
import Icon4 from "@images/advantages3.svg";

import React from "react";

const ServiceIcon = ({ index }: { index: number }) => {
  const icon = React.useMemo(() => {
    switch (index) {
      default:
      case 0:
        return Icon1;
      case 1:
        return Icon2;
      case 2:
        return Icon3;
      case 3:
        return Icon4;
    }
  }, [index]);

  return (
    <Image
      className="feature-item-icon"
      src={icon.src}
      width={icon.width}
      height={icon.height}
      alt=""
    />
  );
};

export default function Services({
  dictionary,
}: {
  dictionary: ITranslations;
}) {
  const { services } = dictionary;

  return (
    <section className="section section-services">
      <div className="container">
        <h2>{services.title}</h2>

        <div className="subtitle">{services.subtitle}</div>

        <div className="feature-list-wrapper">
          <div className="feature-list">
            {services.services.map((s, index) => (
              <div key={s.title} className="feature-item">
                <ServiceIcon index={index} />

                <div>
                  <div className="feature-item-title">{s.title}</div>
                  <div className="feature-item-content">{s.content}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="feature-list-cover-img">
            <Image {...coverImage} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
