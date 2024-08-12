import Main from "@/components/Main";

export default function Home() {
  return (
    <div className="relative pt-14">
      <div className="py-24 sm:py-32">
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

            {/* <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                href="#"
              >
                Get started
              </a>

              <a
                className="text-sm font-semibold leading-6 text-gray-900"
                href="#"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div> */}
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
