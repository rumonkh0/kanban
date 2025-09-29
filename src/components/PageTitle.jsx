import { useEffect } from "react";
import { usePageTitleStore } from "@/stores/usePageTitleStore";

export default function PageTitle({ title }) {
  const setTitle = usePageTitleStore((state) => state.setTitle);

  useEffect(() => {
    if (title) setTitle(title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  return null;
}
