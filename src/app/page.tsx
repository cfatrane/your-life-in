import Main from "@/components/Main";

export default function Home() {
  return (
    <div className="relative pt-14">
      <div className="py-24 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Your Life In Weeks
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Sometimes life seems really short, and other times it seems
              impossibly long. But this chart helps to emphasize that it’s most
              certainly finite. Those are your weeks and they’re all you’ve got.
            </p>
          </div>

          <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 p-2 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Main />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
