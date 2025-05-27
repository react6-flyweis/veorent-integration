import { PageTitle } from "@/components/PageTitle";
import { EducationCard } from "./EducationCard";

const educationalResources = [
  {
    id: 1,
    title: "10 Expensive Tax Mistakes to Avoid",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown",
    imageUrl: "/education-bg.png",
  },
  {
    id: 2,
    title: "Veorent Onboarding Course",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown",
    imageUrl: "/education-bg.png",
  },
  {
    id: 3,
    title: "Fair Housing for Landlords",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown",
    imageUrl: "/education-bg.png",
  },
];

export default function Education() {
  return (
    <div>
      <PageTitle title="Education" />

      <div className="space-y-4">
        {educationalResources.map((resource) => (
          <EducationCard
            key={resource.id}
            title={resource.title}
            description={resource.description}
            imageUrl={resource.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
