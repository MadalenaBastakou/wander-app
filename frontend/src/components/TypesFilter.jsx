import {types} from "../data"

export const TypesFilter = ({selectedTypes, onChange}) => {
    return <div className="border-b border-slate-300 pb-5">
    <h4 className="text-md font-semibold mb-2">Types</h4>
    {types.map((type) => (
<label key={type.name}  className="flex items-center space-x-2">
    <input type="checkbox" name="type" checked={selectedTypes.includes(type.name)} value={type.name} onChange={onChange} />
    <span>{type.name}</span>
</label>
    ))}
  </div>;
}
