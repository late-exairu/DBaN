import { twMerge } from "tailwind-merge";

type KeyboardKeyProps = {
  children: React.ReactNode;
  className?: string;
};

export default function KeyboardKey({ children, className }: KeyboardKeyProps) {
  return (
    <kbd
      className={twMerge(
        `rounded-[3px] border border-secondary bg-muted px-1 text-muted-foreground`,
        className,
      )}
    >
      {children}
    </kbd>
  );
}
