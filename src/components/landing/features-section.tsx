import {
  AcademicCapIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";
import { ReactNode } from "react";

interface ComponentCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const FeatureCard = ({ title, description, icon }: ComponentCardProps) => {
  return (
    <div className="rounded-box flex max-w-[20rem] flex-col gap-4 bg-base-300 p-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary">
        <span className="h-8 w-8 text-primary-content">{icon}</span>
      </div>
      <h4 className="text-xl font-bold">{title}</h4>
      <p className="text-base-content-neutral">{description}</p>
    </div>
  );
};

export const FeaturesSection = () => {
  return (
    <section className="flex flex-col items-center gap-10 py-32">
      <h3 className="max-w-[30rem] text-center text-3xl font-bold">
        The database and search engine for AI prompts
      </h3>
      <p className="max-w-[30rem] text-center text-lg text-base-content-neutral"></p>
      <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2">
        <FeatureCard
          icon={<AcademicCapIcon />}
          title="Generate and learn"
          description="Play around with AI models and learn how to create good prompts."
        />
        <FeatureCard
          icon={<UserGroupIcon />}
          title="Share"
          description="Share the best prompts that you find with everyone."
        />
        <FeatureCard
          icon={<CurrencyDollarIcon />}
          title="Find prompts"
          description="Find the best prompts for your specific use case and unlock the power of AI."
        />
        <FeatureCard
          icon={<ChatBubbleLeftRightIcon />}
          title="Upvote"
          description="Upvote your favourite prompts and support the best prompt creators."
        />
      </div>
    </section>
  );
};
