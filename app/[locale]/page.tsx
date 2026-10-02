import { getDictionary } from "@i18n/get-dictionary";
import { Locale, i18n } from "@/i18n-config";
import Cover from "@/components/Cover";
import Services from "@/components/Services";
import Orange from "@/components/Orange";
import SelectedWork from "@/components/SelectedWork";
import Form from "@/components/Form";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function Home({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const dictionary = getDictionary(locale);

  return (
    <main>
      <Cover dictionaryForCover={dictionary.homeCover} page="home" />
      <Services dictionary={dictionary} />
      <Orange dictionary={dictionary} />
      <SelectedWork dictionary={dictionary} />
      <Form dictionary={dictionary} />
    </main>
  );
}
