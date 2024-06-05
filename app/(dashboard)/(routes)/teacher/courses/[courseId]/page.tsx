import { LayoutDashboard } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";

import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";

const CourseIdPage = async ({
  params
}: {
  params: {
    courseId: string;
  }
}) => {
  const { userId } = auth(); 

  if (!userId) {
    redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId
    }
  });

  if (!course) {
    redirect("/");
  }

  const requiredFiels = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId
  ];

  const totalFields = requiredFiels.length;
  const completedFields = requiredFiels.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})` 

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">
            Preparar curso
          </h1>
          <span className="text-sm text-slate-700">
            Complete todos os campos {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">
              Customize seu curso
            </h2>
          </div>
          <TitleForm
            initialData={course}
            courseId={course.id}
          />
           <DescriptionForm
            initialData={course}
            courseId={course.id}
          />
          <ImageForm 
            initialData={course}
            courseId={course.id}
          />
        </div>
      </div>
    </div>
  );
}

export default CourseIdPage;