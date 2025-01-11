import Image from "next/image";
import { HiBadgeCheck } from "react-icons/hi";
import centerImage from "../../public/assets/QuestCenterImage/centerImage.jpg";

function QuestCenter() {
  return (
    <div className="w-full flex justify-center my-10 lg:my-20">
      <div className="w-[95%] lg:w-[70%] tablet:w-[80%] flex flex-col lg:flex-row gap-5 p-5 lg:p-10 rounded-xl shadow-lg bg-gradient-to-r from-purple-50 to-purple-100 transform transition-all ">
        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <Image
            src={centerImage}
            alt="Quest4Physics Center"
            className="rounded-lg transition-transform transform "
          />
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2 flex flex-col gap-5">
          <p className="text-3xl font-bold text-gray-800">
            Quest4Physics Centres for IIT JEE and NEET UG
          </p>
          <p className="text-base text-gray-500">
            Admissions open in Kota, Delhi, Chandigarh, Sikar, Indore and 20+
            other cities!
          </p>
          <ul className="text-gray-500 flex flex-col gap-3">
            <li className="flex items-center gap-3 text-sm">
              <HiBadgeCheck className="text-[#6A64F1] text-xl w-[2rem] animate-bounce" />
              <p className="w-full">In-person classes & doubt solving</p>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <HiBadgeCheck className="text-[#6A64F1] text-xl w-[2rem] animate-bounce" />
              <p className="w-full">Bonus access to online learning</p>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <HiBadgeCheck className="text-[#6A64F1] text-xl w-[2rem] animate-bounce" />
              <p className="w-full">
                High quality lecture videos for the entire syllabus for all your
                subjects.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default QuestCenter;
