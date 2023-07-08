import Image from "next/image";

export const TechnologiesSecion = () => {
  return (
    <section className="flex flex-col items-center gap-14 py-32">
      <h3 className="max-w-[30rem] text-center text-3xl font-bold">
        Powered by
      </h3>
      <div className="flex flex-wrap items-center justify-center gap-x-20 gap-y-10">
        {/* <div className="relative h-40 w-[100px] flex-1"> */}
        <Image
          src="/gnosis-logo.svg"
          height={36}
          width={341}
          alt="Gnosis"
          // fill
          // objectFit="cover"
        />
        {/* </div> */}
        {/* <div className="relative h-40 w-[100px] flex-1"> */}
        <Image
          src="/request-logo.svg"
          height={42}
          width={238}
          alt="Request"
          // fill
          // objectFit="cover"
        />
        {/* </div> */}
        {/* <div className="relative h-40 w-[100px] flex-1"> */}
        <Image
          src="/scroll-logo.png"
          height={46}
          width={164}
          alt="Scroll"
          // objectFit="cover"
          // fill
        />
        {/* </div> */}
      </div>
    </section>
  );
};
