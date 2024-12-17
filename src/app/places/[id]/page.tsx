import { Heading1 } from "@/components/typography";
import { PlaceUpdateForm } from "@/modules/places/components/forms/place-update-form";

interface PlaceUpdatePageProps {
  params: Promise<{ id: string }>;
}

export default async function PlaceUpdatePage(props: PlaceUpdatePageProps) {
  const id = (await props.params).id;

  return (
    <div className="space-y-12">
      <Heading1>Edit Place</Heading1>
      <PlaceUpdateForm id={id} />
    </div>
  );
}
