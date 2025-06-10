import depositsIcon from "../assets/deposits.png";

export const DepositsTabContent = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <img src={depositsIcon} alt="No deposits" className="max-h-20 max-w-20" />

      <h2 className="mb-2 text-center text-2xl font-bold">No deposits yet!</h2>
      <p className="max-w-xl text-center text-gray-600">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </p>
    </div>
  );
};
