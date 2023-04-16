import { AdminSingerCard } from "../AdminSingerCard";

interface AdminSingerListProps {
  singers: string[];
  onClick: (singer: string) => void;
}

export const AdminSingerList = ({
  singers,
  onClick,
}: AdminSingerListProps) => {
  return (
    <>
      {singers.map((singer, index) => (
        <AdminSingerCard
          key={singer}
          name={singer}
          onClick={onClick}
        />
      ))}
    </>
  );
};
