"use server";
import CreateEvent from "@/features/dashboard/components/Events/CreateEvent";
import ContentBox from "@/ui/components/ContentBox";

export default async function CreateEventPage() {
  return (
    <>
      <header className="p-10">
        <h1 className="text-4xl">Create Event </h1>
      </header>
      <div className="px-10">
        <ContentBox styling="col-span-3 mb-auto" glass={true}>
          <CreateEvent />
        </ContentBox>
      </div>
    </>
  );
}
