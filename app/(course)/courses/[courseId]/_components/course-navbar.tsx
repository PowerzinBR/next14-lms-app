import { Chapter, Course, UserProgress } from "@prisma/client";

import { NavbarRoutes } from "@/components/navbar-routes";
import { CourseMobileSidebar } from "./course-mobile-sidebar";

interface CourseNavBarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const CourseNavBar = ({ course, progressCount }: CourseNavBarProps) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <NavbarRoutes />
    </div>
  );
};
