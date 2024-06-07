"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import ReactPlayer from "react-player";
import { useState } from "react";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { Chapter, MuxData } from "@prisma/client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null }
  courseId: string;
  chapterId: string;
};

const formSchema = z.object({
  videoUrl: z.string().min(1)
})

export const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toast.success("Capítulo atualizado");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Algo deu errado");
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Vídeo do curso
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>Cancelar</>
          )}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Adicionar um vídeo
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Editar vídeo
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <ReactPlayer 
              key={initialData.videoUrl}
              url={initialData.videoUrl}
              height="240px"
              width="100%"
              controls
              allow="accelerometer; autoplay; clipboard-write; encrypted-media: gyroscope; picture-in-picture; web-share"
              allowFullscreen
            />
          </div>
        )
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url })
              }
            }}
          />
        </div>
      )}
      <div className="text-xs text-muted-foreground mt-4">
        Envie um vídeo pra este capítulo
      </div>
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos podem demorar alguns minutos para processar. Atualize a página se o vídeo não aparecer
        </div>
      )}
    </div>
  )
}