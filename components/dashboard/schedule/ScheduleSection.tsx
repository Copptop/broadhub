import { ScheduleItem } from '@/components/dashboard/schedule/ScheduleItem'

interface Meeting {
  id: number;
  name: string;
  imageUrl: string;
  startDatetime: string;
  endDatetime: string;
}

interface ScheduleSectionProps {
  meetings: Meeting[];
}

const ScheduleSection = ({ meetings }: ScheduleSectionProps) => {

  return (
    <>
      <h2 className="text-base font-semibold leading-6 text-gray-900">
        Schedule for <time dateTime="2022-01-21">January 21, 2022</time>
      </h2>
      <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
        {meetings.map((meeting: Meeting) => (
          <ScheduleItem
            key={meeting.id}
            id={meeting.id}
            icon={meeting.imageUrl}
            name={meeting.name}
            startDatetime={meeting.startDatetime}
            endDatetime={meeting.endDatetime} />
        ))}
      </ol>
    </>
  );
};

export default ScheduleSection;
