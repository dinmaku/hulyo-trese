import type { CSSProperties, ReactNode } from "react";
import { cn } from "../utils/cn";
import type { Photo as PhotoData } from "../data/photos";
import { GRADE_IMG, GradeLayers, type Grade } from "./Grade";

export type { Grade };

export default function Photo({
  photo,
  grade = "cinema",
  fill = false,
  locked = false,
  ratio,
  priority = false,
  caption,
  className,
  imgClassName,
  children,
}: {
  photo: PhotoData;
  grade?: Grade;
  /* absolutely fill the parent instead of owning an aspect box */
  fill?: boolean;
  /* keep the print; don't restore colour on hover */
  locked?: boolean;
  /* override the frame's natural aspect ratio, e.g. "4 / 5" */
  ratio?: string;
  priority?: boolean;
  caption?: ReactNode;
  className?: string;
  imgClassName?: string;
  children?: ReactNode;
}) {
  const resolved: Grade = grade === "cinema" && photo.mono ? "mono" : grade;
  const style: CSSProperties = fill ? {} : { aspectRatio: ratio ?? `${photo.w} / ${photo.h}` };

  return (
    <figure
      style={style}
      className={cn("group relative isolate overflow-hidden bg-coal", fill ? "absolute inset-0" : "w-full", className)}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        width={photo.w}
        height={photo.h}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        style={{ objectPosition: photo.focus ?? "50% 50%" }}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.03]",
          GRADE_IMG[resolved],
          locked && "grade-locked",
          imgClassName
        )}
      />
      <GradeLayers grade={resolved} locked={locked} />

      {caption && (
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/45 to-transparent px-5 pb-4 pt-16">
          {caption}
        </figcaption>
      )}
      {children}
    </figure>
  );
}
