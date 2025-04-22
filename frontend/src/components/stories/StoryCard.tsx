import { useState } from "react";
import { Heart, MessageSquare, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface StoryCardProps {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  author: {
    name: string;
    avatar?: string;
  };
  postedAt: string;
  likes: number;
  comments: number;
  categories: string[];
  isLiked?: boolean;
  media?: {
    url: string;
    caption?: string;
    type: "image" | "video";
  }[];
}

const StoryCard = ({
  id,
  title,
  excerpt,
  content,
  thumbnail,
  author,
  postedAt,
  likes = 0,
  comments = 0,
  categories,
  isLiked = false,
  media = [],
}: StoryCardProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState<number>(Number(likes) || 0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleReadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDialogOpen(true);
  };

  return (
    <>
      <div
        className="feature-card h-full overflow-hidden hover:shadow-lg transition-all duration-300"
        onClick={handleReadMore}
      >
        <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {categories.slice(0, 2).map((category) => (
              <Badge key={category}>{category}</Badge>
            ))}
            {categories.length > 2 && <Badge>+{categories.length - 2}</Badge>}
          </div>
          <button
            onClick={handleLikeClick}
            className={cn(
              "absolute top-2 right-2 p-2 rounded-full transition-colors",
              liked
                ? "bg-primary/90 text-white"
                : "bg-white/90 text-muted-foreground hover:text-primary"
            )}
            aria-label={liked ? "Unlike" : "Like"}
          >
            <Heart size={16} className={liked ? "fill-current" : ""} />
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="text-base font-semibold line-clamp-1">{title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {excerpt}
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User size={12} className="mr-1" />
            <span>{author.name}</span>
            <Clock size={12} className="ml-4 mr-1" />
            <span>{postedAt}</span>
          </div>
          <div className="flex justify-between items-center pt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Heart size={12} className="mr-1" />
                <span>{Number.isFinite(likeCount) ? likeCount : 0}</span>
              </div>
              {/* <div className="flex items-center">
                <MessageSquare size={12} className="mr-1" />
                <span>{Number(comments) || 0}</span>
              </div> */}
            </div>
            <Button
              variant="ghost"
              className="text-xs p-0"
              onClick={handleReadMore}
            >
              Read More →
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto p-6 w-[95vw] max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>By {author.name}</span>
              <span>{postedAt}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Badge key={cat}>{cat}</Badge>
              ))}
            </div>

            <img src={thumbnail} alt={title} className="rounded-lg w-full" />

            <div className="prose max-w-none text-sm">
              <p>{content}</p>
            </div>

            {media.length > 0 && (
              <div>
                <h3 className="font-semibold text-base mb-2">Gallery</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {media.map((item, index) => (
                    <figure key={index}>
                      {item.type === "image" ? (
                        <img
                          src={item.url}
                          alt={item.caption}
                          className="rounded-md w-full"
                        />
                      ) : (
                        <video
                          src={item.url}
                          controls
                          className="rounded-md w-full"
                        />
                      )}
                      {item.caption && (
                        <figcaption className="text-xs mt-1 text-muted-foreground">
                          {item.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StoryCard;
