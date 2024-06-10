import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Place, mockedPlaces } from "@/mocks/places";

function _renderAddress(place: Place) {
  return (
    <div>
      {place.address ?? "-"}
      {place.coordinates?.lat && place.coordinates?.lon && (
        <div className="text-xs text-muted-foreground">
          {place.coordinates.lat}, {place.coordinates.lon}
        </div>
      )}
    </div>
  );
}

export function PlacesList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date added</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Review</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockedPlaces.map((place) => (
          <TableRow key={place.id}>
            <TableCell>{place.addedAt}</TableCell>
            <TableCell>{place.category}</TableCell>
            <TableCell>{place.name}</TableCell>
            <TableCell>{_renderAddress(place)}</TableCell>
            <TableCell>{place.review}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
