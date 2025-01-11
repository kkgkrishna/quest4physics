import Image from "next/image";
import logoImage from "../../public/assets/webLogo/logo.avif";

interface BrandLogoType {
  type?: string;
  className?: string;
}

function BrandLogo({ type, className }: BrandLogoType) {
  return (
    <div className={`${className} `}>
      {type === "short" ? (
        <Image
          src={logoImage}
          alt=""
          className="cursor-pointer"
          onClick={() => window?.location?.href == "/"}
        />
      ) : (
        <Image
          src={logoImage}
          alt=""
          className="cursor-pointer"
          onClick={() => window?.location?.href == "/"}
        />
      )}
    </div>
  );
}

export default BrandLogo;
