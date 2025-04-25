import { MapPin, Film, ShoppingBag, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="heading-2 mb-4">Core Features</h2>
          <p className="subheading">
            Explore the powerful features that make Utkarsh a comprehensive
            platform for cultural tourism.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 2 */}
          <div className="feature-card group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-Utkarsh-terracotta/10 flex items-center justify-center group-hover:bg-Utkarsh-terracotta/20 transition-colors">
                <Film className="text-Utkarsh-terracotta h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">StoryShare</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Share your travel stories and experiences while exploring
              authentic narratives from other travelers.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/stories">View Stories</Link>
            </Button>
          </div>

          {/* Feature 3 */}
          <div className="feature-card group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-Utkarsh-blue/10 flex items-center justify-center group-hover:bg-Utkarsh-blue/20 transition-colors">
                <ShoppingBag className="text-Utkarsh-blue h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Shop Local</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Support local artisans by purchasing authentic handcrafted
              products from various cultural regions.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/shop">Shop Now</Link>
            </Button>
          </div>

          {/* Feature 4 */}
          <div className="feature-card group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-Utkarsh-gold/10 flex items-center justify-center group-hover:bg-Utkarsh-gold/20 transition-colors">
                <Users className="text-Utkarsh-gold h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Travel Buddy</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Connect with like-minded travelers to explore cultural
              destinations together and share expenses.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/connect">Find Buddies</Link>
            </Button>
          </div>

          {/* Feature 6 - CTA Card */}
          <div className="feature-card bg-gradient-to-br from-Utkarsh-maroon to-Utkarsh-terracotta text-white">
            <h3 className="text-xl font-semibold mb-4">
              Start Your Cultural Journey
            </h3>
            <p className="mb-6 text-white/90">
              Begin your authentic cultural tourism experience with Utkarsh
              today.
            </p>
            <Button asChild variant="secondary" className="w-full">
              <Link to="/explore">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
