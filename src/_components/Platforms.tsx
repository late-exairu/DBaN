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
      viewBox="0 0 24 18.8"
    >
      {title && <title>{title}</title>}
      <path
        stroke="none"
        d="M9 0v17.5l3.9 1.3V4.1c0-.7.3-1.2.8-1 .6.2.8.8.8 1.5v5.9c2.4 1.2 4.4 0 4.4-3.2s-1.1-4.7-4.4-5.8C13.1 1.1 10.6.3 9 0zm4.6 16.2 6.3-2.3c.7-.3.8-.6.2-.8-.6-.2-1.6-.1-2.4.1l-4.2 1.5v-2.4l.2-.1s1.2-.4 2.9-.6c1.7-.2 3.8 0 5.4.7 1.8.6 2 1.5 1.6 2.1-.5.6-1.6 1-1.6 1l-8.5 3.1.1-2.3zM1.8 16c-1.9-.5-2.2-1.7-1.4-2.3.8-.6 2.2-1.1 2.2-1.1l5.6-2v2.3l-4 1.5c-.7.3-.8.6-.2.8.6.2 1.6.1 2.3-.1l1.9-.7v2.1c-.1 0-.3 0-.4.1-1.9.3-3.9.1-6-.6z"
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
const MacosIcon = (props: IconProps) => {
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
const WiiIcon = (props: IconProps) => {
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
        d="M17.904 6.261a1.318 1.318 0 0 0-1.344 1.293v.018a1.325 1.325 0 0 0 1.344 1.305c.783 0 1.404-.579 1.404-1.305.001-.732-.62-1.311-1.404-1.311zm4.71 0c-.747 0-1.36.58-1.36 1.311 0 .711.613 1.305 1.361 1.305.767 0 1.385-.579 1.385-1.305 0-.732-.618-1.311-1.386-1.311zm-14.84.543c-.748 0-1.252.374-1.514 1.215-.242.857-1.794 6.822-1.794 6.822L2.43 6.897H0s2.334 8.464 2.652 9.456c.241.765.84 1.386 1.7 1.386 1.009 0 1.479-.732 1.684-1.386.225-.676 1.738-6.261 1.738-6.261s1.515 5.589 1.719 6.261c.225.653.69 1.386 1.682 1.386.879 0 1.456-.621 1.72-1.386.315-.99 2.657-9.456 2.657-9.456h-2.45l-2.021 7.944s-1.55-5.965-1.812-6.822c-.242-.844-.77-1.215-1.495-1.215zm9.008 3.363v7.495h2.322v-7.495h-2.322zm4.693 0v7.495h2.317v-7.495h-2.317z"
      />
    </svg>
  );
};
const WiiUIcon = (props: IconProps) => {
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
        d="M11.133 8.432a.819.819 0 0 0-.835.814.826.826 0 0 0 .835.812c.488 0 .873-.358.873-.81 0-.455-.385-.816-.873-.816zm2.93 0c-.465 0-.848.359-.848.814 0 .442.383.812.848.812.477 0 .861-.358.861-.81 0-.455-.385-.816-.861-.816zm3.655.011c-.53 0-.99.335-.99.858v3.315c0 .809.56 1.289 1.377 1.289h4.647c.689 0 1.248-.477 1.248-1.162V9.345c0-.412-.308-.86-.688-.86h-1.075v2.799c0 2.122-3.701 2.104-3.701.04v-2.88h-.818zm1.679 0v2.453c0 1.636 1.934 1.402 1.934.256V8.445h-1.934v-.002zM4.833 8.77c-.465 0-.776.232-.938.756-.152.533-1.116 4.242-1.116 4.242l-1.267-4.94H0s1.451 5.264 1.65 5.881c.15.476.521.86 1.058.86.627 0 .917-.454 1.045-.86.14-.421 1.08-3.895 1.08-3.895s.942 3.476 1.069 3.895c.14.406.431.86 1.047.86.547 0 .906-.385 1.07-.86.196-.617 1.65-5.881 1.65-5.881H8.148l-1.258 4.94s-.963-3.709-1.125-4.242c-.15-.526-.479-.756-.93-.756h-.002zm5.605 2.09v4.662h1.441V10.86h-1.441zm2.916 0v4.662h1.442V10.86h-1.442z"
      />
    </svg>
  );
};

type PlatformsProps = {
  platforms: PlatformList[];
  className?: string;
  size?: "small" | "large";
};

type IconsProps = {
  icon: string;
  title?: string;
  className?: string;
  size?: "small" | "large";
};

type IconProps = {
  title?: string;
  className?: string;
};

type IconsSet = Record<string, (props: IconsProps) => JSX.Element>;

const platformIconsSet: IconsSet = {
  windows: WindowsIcon,
  playstation: PlaystationIcon,
  xbox: XboxIcon,
  switch: SwitchIcon,
  macos: MacosIcon,
  android: AndroidIcon,
  wii: WiiIcon,
  "wii-u": WiiUIcon,
};

function Platform(props: IconsProps) {
  const { icon, className, title, size } = props;
  const Icon = platformIconsSet[icon];

  if (!Icon) {
    return null;
  }

  return (
    <Icon
      className={`${className} ${
        size === "large" ? "h-4 w-[18px]" : "h-3 w-[14px]"
      }`}
      title={title}
      icon={""}
    />
  );
}

export default function Platforms(props: PlatformsProps) {
  const { platforms, className, size } = props;

  const platformsMap = new Map<string, IconsProps>();

  for (const platform of platforms) {
    switch (true) {
      case platform.platform.slug.includes("pc"):
        platformsMap.set("pc", { title: "Windows", icon: "windows" });
        break;
      case platform.platform.slug.includes("playstation"):
        platformsMap.set("playstation", {
          title: "Playstation",
          icon: "playstation",
        });
        break;
      case platform.platform.slug.includes("xbox"):
        platformsMap.set("xbox", { title: "Xbox", icon: "xbox" });
        break;
      case platform.platform.slug.includes("wii-u"):
        platformsMap.set("wii-u", { title: "Wii U", icon: "wii-u" });
        break;
      case platform.platform.slug.includes("wii"):
        platformsMap.set("wii", { title: "Wii", icon: "wii" });
        break;
      case platform.platform.slug.includes("switch"):
        platformsMap.set("switch", { title: "Switch", icon: "switch" });
        break;
      case platform.platform.slug.includes("macos"):
        platformsMap.set("macos", { title: "macOS", icon: "macos" });
        break;
      case platform.platform.slug.includes("android"):
        platformsMap.set("android", { title: "Android", icon: "android" });
        break;
      default:
        break;
    }
  }

  const platformsArray = Array.from(platformsMap);

  return (
    <ul className={`${className} flex gap-1`}>
      {platformsArray.map(([key, value]) => (
        <li key={key}>
          <Platform size={size} icon={value.icon} title={value.title} />
        </li>
      ))}
    </ul>
  );
}
