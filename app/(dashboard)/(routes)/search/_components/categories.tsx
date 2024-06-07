"use client";
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSportsMode,
} from "react-icons/fc";

import { Category } from "@prisma/client";
import { IconType } from "react-icons";
import { Key } from "lucide-react";

import { CategoryItem } from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  Escola: FcMusic,
  Programação: FcOldTimeCamera,
  "Matéria escolar": FcSportsMode,
  "Computer Science": FcMultipleDevices,
  Português: FcFilmReel,
  Outro: FcEngineering,
};

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};