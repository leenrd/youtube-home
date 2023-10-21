import { Clapperboard, Home, Library, Repeat } from "lucide-react";
import { Children, ElementType, ReactNode, useState } from "react";
import { buttonStyles } from "../components/Button";
import { twMerge } from "tailwind-merge";

const SideBar = () => {
  return (
    <>
      <aside className="sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 lg:hidden">
        <SmallSideBarItem Icon={Home} title="Home" url="/" />
        <SmallSideBarItem Icon={Repeat} title="Shorts" url="/shorts" />
        <SmallSideBarItem
          Icon={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSideBarItem Icon={Library} title="Library" url="/library" />
      </aside>
      <aside className="w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col gap-2 px-2">
        <LargeSideBarSection>
          <LargeSideBarItem isActive Icon={Home} title="Home" url="/" />
        </LargeSideBarSection>
      </aside>
    </>
  );
};

export default SideBar;

type SmallSideBarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
};

const SmallSideBarItem = ({ Icon, title, url }: SmallSideBarItemProps) => {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "py-4 px-1 flex flex-col items-center rounded-lg gap-1"
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </a>
  );
};

type LargeSideBarSectionProps = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};

const LargeSideBarSection = ({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSideBarSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const visibleChildren = childrenArray.slice(0, visibleItemCount);
  const showExpandButton = childrenArray.length > visibleItemCount;

  return (
    <>
      {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
      <div>{visibleChildren}</div>
      {showExpandButton && {}}
    </>
  );
};

type LargeSideBarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
  isActive?: boolean;
};

const LargeSideBarItem = ({
  Icon,
  title,
  url,
  isActive = false,
}: LargeSideBarItemProps) => {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `w-full flex items-center rounded-lg gap-4 p-3 ${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
        }`
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  );
};
