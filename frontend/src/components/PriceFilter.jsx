import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";


export const PriceFilter = ({ selectedPrice, onChange }) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Max Price per night</h4>
      <label className="flex items-center space-x-2">
        <Box sx={{ width: 300 }}>
          <Slider
            value={selectedPrice}
            max={500}
            onChange={(e) =>
              onChange(e.target.value ? parseInt(e.target.value) : "")
            }
            aria-label="Default"
            valueLabelDisplay="auto"
          />
        </Box>
      </label>
    </div>
  );
};
