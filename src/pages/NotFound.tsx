import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { photo } from "../data/photos";

export default function NotFound() {
  return (
    <PageHeader
      photo={photo("rings-cord")}
      title={
        <>
          This frame <em className="italic text-gold">didn't develop</em>
        </>
      }
      sub="The page you were after isn't here. The stories, services, and ways to reach us all are."
    >
      <Link
        to="/"
        className="group mt-10 inline-flex items-center gap-2.5 rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300"
      >
        Back to the start
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
      </Link>
    </PageHeader>
  );
}
