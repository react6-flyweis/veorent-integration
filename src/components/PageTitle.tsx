import { BackButton } from "./BackButton";

export function PageTitle({
  title,
  withBack,
}: {
  title: string;
  withBack?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      {withBack && <BackButton />}
      <h2 className="text-3xl font-bold">{title}</h2>
    </div>
  );
}
