import { getDictionary } from "@i18n/get-dictionary";
import { Locale } from "@/i18n-config";
import History from "@/components/History";
import Cover from "@/components/Cover";

export default async function About({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const dictionary = getDictionary(locale);

  return (
    <main>
      <Cover dictionaryForCover={dictionary.aboutCover} page="about" />
      <History dictionary={dictionary} />
    </main>
  );
}
