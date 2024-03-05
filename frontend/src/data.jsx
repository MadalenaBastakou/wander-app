import {
  BiSolidWasher,
  BiSolidDryer,
  BiSolidFirstAid,
  BiWifi,
  BiSolidFridge,
} from "react-icons/bi";
import { BsPersonWorkspace, BsSnow, BsHouse } from "react-icons/bs";
import { TbBeach } from "react-icons/tb";
import {
  GiPaperWindmill,
  GiIsland,
  GiBoatFishing,
  GiCampingTent,
  GiBarn,
  GiHeatHaze,
  GiCctvCamera,
  GiBarbecue,
  GiToaster,
  GiCampfire,
} from "react-icons/gi";
import {
  FaCity,
  FaSwimmingPool,
  FaDoorOpen,
  FaPumpSoap,
  FaShower,
  FaFireExtinguisher,
  FaUmbrellaBeach,
  FaKey,

} from "react-icons/fa";
import { FaHouse, FaPeopleRoof,   FaKitchenSet} from "react-icons/fa6";
import {
  PiMountainsFill,
  PiBathtubFill,
  PiCoatHangerFill,
  PiTelevisionFill,
} from "react-icons/pi";
import {
  MdDownhillSkiing,
  MdCastle,
  MdMicrowave,
  MdBalcony,
  MdYard,
  MdPets,
  MdApartment,
  MdOutlineHolidayVillage
} from "react-icons/md";
import { IoSnow, IoDiamondOutline } from "react-icons/io5";
import { RiCactusFill } from "react-icons/ri";
import { TbIroning3 } from "react-icons/tb";
import { AiFillCar } from "react-icons/ai";

export const categories = [
  {
    label: "Beachfront",
    icon: <TbBeach />,
    description: "This property is close to the beach!",
  },
  {
    label: "Apartment",
    icon: <MdApartment />,
    description: "This property is in a building!",
  },
  {
    label: "Windmills",
    icon: <GiPaperWindmill />,
    description: "This property is has windmills!",
  },
  {
    label: "Iconic cities",
    icon: <FaCity />,
    description: "This property is modern!",
  },
  {
    label: "Countryside",
    icon: <PiMountainsFill />,
    description: "This property is in the countryside!",
  },
  {
    label: "Amazing Pools",
    icon: <FaSwimmingPool />,
    description: "This is property has a beautiful pool!",
  },
  {
    label: "Islands",
    icon: <GiIsland />,
    description: "This property is on an island!",
  },
  {
    label: "Lakefront",
    icon: <GiBoatFishing />,
    description: "This property is near a lake!",
  },
  {
    label: "Ski-in/out",
    icon: <MdDownhillSkiing />,
    description: "This property has skiing activies!",
  },
  {
    label: "Castles",
    icon: <MdCastle />,
    description: "This property is an ancient castle!",
  },
  {
    label: "Camping",
    icon: <GiCampingTent />,
    description: "This property offers camping activities!",
  },
  {
    label: "Arctic",
    icon: <IoSnow />,
    description: "This property is in arctic environment!",
  },
  {
    label: "Desert",
    icon: <RiCactusFill />,
    description: "This property is in the desert!",
  },
  {
    label: "Cottage",
    icon: <GiBarn />,
    description: "This property is in a barn!",
  },
  {
    label: "Villa",
    icon: <MdOutlineHolidayVillage />,
    description: "This property is big and luxurious!",
  },
  {
    label: "Luxury",
    icon: <IoDiamondOutline />,
    description: "This property is brand new and luxurious!",
  },
  {
    label: "House",
    icon: <BsHouse  />,
    description: "This property is a traditional house!",
  },
];

export const types = [
  {
    name: "Entire place",
    description: "Guests have the whole place to themselves",
    icon: <FaHouse />,
  },
  {
    name: "Room",
    description:
      "Guests have their own room in a house, plus access to shared places",
    icon: <FaDoorOpen />,
  },
  {
    name: "Shared space",
    description:
      "Guests sleep in a room or common area that maybe shared with you or others",
    icon: <FaPeopleRoof />,
  },
];

export const facilities = [
  {
    name: "Bath tub",
    icon: <PiBathtubFill />,
  },
  {
    name: "Personal care products",
    icon: <FaPumpSoap />,
  },
  {
    name: "Outdoor shower",
    icon: <FaShower />,
  },
  {
    name: "Washer",
    icon: <BiSolidWasher />,
  },
  {
    name: "Dryer",
    icon: <BiSolidDryer />,
  },
  {
    name: "Hangers",
    icon: <PiCoatHangerFill />,
  },
  {
    name: "Iron",
    icon: <TbIroning3 />,
  },
  {
    name: "TV",
    icon: <PiTelevisionFill />,
  },
  {
    name: "Dedicated workspace",
    icon: <BsPersonWorkspace />,
  },
  {
    name: "Air Conditioning",
    icon: <BsSnow />,
  },
  {
    name: "Heating",
    icon: <GiHeatHaze />,
  },
  {
    name: "Security cameras",
    icon: <GiCctvCamera />,
  },
  {
    name: "Fire extinguisher",
    icon: <FaFireExtinguisher />,
  },
  {
    name: "First Aid",
    icon: <BiSolidFirstAid />,
  },
  {
    name: "Wifi",
    icon: <BiWifi />,
  },
  {
    name: "Cooking set",
    icon: <FaKitchenSet />,
  },
  {
    name: "Refrigerator",
    icon: <BiSolidFridge />,
  },
  {
    name: "Microwave",
    icon: <MdMicrowave />,
  },
  {
    name: "Stove",
    icon: <GiToaster />,
  },
  {
    name: "Barbecue grill",
    icon: <GiBarbecue />,
  },
  {
    name: "Outdoor dining area",
    icon: <FaUmbrellaBeach />,
  },
  {
    name: "Private patio or Balcony",
    icon: <MdBalcony />,
  },
  {
    name: "Camp fire",
    icon: <GiCampfire />,
  },
  {
    name: "Garden",
    icon: <MdYard />,
  },
  {
    name: "Free parking",
    icon: <AiFillCar />,
  },
  {
    name: "Self check-in",
    icon: <FaKey />,
  },
  {
    name: " Pet allowed",
    icon: <MdPets />,
  },
];
