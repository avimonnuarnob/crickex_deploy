import type { RootLoaderData } from "@/root";
import type { Route } from "./+types/static-page";
import { useRouteLoaderData } from "react-router";

export default function StaticPage({ params }: Route.ComponentProps) {
  const { page } = params;
  const data = useRouteLoaderData<RootLoaderData>("root");
  const pageData = data?.links.find(
    (link) => link.title.toLowerCase() === page
  );
  return (
    <div className="bg-blue-1 text-white sm:bg-transparent sm:text-black">
      <div className="h-px"></div>
      <div className="font-bold text-center my-0 sm:my-2 border rounded mx-auto w-max p-2">
        <h1 className="m-0! text-xl! sm:text-4xl!">{pageData?.title}</h1>
      </div>
      {pageData?.description && (
        <div
          dangerouslySetInnerHTML={{ __html: pageData.description }}
          className="p-2 sm:p-2"
        ></div>
      )}
    </div>
  );
}
