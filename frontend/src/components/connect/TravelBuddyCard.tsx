// -----------------------------------------------------------------

import { Calendar, MapPin, User, Mail } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface TravelBuddyCardProps {
  id: string;
  user: {
    name: string;
    avatar: string;
    age?: number;
    gender?: string;
    email?: string;
  };
  destination: string;
  fromDate: string;
  toDate: string;
  interests: string[];
  message: string;
  onConnect: (id: string) => void;
}

const TravelBuddyCard = ({
  id,
  user,
  destination,
  fromDate,
  toDate,
  interests,
  message,
}: TravelBuddyCardProps) => {
  return (
    <div className="feature-card border p-4 rounded-lg shadow">
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <User size={14} className="mr-1" />
            <span>
              {user.age && `${user.age} years`}
              {user.gender && user.age && `, ${user.gender}`}
              {!user.age && user.gender && user.gender}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm font-medium">
          <MapPin size={16} className="mr-2 text-vistara-maroon" />
          <span>{destination}</span>
        </div>

        <div className="flex items-center text-sm">
          <Calendar size={16} className="mr-2 text-vistara-blue" />
          <span>
            {new Date(fromDate).toLocaleDateString()} -{" "}
            {new Date(toDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium mb-2">Interests:</div>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest) => (
            <Badge key={interest} variant="secondary">
              {interest}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium mb-2">Message:</div>
        <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
          "{message}"
        </p>
      </div>
      <a
        href="mailto:srivedh11@gmail.com"
        className="text-muted-foreground hover:text-primary transition-colors"
        aria-label="Email"
      >
        <Mail size={20} />
      </a>
    </div>
  );
};

export default TravelBuddyCard;
