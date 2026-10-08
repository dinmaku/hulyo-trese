import type { ReactNode } from "react";
import Photo from "./Photo";
import { SectionTitle } from "./Reveal";
import type { Photo as PhotoData } from "../data/photos";

/**
 * Opening band for inner pages: a graded photograph behind a left-set title,
 * fading into the ink so the first section starts on solid ground.
 */
export default function PageHeader({
  title,
  sub,
  photo,
  children,
}: {
  title: ReactNode;
  sub?: ReactNode;
  photo?: PhotoData;
  children?: ReactNode;
}) {
  return (
    <header className="relative isolate min-h-[70svh] overflow-hidden pb-20 pt-40 sm:min-h-[78svh] sm:pb-28 sm:pt-48">
      {photo && (
        <>
          <Photo photo={photo} fill locked className="-z-10" imgClassName="group-hover:scale-100" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-ink/45" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/55 to-ink/15" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-ink to-transparent" />
        </>
      )}
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle as="h1" title={title} sub={sub} />
        {children}
      </div>
    </header>
  );
}
