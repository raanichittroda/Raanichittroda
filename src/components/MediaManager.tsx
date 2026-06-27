import React, { useCallback } from 'react';
import imageCompression from 'browser-image-compression';
import { Upload, X, Star, GripVertical, Play } from 'lucide-react';
import { extractVideoData } from '@/lib/video';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export type LocalMediaItem = {
  id: string;
  file: File;
  media_type: 'image' | 'video';
  preview_url: string;
  thumbnail_url?: string;
  file_size: number;
  original_size?: number;
  duration?: number;
};

interface MediaManagerProps {
  media: LocalMediaItem[];
  setMedia: (media: LocalMediaItem[]) => void;
  coverId: string | null;
  setCoverId: (id: string | null) => void;
}

export function MediaManager({ media, setMedia, coverId, setCoverId }: MediaManagerProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setMedia((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const newArray = arrayMove(items, oldIndex, newIndex);
        if (oldIndex === 0 && coverId === active.id) {
          // Keep cover intent if moved? The requirements state "Admin can choose the first media item as the Cover Image."
          // So if the user moves something to the first position, we might auto-set it as cover.
          // Or they explicitly set it. Let's rely on explicit setting or auto first item.
        }
        return newArray;
      });
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newMedia: LocalMediaItem[] = [];

    // Dynamically import ffmpeg so it doesn't break SSR
    const { FFmpeg } = await import('@ffmpeg/ffmpeg');
    const { fetchFile } = await import('@ffmpeg/util');
    const ffmpeg = new FFmpeg();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isVideo = file.type.startsWith('video/');
      const isImage = file.type.startsWith('image/');
      
      if (!isVideo && !isImage) continue;

      if (isVideo) {
        if (file.size > 100 * 1024 * 1024) {
          alert(`Video ${file.name} is too large (max 100MB).`);
          continue;
        }
        try {
          const { thumbnailUrl, duration } = await extractVideoData(file);
          
          let finalVideoFile = file;
          let isCompressed = false;
          
          if (file.size > 1024 * 1024) {
            alert(`Compressing video ${file.name}... This might take a while.`);
            if (!ffmpeg.loaded) {
              await ffmpeg.load();
            }
            await ffmpeg.writeFile('input.mp4', await fetchFile(file));
            // Calculate bitrate to fit 1MB: 1,000,000 bytes = 8,000,000 bits.
            // Target bitrate = 8,000,000 / duration. Max 800k.
            const targetBitrate = duration ? Math.min(800000, Math.floor(8000000 / duration)) : 500000;
            
            await ffmpeg.exec(['-i', 'input.mp4', '-vf', 'scale=-2:480', '-b:v', `${targetBitrate}`, '-fs', '1000000', 'output.mp4']);
            const data = await ffmpeg.readFile('output.mp4');
            // @ts-ignore - Uint8Array is valid for File constructor
            finalVideoFile = new File([data], file.name, { type: 'video/mp4' });
            isCompressed = true;
          }

          newMedia.push({
            id: Math.random().toString(36).substring(7),
            file: finalVideoFile,
            media_type: 'video',
            preview_url: URL.createObjectURL(finalVideoFile),
            thumbnail_url: thumbnailUrl,
            file_size: finalVideoFile.size,
            original_size: isCompressed ? file.size : undefined,
            duration,
          });
        } catch (err) {
          console.error('Failed to process video', err);
          alert('Failed to compress video. Check console.');
        }
      } else if (isImage) {
        try {
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 2000,
            useWebWorker: true,
            fileType: 'image/webp' as const,
          };
          const compressedFile = await imageCompression(file, options);
          newMedia.push({
            id: Math.random().toString(36).substring(7),
            file: compressedFile,
            media_type: 'image',
            preview_url: URL.createObjectURL(compressedFile),
            file_size: compressedFile.size,
            original_size: file.size,
          });
        } catch (err) {
          console.error('Failed to compress image', err);
        }
      }
    }

    setMedia((prev) => {
      const updated = [...prev, ...newMedia];
      if (updated.length > 0 && !coverId) {
        setCoverId(updated[0].id);
      }
      return updated;
    });
  };

  const removeMedia = (id: string) => {
    setMedia((prev) => prev.filter(m => m.id !== id));
    if (coverId === id) setCoverId(null);
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors relative">
        <input 
          type="file" 
          multiple 
          accept="image/*,video/mp4,video/quicktime,video/webm" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
          onChange={handleFileChange} 
        />
        <Upload className="mx-auto h-8 w-8 text-gray-400" />
        <p className="mt-2 text-sm font-medium text-gray-900">Drag & drop media or click to upload</p>
        <p className="text-xs text-gray-500 mt-1">Images will be compressed automatically. Videos max 100MB.</p>
      </div>

      {media.length > 0 && (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={media.map(m => m.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {media.map((item) => (
                <SortableMediaItem 
                  key={item.id} 
                  item={item} 
                  isCover={coverId === item.id} 
                  onRemove={() => removeMedia(item.id)}
                  onSetCover={() => setCoverId(item.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}

interface SortableMediaItemProps {
  item: LocalMediaItem;
  isCover: boolean;
  onRemove: () => void;
  onSetCover: () => void;
}

function SortableMediaItem({ item, isCover, onRemove, onSetCover }: SortableMediaItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  
  const compressionPercent = item.original_size 
    ? Math.round((1 - item.file_size / item.original_size) * 100) 
    : 0;

  return (
    <div ref={setNodeRef} style={style} className={`relative group rounded-lg overflow-hidden border-2 bg-white ${isCover ? 'border-gold' : 'border-gray-200'}`}>
      <div className="aspect-square relative overflow-hidden bg-gray-100">
        <img 
          src={item.media_type === 'video' ? item.thumbnail_url : item.preview_url} 
          alt="Media preview" 
          className="w-full h-full object-cover" 
        />
        {item.media_type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Play className="w-8 h-8 text-white opacity-80" />
            {item.duration && <span className="absolute bottom-1 right-2 text-[10px] text-white bg-black/60 px-1 rounded">{Math.round(item.duration)}s</span>}
          </div>
        )}
      </div>
      
      {/* Overlay Actions */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
        <div className="flex justify-between items-start">
          <button {...listeners} {...attributes} className="p-1 text-white hover:text-gold cursor-grab" title="Drag to reorder">
            <GripVertical className="w-4 h-4" />
          </button>
          <button onClick={onRemove} className="p-1 text-white hover:text-red-400" title="Remove media">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex justify-center">
          <button onClick={onSetCover} className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${isCover ? 'bg-gold text-white' : 'bg-white/20 text-white hover:bg-white/40'}`}>
            <Star className={`w-3 h-3 ${isCover ? 'fill-white' : ''}`} /> {isCover ? 'Cover' : 'Set Cover'}
          </button>
        </div>
      </div>

      {/* Info Bar */}
      {item.media_type === 'image' && compressionPercent > 0 && (
        <div className="absolute top-0 left-0 right-0 bg-black/60 text-white text-[9px] p-1 flex justify-between">
          <span>{Math.round(item.file_size / 1024)}KB</span>
          <span className="text-green-400">-{compressionPercent}%</span>
        </div>
      )}
    </div>
  );
}
