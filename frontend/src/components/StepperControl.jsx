const StepperControl = ({ handleClick, currentStep, steps, submitting, onSubmit }) => {
  return (
    <div className="container flex justify-between gap-4 md:px-12 mt-4 mb-8">
      <button
        onClick={(e) => {
          e.preventDefault()
          handleClick()}}
        className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-neutral-300 hover:text-white transition duration-200 ease-in-out ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Back
      </button>
      <button
        onClick={(e) => {
          if (currentStep === steps.length) {
            e.preventDefault()
            onSubmit();
          } else {
            e.preventDefault()
            handleClick("next");
          }
        }}
        className="bg-orange-400 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-orange-500 hover:text-white transition duration-200 ease-in-out"
      >
        {currentStep === steps.length
          ? `${submitting ? "Saving..." : "Create your listing"}`
          : "Next"}
      </button>
    </div>
  );
};

export default StepperControl;
