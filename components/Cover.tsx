import { ITranslations } from "@/i18n/get-dictionary";
import Link from "next/link";
import CircleImage from "@images/circle-big-hero.svg";
import AboutHeroImage from "@images/about-hero.webp";
import HeroImage from "@images/hero-image-2x.webp";
import HeroImageMobile from "@images/hero-image-2x_2_966x695.webp";
import Image from "next/image";
import { getImageProps as getImgProps } from "next/image";
import FeatureLabel from "./FeatureLabel";

function CoverImage({ page }: { page: "home" | "about" }) {
  const {
    props: { srcSet: home_desktopSrcSet },
  } = getImgProps({
    src: HeroImage.src,
    alt: "",
    width: HeroImage.width,
    height: HeroImage.height,
  });

  const {
    props: { src: home_mobileSrc },
  } = getImgProps({
    src: HeroImageMobile.src,
    alt: "",
    width: HeroImageMobile.width,
    height: HeroImageMobile.height,
  });

  if (page === "about") {
    return (
      <Image
        className="cover-image cover-image-right"
        {...AboutHeroImage}
        alt=""
      />
    );
  }

  return (
    <picture>
      <source
        srcSet={home_desktopSrcSet}
        width={HeroImage.width}
        height={HeroImage.height}
        media="(min-width: 640px)"
      />
      <img
        className="cover-image cover-image-right"
        src={home_mobileSrc}
        width={HeroImageMobile.width}
        height={HeroImageMobile.height}
        alt=""
      />
    </picture>
  );
}

export default function Cover({
  dictionaryForCover,
  page,
}: {
  dictionaryForCover: ITranslations["homeCover"] | any;
  page: "home" | "about";
}) {
  return (
    <section className="section section-cover">
      <div className="container">
        <div className="left">
          <div className="content">
            <h1>
              {dictionaryForCover.brand && (
                <>
                  <span className="brand-color">
                    {dictionaryForCover.brand}
                  </span>{" "}
                </>
              )}
              {dictionaryForCover.title}
            </h1>
            <div className="subtitle">{dictionaryForCover.subtitle}</div>

            {dictionaryForCover.cta! && (
              <Link
                href={dictionaryForCover.cta.url}
                className="cta-button cta-button-md"
              >
                {dictionaryForCover.cta.title}
              </Link>
            )}
          </div>
        </div>

        <div className="right">
          <Image
            priority
            className="cover-image cover-image-back"
            src={CircleImage.src}
            width={708}
            height={708}
            alt=""
          />

          <CoverImage page={page} />

          {dictionaryForCover.featureLabels &&
            dictionaryForCover.featureLabels.map((l: any) => (
              <FeatureLabel key={l.title} text={l.title} x={l.x} y={l.y} />
            ))}
        </div>

        {dictionaryForCover.aside && (
          <aside className="cover-aside">
            <p>{dictionaryForCover.aside}</p>
          </aside>
        )}
      </div>
    </section>
  );
}
