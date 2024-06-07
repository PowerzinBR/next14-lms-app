"use client";

import { Chapter } from "@prisma/client";
import { useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import ReactPlayer from "react-player";
import axios from "axios";

import { useConfettiStore } from "@/hooks/use-conffeti";

interface VideoPlayerProps {
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
  initialData?: Chapter & { videoUrl: string };
}

export const VideoPlayer = ({
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  initialData,
  completeOnEnd,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);

  const router = useRouter();

  const confetti = useConfettiStore();

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/progress`,
          {
            isCompleted: true,
          }
        );

        if (!nextChapterId) {
          confetti.onOpen();
        }
        toast.success("Capítulo concluído!");
        router.refresh();
        if (nextChapterId)
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }
    } catch (error) {
      toast.error("Algo deu errado");
    }
  };

  return (
    <div className="relative aspect-video">
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">Trancado</p>
        </div>
      )}
      {!isLocked && (
        <ReactPlayer
          onEnded={onEnd}
          autoPlay={false}
          url={initialData?.videoUrl!}
          controls
          height="100%"
          width="100%"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media: gyroscope; picture-in-picture; web-share"
          allowFullscreen
        />
      )}
    </div>
  );
};
