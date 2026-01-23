import Image from "next/image";

const Logo = () => {
  return (
    <div>
      <Image
        src="/icons/logo_icon.svg"
        width={50}
        height={50}
        alt="testing svg images"
      />
    </div>
  );
};

export default Logo;
