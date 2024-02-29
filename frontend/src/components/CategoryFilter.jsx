import {categories} from "../data"

export const CategoryFilter = ({onChange}) => {
  return <div className="border-b border-slate-300 pb-5">
    <h4 className="text-md font-semibold mb-2">Category</h4>
    {categories.map((category) => (
<label key={category.label}  className="flex items-center space-x-2">
    <input type="radio" name="category" defaultChecked={category.label === "All" ? true : false} value={category.label} onChange={onChange} />
    <span>{category.label}</span>
</label>
    ))}
  </div>;
};
