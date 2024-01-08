import { type PlatformList, type Platform } from "@/types";

const WindowsIcon = (props: IconProps) => {
  const { className, title } = props;

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={0}
      viewBox="0 0 24 24"
    >
      {title && <title>{title}</title>}
      <path
        stroke="none"
        d="M0 3.449 9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"
      />
    </svg>
  );
};
const PlaystationIcon = (props: IconProps) => {
  const { className, title } = props;

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={0}
      viewBox="0 0 24 24"
    >
      {title && <title>{title}</title>}
      <path
        stroke="none"
        d="M8.984 2.596v17.547l3.915 1.261V6.688c0-.69.304-1.151.794-.991.636.18.76.814.76 1.505v5.875c2.441 1.193 4.362-.002 4.362-3.152 0-3.237-1.126-4.675-4.438-5.827-1.307-.448-3.728-1.186-5.39-1.502zm4.656 16.241 6.296-2.275c.715-.258.826-.625.246-.818-.586-.192-1.637-.139-2.357.123l-4.205 1.5V14.98l.24-.085s1.201-.42 2.913-.615c1.696-.18 3.785.03 5.437.661 1.848.601 2.04 1.472 1.576 2.072-.465.6-1.622 1.036-1.622 1.036l-8.544 3.107V18.86zM1.807 18.6c-1.9-.545-2.214-1.668-1.352-2.32.801-.586 2.16-1.052 2.16-1.052l5.615-2.013v2.313L4.205 17c-.705.271-.825.632-.239.826.586.195 1.637.15 2.343-.12L8.247 17v2.074c-.12.03-.256.044-.39.073-1.939.331-3.996.196-6.038-.479z"
      />
    </svg>
  );
};
const XboxIcon = (props: IconProps) => {
  const { className, title } = props;

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={0}
      viewBox="0 0 24 24"
    >
      {title && <title>{title}</title>}
      <path
        stroke="none"
        d="M4.102 21.033A11.947 11.947 0 0 0 12 24a11.96 11.96 0 0 0 7.902-2.967c1.877-1.912-4.316-8.709-7.902-11.417-3.582 2.708-9.779 9.505-7.898 11.417zm11.16-14.406c2.5 2.961 7.484 10.313 6.076 12.912A11.942 11.942 0 0 0 24 12.004a11.95 11.95 0 0 0-3.57-8.536s-.027-.022-.082-.042a.824.824 0 0 0-.281-.045c-.592 0-1.985.434-4.805 3.246zM3.654 3.426c-.057.02-.082.041-.086.042A11.956 11.956 0 0 0 0 12.004c0 2.854.998 5.473 2.661 7.533-1.401-2.605 3.579-9.951 6.08-12.91-2.82-2.813-4.216-3.245-4.806-3.245a.725.725 0 0 0-.281.046v-.002zM12 3.551S9.055 1.828 6.755 1.746c-.903-.033-1.454.295-1.521.339C7.379.646 9.659 0 11.984 0H12c2.334 0 4.605.646 6.766 2.085-.068-.046-.615-.372-1.52-.339C14.946 1.828 12 3.545 12 3.545v.006z"
      />
    </svg>
  );
};
const SwitchIcon = (props: IconProps) => {
  const { className, title } = props;

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={0}
      viewBox="0 0 24 24"
    >
      {title && <title>{title}</title>}
      <path
        stroke="none"
        d="M14.176 24h3.674c3.376 0 6.15-2.774 6.15-6.15V6.15C24 2.775 21.226 0 17.85 0H14.1c-.074 0-.15.074-.15.15v23.7c-.001.076.075.15.226.15zm4.574-13.199c1.351 0 2.399 1.125 2.399 2.398 0 1.352-1.125 2.4-2.399 2.4-1.35 0-2.4-1.049-2.4-2.4-.075-1.349 1.05-2.398 2.4-2.398zM11.4 0H6.15C2.775 0 0 2.775 0 6.15v11.7C0 21.226 2.775 24 6.15 24h5.25c.074 0 .15-.074.15-.149V.15c.001-.076-.075-.15-.15-.15zM9.676 22.051H6.15a4.194 4.194 0 0 1-4.201-4.201V6.15A4.194 4.194 0 0 1 6.15 1.949H9.6l.076 20.102zM3.75 7.199c0 1.275.975 2.25 2.25 2.25s2.25-.975 2.25-2.25c0-1.273-.975-2.25-2.25-2.25s-2.25.977-2.25 2.25z"
      />
    </svg>
  );
};
const IosIcon = (props: IconProps) => {
  const { className, title } = props;

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={0}
      viewBox="0 0 24 24"
    >
      {title && <title>{title}</title>}
      <path
        stroke="none"
        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
      />
    </svg>
  );
};
const AndroidIcon = (props: IconProps) => {
  const { className, title } = props;

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={0}
      viewBox="0 0 32 32"
    >
      {title && <title>{title}</title>}
      <path
        stroke="none"
        d="M6.802 20.283c0 1.23-.857 2.237-1.904 2.237s-1.905-1.006-1.905-2.237v-7.321c0-1.23.857-2.237 1.905-2.237s1.904 1.007 1.904 2.237v7.321zm22.205 0c0 1.23-.857 2.237-1.905 2.237s-1.905-1.006-1.905-2.237v-7.321c0-1.23.857-2.237 1.905-2.237s1.905 1.007 1.905 2.237v7.321zM20.164 3.649l1.222-2.193c.1-.179.07-.388-.065-.463s-.329.009-.428.188l-1.25 2.244a10.06 10.06 0 0 0-3.684-.684c-1.33 0-2.588.25-3.71.695l-1.256-2.254c-.1-.179-.293-.264-.428-.188s-.165.284-.065.463l1.228 2.204c-2.555 1.2-4.276 3.453-4.276 6.035 0 .262.019.521.053.776h16.909c.035-.255.053-.513.053-.776 0-2.59-1.732-4.849-4.301-6.046zm-8.067 3.828a.744.744 0 1 1 0-1.488.744.744 0 0 1 0 1.488zm7.764 0a.744.744 0 1 1 0-1.488.744.744 0 0 1 0 1.488zM7.45 11.211v12.471h.007c.087 1.053 1.056 1.89 2.23 1.89h12.541c1.173 0 2.142-.837 2.23-1.89h.007V11.211H7.451zm7.29 14.299v3.858c0 1.23-.857 2.237-1.905 2.237s-1.904-1.007-1.904-2.237v-3.855zm6.348-.002v3.86c0 1.23-.857 2.237-1.905 2.237s-1.905-1.007-1.905-2.237v-3.86z"
      />
    </svg>
  );
};

