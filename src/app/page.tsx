import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-5  items-center">
      <div className="text-center text-lg lg:w-150">
        Hi! Welcome to the homepage, be sure to check out the recursive
        todolist. There are also some cat and dog viewing pages for your
        entertainment if you get bored with your todolist.
      </div>
      <Link
        href="/todos"
        className="flex items-center flex-row text-lg p-5 bg-white font-bold text-blue-800 rounded-md text-center hover:bg-blue-800 hover:text-white transition-all duration-300 active:bg-blue-600"
      >
        Take me to the recursive todos page!
        <ArrowRight className="ml-1 w-5 h-5 stroke-3" />
      </Link>
    </div>
  );
}
