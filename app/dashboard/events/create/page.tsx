"use server";
import CreateEvent from "@/features/dashboard/components/CreateEvent";
import ContentBox from "@/ui/components/ContentBox";
import FeatureHeadline from "@/ui/components/FeatureHeadline";

export default async function CreateEventPage() {
  return (
    <>
      <header className="col-span-2 col-start-2 row-start-1 p-10">
        <FeatureHeadline size="large">Create Event </FeatureHeadline>
      </header>
      <ContentBox styling="col-span-3 mb-auto">
        <CreateEvent />
      </ContentBox>
    </>
  );
}
