"use client";

import { Chapter } from "@prisma/client";

interface ChaptersListProps {
  items: Chapter[];
  onEdit: (id: string) => void;
  onReorder: (updatedData: { id: string, position: number }[]) => void;
}

export const ChaptersList = ({
  onEdit,
  onReorder,
  items
}: ChaptersListProps) => {
  return (
    <div>
      On
    </div>
  )
}