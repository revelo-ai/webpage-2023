import { ITranslations } from "@/i18n/get-dictionary";
import Image from "next/image";
import logoIcon from "@images/logo-icon.svg";
import linkedin from "@images/social-linkedin.svg";
import Year from "./Year";

export default function Footer({ dictionary }: { dictionary: ITranslations }) {
  const { footer } = dictionary;

  return (
    <footer>
      <div className="container">
        <div className="footer">
          <div className="footer-logo">
            <Image {...logoIcon} alt="" />

            <p>
              © <Year /> {footer.rights}
            </p>
          </div>

          <div className="footer-links">
            <a className="footer-email" href="mailto:info@revelo.bi">
              info@revelo.bi
            </a>

            <div className="social">
              <a
                href="https://www.linkedin.com/company/revelo-d-o-o-/"
                target="_blank"
              >
                <Image {...linkedin} alt="" aria-label="linkedin" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
