import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold">404</p>

        {/* <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-5xl">
          {t("title")}
        </h1>

        <p className="mt-6 text-base leading-7 text-muted-foreground">
          {t("subtitle")}
        </p> */}

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/">
            <Button>Retour</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
