export default function SelfReportedBackgroundSection() {
  const selfReportText =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s";

  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow">
      <div className="bg-gray-100 p-2">
        <h3 className="text-md font-bold text-black">Self-Report</h3>
      </div>
      <div className="p-3">
        <p className="text-sm font-bold text-gray-700">{selfReportText}</p>
      </div>
    </div>
  );
}
