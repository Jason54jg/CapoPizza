import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";

/** Redirection vers la langue par défaut (export statique). */
export default function RootPage() {
  redirect(`/${DEFAULT_LOCALE}/`);
}
