import { useEffect, useState } from "react";
import { format } from "date-fns";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import PageHeader from "../components/common/PageHeader";
import TravelBuddyCard from "../components/connect/TravelBuddyCard";
import { Search } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";

const Connect = () => {
  const [buddies, setBuddies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    uname: "",
    age: "",
    gender: "",
    email: "",
    place: "",
    interest: "",
    imageUrl: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      user: {
        name: formData.uname,
        avatar: formData.imageUrl,
        age: parseInt(formData.age),
        gender: formData.gender,
        email: formData.email,
      },
      destination: formData.place,
      fromDate: new Date().toISOString(),
      toDate: new Date().toISOString(),
      interests: [formData.interest],
      message: formData.description,
    };

    const res = await fetch("http://localhost:5000/api/buddy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const newBuddy = await res.json();
      setBuddies((prev) => [newBuddy, ...prev]);
      setIsFormOpen(false);
      setFormData({
        uname: "",
        age: "",
        gender: "",
        email: "",
        place: "",
        interest: "",
        imageUrl: "",
        description: "",
      });
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/buddy")
      .then((res) => res.json())
      .then((data) => setBuddies(data));
  }, []);

  const filteredBuddies = buddies.filter(
    (buddy) =>
      buddy.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      buddy.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        <PageHeader
          title="Travel Buddy Connector"
          description="Find and share travel plans with fellow adventurers."
          bgImage="https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&q=80"
        >
          <div className="flex gap-4">
            <Input
              placeholder="Search destination or name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={() => setIsFormOpen(true)}>
              Share Your Travel Plan
            </Button>
          </div>
        </PageHeader>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBuddies.map((buddy) => (
            <TravelBuddyCard
              key={buddy._id}
              id={buddy._id}
              user={buddy.user}
              destination={buddy.destination}
              fromDate={buddy.fromDate}
              toDate={buddy.toDate}
              interests={buddy.interests}
              message={buddy.message}
              onConnect={() => {}}
            />
          ))}
        </div>

        <div className="container-custom py-12">
          <div className="mt-12 bg-card rounded-xl shadow-sm border p-8 text-center">
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Create your own travel plan and let others connect with you! Share
              your destination, dates, and what you're looking for in a travel
              companion.
            </p>
            <a
              href="https://hackthon2-2l40.onrender.com"
              rel="noopener noreferrer"
            >
              <Button size="lg">Create Travel Plan</Button>
            </a>
          </div>
        </div>
      </main>
      <Footer />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Your Travel Plan</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Label>Name</Label>
            <Input
              name="uname"
              placeholder="Enter Your Name"
              value={formData.uname}
              onChange={handleInputChange}
              required
            />

            <Label>Age</Label>
            <Input
              name="age"
              type="number"
              min="0"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Enter Your Age"
              required
            />

            <Label>Gender</Label>
            <Select
              value={formData.gender}
              onValueChange={(val) =>
                setFormData((p) => ({ ...p, gender: val }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>

            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              placeholder="example@gmail.com"
              onChange={handleInputChange}
              required
            />

            <Label>Destination</Label>
            <Input
              name="place"
              placeholder="Enter Your Destination"
              value={formData.place}
              onChange={handleInputChange}
              required
            />

            <Label>Interest</Label>
            <Select
              value={formData.interest}
              onValueChange={(val) =>
                setFormData((p) => ({ ...p, interest: val }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose interest" />
              </SelectTrigger>
              <SelectContent>
                {["Adventure", "Cultural", "Festival", "Cuisine"].map((i) => (
                  <SelectItem key={i} value={i}>
                    {i}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Label>Image URL</Label>
            <Input
              name="imageUrl"
              placeholder="https://www.india-a2z.com/images/halebidu1.jpg"
              value={formData.imageUrl}
              onChange={handleInputChange}
            />

            <Label>Message</Label>
            <Textarea
              name="description"
              placeholder="Type a Message"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Connect;
