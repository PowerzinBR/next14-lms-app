import { Attachment, Chapter } from "@prisma/client";

import { db } from "@/lib/db";

interface GetChapterProps {
  userId: string;
  chapterId: string;
  courseId: string;
}

export const getChapter = async ({
  userId,
  chapterId,
  courseId,
}: GetChapterProps) => {
  try {
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: userId,
          courseId: courseId,
        },
      },
    });

    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: {
        price: true,
      },
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });

    if (!chapter || !course) {
      throw new Error("Chapter or course not found");
    }

    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;

    if (purchase) {
      attachments = await db.attachment.findMany({
        where: {
          courseId: courseId,
        },
      });
    }

    if (chapter.isFree || purchase) {
      nextChapter = await db.chapter.findFirst({
        where: {
          courseId: courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: {
          position: "asc",
        },
      });
    }

    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId: userId,
          chapterId: chapterId,
        },
      },
    });

    return {
      chapter,
      course,
      attachments,
      nextChapter,
      userProgress,
      purchase,
    };
  } catch (error) {
    console.log("[GET_CHAPTER_ERROR]", error);
    return {
      chapter: null,
      course: null,
      attachment: null,
      nextChapter: null,
      userProgress: null,
      purchase: null,
    };
  }
};
