"use client";

import { ITranslations } from "@/i18n/get-dictionary";
import slugify from "slugify";
import BlobImage from "@images/services-blob.svg";
import Image1 from "@images/consulting-squareimg.webp";
import Image2 from "@images/prototyping-squareimg.webp";
import Image3 from "@images/training-squareimg.webp";
import Image4 from "@images/integrated-squareimg.webp";
import Image from "next/image";
import React from "react";
import { useInView } from "react-intersection-observer";
import FeatureLabel from "./FeatureLabel";

const SideImage = ({ index }: { index: number }) => {
  const sideImage = React.useMemo(() => {
    switch (index) {
      default:
      case 0:
        return Image1;
      case 1:
        return Image2;
      case 2:
        return Image3;
      case 3:
        return Image4;
    }
  }, [index]);

  return (
    <Image
      className="tabbed-list-image"
      src={sideImage.src}
      width={sideImage.width}
      height={sideImage.height}
      alt=""
    />
  );
};

const Project = ({
  project,
  index,
  setProjectsInView,
}: {
  project: ITranslations["advantages"]["advantages"][number];
  index: number;
  setProjectsInView: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  const { ref, inView } = useInView({ threshold: 0.35 });

  React.useEffect(() => {
    setProjectsInView((v) =>
      inView ? [...v, index] : v.filter((i) => i !== index)
    );
  }, [inView, index, setProjectsInView]);

  return (
    <div ref={ref} id={slugify(project.title)} className="tabbed-list-item">
      <div className="left">
        <h3>{project.title}</h3>
        <div className="tabbed-list-item-subtitle">{project.subtitle}</div>
        {project.content.map((c) => (
          <p key={c}>{c}</p>
        ))}

        {project.links && (
          <div className="tabbed-list-item-links">
            {project.links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {l.text}
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="right">
        <div className="tabbed-list-image-wrapper">
          {index === 0 && (
            <Image
              className="tabbed-list-extra-image"
              src={BlobImage.src}
              width={702}
              height={621}
              alt=""
            />
          )}

          <SideImage index={index} />
        </div>
        {project.featureLabels.map((l) => (
          <FeatureLabel key={l.text} text={l.text} x={l.x} y={l.y} />
        ))}
      </div>
    </div>
  );
};

export default function SelectedWork({
  dictionary,
}: {
  dictionary: ITranslations;
}) {
  const { advantages: selectedWork } = dictionary;
  const [projectsInView, setProjectsInView] = React.useState<number[]>([]);
  const lowestProjectInView = React.useMemo(() => {
    return [...projectsInView].sort()[0];
  }, [projectsInView]);

  return (
    <section className="section section-advantages tabbed-list">
      <div className="container">
        <h2>{selectedWork.title}</h2>
      </div>

      <div className="tabbed-list-nav sticky">
        <div className="container">
          <div className="tabbed-list-nav-inner-wrapper">
            {selectedWork.advantages.map((a, index) => (
              <a
                key={a.title}
                className={lowestProjectInView === index ? "active" : ""}
                href={`#${slugify(a.title)}`}
              >
                {a.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div>
          {selectedWork.advantages.map((a, index) => (
            <Project
              key={a.title}
              project={a}
              index={index}
              setProjectsInView={setProjectsInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
