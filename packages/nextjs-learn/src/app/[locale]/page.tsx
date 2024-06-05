// app/page.tsx
// import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  // TODO: 在 async 组件中使用 useTranslations 会导致报错：Error: Expected a suspended thenable. This is a bug in React. Please file an issue.
  // const t = useTranslations("Basic");
  const t = await getTranslations("Basic");
  return (
    <div className="note--empty-state">
      <span className="note-text--empty-state">{t("initText")}</span>
    </div>
  );
}
