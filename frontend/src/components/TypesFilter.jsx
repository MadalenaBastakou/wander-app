import {types} from "../data"

export const TypesFilter = ({onChange}) => {
    return <div className="border-b border-slate-300 pb-5">
    <h4 className="text-md font-semibold mb-2">Types</h4>
    {types.map((type) => (
<label key={type.name}  className="flex items-center space-x-2">
    <input type="radio" name="type" defaultChecked={type.name === "All" ? true : false} value={type.name} onChange={onChange} />
    <span>{type.name}</span>
</label>
    ))}
  </div>;
}
