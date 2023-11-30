import { ITranslations } from "@/i18n/get-dictionary";
import orangeImage from "@images/orange-image.webp";
import orangeLogo from "@images/orange_logo_hq.webp";
import Image from "next/image";

export default function Orange({ dictionary }: { dictionary: ITranslations }) {
  const { orange } = dictionary;

  return (
    <div className="section section-orange">
      <div className="container">
        <Image className="orange-header-image" {...orangeImage} alt="" />

        <h2>{orange.title}</h2>

        <div className="subtitle">{orange.subtitle}</div>

        <a
          className="cta-button cta-button-md button-orange"
          href="http://orangedatamining.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {orange.more}
        </a>

        <div className="circle top">
          <Image className="orange-logo" {...orangeLogo} alt="" />
        </div>

        <div className="circle bottom"></div>
      </div>
    </div>
  );
}
