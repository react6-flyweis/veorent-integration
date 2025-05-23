import formsIcon from "../assets/forms.png";

interface DownloadableFormCardProps {
  title: string;
}

export const DownloadableFormCard = ({ title }: DownloadableFormCardProps) => {
  return (
    <div className="flex cursor-pointer items-center gap-3">
      <div className="flex-shrink-0">
        <img
          src={formsIcon}
          alt="Form"
          className="size-8 brightness-200 invert"
        />
      </div>
      <div className="flex-1">
        <h4 className="text-lg font-medium">{title}</h4>
        <p className="text-sm text-gray-500">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
    </div>
  );
};
