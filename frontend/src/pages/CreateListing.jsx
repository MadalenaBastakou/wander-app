import { CreateListingStep1 } from "../components/CreateListingStep1";
import { CreateListingStep2 } from "../components/CreateListingStep2";

export const CreateListing = () => {
  return (
    <div className="bg-neutral-50 w-screen flex flex-col justify-center gap-5 mx-auto">
      <div className="max-w-screen-xl mx-auto mt-8">
        <h1 className="text-3xl font-bold py-8">Publish your property</h1>
        <div className="bg-white w-5/6 px-8 py-4 rounded-xl self-center">
          <form>
            <CreateListingStep1 />
            <CreateListingStep2 />
          </form>
        </div>
      </div>
    </div>
  );
};
