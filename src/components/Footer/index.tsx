import Link from "next/link";

export default function Footer() {
  return (
    <footer className="my-12">
      <p className="flex justify-center">
        <span>Inspired by </span>

        <Link href="https://waitbutwhy.com/2014/05/life-weeks.html">
          WaitButWhy
        </Link>
      </p>
    </footer>
  );
}
