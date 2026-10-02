import { ITranslations } from "@/i18n/get-dictionary";
import orangeImage from "@images/orange-image.webp";
import orangeLogo from "@images/orange-logo.png";
import Image from "next/image";

export default function Orange({ dictionary }: { dictionary: ITranslations }) {
  const { orange } = dictionary;

  return (
    <div className="section section-orange">
      <div className="container">
        <Image className="orange-header-image" {...orangeImage} alt="" />

        <h2>{orange.title}</h2>

        {orange.subheading && (
          <div className="orange-subheading">{orange.subheading}</div>
        )}

        <div className="subtitle">{orange.subtitle}</div>

        <a
          className="orange-link"
          href="https://orangedatamining.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {orange.link}
        </a>

        {orange.sections.map((s) => (
          <div key={s.subheading} className="orange-section">
            <div className="orange-subheading">{s.subheading}</div>

            <div className="subtitle">{s.content}</div>

            <a
              className="orange-link"
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.link}
            </a>
          </div>
        ))}

        <div className="circle top">
          <Image className="orange-logo" {...orangeLogo} alt="" />
        </div>

        <div className="circle bottom"></div>
      </div>
    </div>
  );
}
