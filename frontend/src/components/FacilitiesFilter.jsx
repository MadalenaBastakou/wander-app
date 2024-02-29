import { facilities } from "../data"

export const FacilitiesFilter = ({selectedFacilities, onChange}) => {
    return <div className="border-b border-slate-300 pb-5">
    <h4 className="text-md font-semibold mb-2">Facilities</h4>
    {facilities.map((facility) => (
<label key={facility.name}  className="flex items-center space-x-2">
    <input type="checkbox" className="rounded" name="facility" value={facility.name}  checked={selectedFacilities.includes(facility.name)} onChange={onChange} />
    <span>{facility.name}</span>
</label>
    ))}
  </div>;
}
