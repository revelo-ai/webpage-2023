import { ITranslations } from "@/i18n/get-dictionary";
import Image from "next/image";
import HistoryCover from "@images/history-cover.webp";
import FeatureLabel from "./FeatureLabel";

export default function History({ dictionary }: { dictionary: ITranslations }) {
  const { history } = dictionary;

  return (
    <div className="section section-advantages history">
      <div className="container">
        <div className="feature-list-wrapper">
          <div className="history-content">
            <h2>{history.title}</h2>

            {history.subtitle.map((v) => (
              <div key={v} className="subtitle">
                {v}
              </div>
            ))}
          </div>
          <div className="history-cover-img">
            <Image className="services-image" {...HistoryCover} alt="" />
            {history.featureLabels.map(
              (l: { title: string; x: number; y: number }) => (
                <FeatureLabel key={l.title} text={l.title} x={l.x} y={l.y} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
