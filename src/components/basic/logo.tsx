import cx from "classnames";
import Link from "next/link";

export interface LogoProps {
  href?: string;
  className?: string;
}

export const Logo = ({ href = "/", className }: LogoProps) => {
  return (
    <Link href={href} className="flex items-center gap-3">
      {/* <span className="block h-7 w-7 rounded-full bg-primary" /> */}
      <svg
        className="h-7 w-7"
        viewBox="0 0 101 98"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M64.2174 0C84.5319 0 101 16.6855 101 37C101 57.3145 84.5319 74 64.2174 74H51V94.4222C51 96.8127 48.3367 98.2431 46.3417 96.9262C20.4937 79.864 0 65.7439 0 40H0.120452C0.040667 39.01 0 38.0095 0 37C0 16.6855 16.4681 0 36.7826 0H64.2174Z"
          className="fill-primary"
        />
      </svg>

      <span className={cx("font-black text-xl", className)}>PromptHunt</span>
    </Link>
  );
};