type PlatformsProps = {
  platforms: PlatformList[];
  className?: string;
};

type IconsProps = {
  icon: string;
  title?: string;
  className?: string;
};

type IconProps = {
  title?: string;
  className?: string;
};

type IconsSet = Record<string, (props: IconsProps) => JSX.Element>;

const platformIconsSet: IconsSet = {
  pc: WindowsIcon,
  playstation: PlaystationIcon,
  xbox: XboxIcon,
  switch: SwitchIcon,
  ios: IosIcon,
  android: AndroidIcon,
};

function Platform(props: IconsProps) {
  const { icon, className, title } = props;
  const Icon = platformIconsSet[icon];

  if (!Icon) {
    return null;
  }

  return <Icon className={`${className} h-3 w-3`} title={title} icon={""} />;
}

export default function Platforms(props: PlatformsProps) {
  const { platforms, className } = props;

  const platformsMap = new Map<string, IconsProps>();

  for (const platform of platforms) {
    platform.platform.slug.includes("pc")
      ? platformsMap.set("pc", { title: "Windows", icon: "windows" })
      : platform.platform.slug.includes("playstation")
        ? platformsMap.set("playstation", {
            title: "Playstation",
            icon: "playstation",
          })
        : platform.platform.slug.includes("xbox")
          ? platformsMap.set("xbox", { title: "Xbox", icon: "xbox" })
          : platform.platform.slug.includes("switch")
            ? platformsMap.set("switch", { title: "Switch", icon: "switch" })
            : platform.platform.slug.includes("ios")
              ? platformsMap.set("ios", { title: "iOS", icon: "ios" })
              : platform.platform.slug.includes("android")
                ? platformsMap.set("android", {
                    title: "Android",
                    icon: "android",
                  })
                : null;
  }

  console.log(platformsMap);

  const platformsArray = Array.from(platformsMap);

  return (
    <ul className={`${className} flex gap-1`}>
      {platformsArray.map(([key, value]) => (
        <li key={key}>
          <Platform icon={value.icon} title={value.title} />
        </li>
      ))}
    </ul>
  );
}
