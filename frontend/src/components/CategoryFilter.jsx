import {categories} from "../data"

export const CategoryFilter = ({selectedCategories, onChange}) => {

  return <div className="border-b border-slate-300 pb-5 ">
    <h4 className="text-md font-semibold mb-2">Category</h4>
    <div className="overflow-y-auto h-52">
    {categories.map((category) => (
<label key={category.label}  className="flex items-center space-x-2">
    <input type="checkbox" className="rounded" name="category" value={category.label} checked={selectedCategories.includes(category.label)}  onChange={onChange} />
    <span>{category.label}</span>
</label>
    ))}
    </div>
  </div>;
};
