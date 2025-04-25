// // import { useState } from "react";
// // import { travelBuddies } from "@/data/travelBuddies";
// // import { format } from "date-fns";
// // import Header from "@/components/layout/Header";
// // import Footer from "@/components/layout/Footer";
// // import PageHeader from "@/components/common/PageHeader";
// // import TravelBuddyCard from "@/components/connect/TravelBuddyCard";
// // import { Search, Filter, MapPin, Calendar, User } from "lucide-react";
// // import { Input } from "@/components/ui/input";
// // import { Button } from "@/components/ui/button";
// // import { Calendar as CalendarComponent } from "@/components/ui/calendar";
// // import { UploadCloud } from "lucide-react";
// // import {
// //   Popover,
// //   PopoverContent,
// //   PopoverTrigger,
// // } from "@/components/ui/popover";
// // import {
// //   DropdownMenu,
// //   DropdownMenuTrigger,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuCheckboxItem,
// // } from "@/components/ui/dropdown-menu";
// // import { Badge } from "@/components/ui/badge";
// // import { cn } from "@/lib/utils";

// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogFooter,
// // } from "@/components/ui/dialog";
// // import { Label } from "@/components/ui/label";
// // import { Textarea } from "@/components/ui/textarea";
// // import { Alert, AlertDescription } from "@/components/ui/alert";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // const Connect = () => {
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
// //   const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
// //   const [calendarOpen, setCalendarOpen] = useState(false);
// //   const [isFormOpen, setIsFormOpen] = useState(false);
// //   const [submitSuccess, setSubmitSuccess] = useState(false);
// //   const [formData, setFormData] = useState({
// //     uname: "",
// //     age: "",
// //     gender: "",
// //     place: "",
// //     interest: "",
// //     imageUrl: "",
// //     description: "",
// //   });

// //   // Collect all unique interests from travel buddies
// //   const allInterests = [
// //     ...new Set(travelBuddies.flatMap((buddy) => buddy.interests)),
// //   ].sort();

// //   const toggleInterest = (interest: string) => {
// //     if (selectedInterests.includes(interest)) {
// //       setSelectedInterests(selectedInterests.filter((i) => i !== interest));
// //     } else {
// //       setSelectedInterests([...selectedInterests, interest]);
// //     }
// //   };
// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     try {
// //       const res = await fetch("http://localhost:5000/api/buddy", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(formData),
// //       });

// //       if (res.ok) {
// //         const newStory = await res.json(); // ✅ get the new story returned from backend

// //         // ✅ add new story to the top of the list
// //         // setStories((prev) => [newStory, ...prev]);

// //         setSubmitSuccess(true);
// //         setTimeout(() => {
// //           setSubmitSuccess(false);
// //           setIsFormOpen(false);
// //           setFormData({
// //             uname: "",
// //             age: "",
// //             gender: "",
// //             place: "",
// //             interest: "",
// //             imageUrl: "",
// //             description: "",
// //           });
// //         }, 3000);
// //       } else {
// //         const err = await res.json();
// //         console.error("Submit failed:", err.message);
// //       }
// //     } catch (error) {
// //       console.error("Submit error:", error);
// //     }
// //   };
// //   const filteredBuddies = travelBuddies.filter((buddy) => {
// //     // Filter by search term (destination or name)
// //     const matchesSearch =
// //       buddy.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       buddy.user.name.toLowerCase().includes(searchTerm.toLowerCase());

// //     // Filter by date if selected
// //     let matchesDate = true;
// //     if (selectedDate) {
// //       const formattedSelectedDate = format(selectedDate, "MMM d, yyyy");
// //       const fromDate = new Date(buddy.fromDate);
// //       const toDate = new Date(buddy.toDate);
// //       const selectedDateTime = selectedDate.getTime();
// //       matchesDate =
// //         selectedDateTime >= fromDate.getTime() &&
// //         selectedDateTime <= toDate.getTime();
// //     }

// //     // Filter by interests if any selected
// //     let matchesInterests = true;
// //     if (selectedInterests.length > 0) {
// //       matchesInterests = selectedInterests.some((interest) =>
// //         buddy.interests.includes(interest)
// //       );
// //     }

// //     return matchesSearch && matchesDate && matchesInterests;
// //   });

// //   const handleConnectWithBuddy = (id: string) => {
// //     console.log(`Connected with buddy ${id}`);
// //     // In a real app, this would send a connection request
// //   };
// //   const handleInputChange = (
// //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// //   ) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };
// //   const handleSelectChange = (value: string) => {
// //     setFormData((prev) => ({ ...prev, category: value }));
// //   };

// //   return (
// //     <div className="min-h-screen flex flex-col">
// //       <Header />
// //       <main className="flex-grow pt-16">
// //         <PageHeader
// //           title="Travel Buddy Connector"
// //           description="Find like-minded travelers to explore cultural destinations together. Share expenses, experiences, and create lasting memories."
// //           bgImage="https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&q=80"
// //         >
// //           <div className="flex flex-wrap items-center gap-4 mt-4">
// //             <div className="relative flex-grow min-w-[200px]">
// //               <Search
// //                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
// //                 size={18}
// //               />
// //               <Input
// //                 type="text"
// //                 placeholder="Where do you want to go?"
// //                 className="pl-10 bg-white/80 backdrop-blur-sm border-white/20"
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //               />
// //             </div>

// //             <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
// //               <PopoverTrigger asChild>
// //                 <Button
// //                   variant="outline"
// //                   className="bg-white/80 backdrop-blur-sm border-white/20 text-foreground min-w-[240px]"
// //                 >
// //                   <Calendar size={18} className="mr-2" />
// //                   {selectedDate ? format(selectedDate, "PPP") : "When?"}
// //                 </Button>
// //               </PopoverTrigger>
// //               <PopoverContent className="w-auto p-0" align="start">
// //                 <CalendarComponent
// //                   mode="single"
// //                   selected={selectedDate}
// //                   onSelect={(date) => {
// //                     setSelectedDate(date);
// //                     setCalendarOpen(false);
// //                   }}
// //                   initialFocus
// //                 />
// //               </PopoverContent>
// //             </Popover>

// //             <DropdownMenu>
// //               <DropdownMenuTrigger asChild>
// //                 <Button
// //                   variant="outline"
// //                   className="bg-white/80 backdrop-blur-sm border-white/20 text-foreground"
// //                 >
// //                   <User size={18} className="mr-2" />
// //                   Interests{" "}
// //                   {selectedInterests.length > 0 &&
// //                     `(${selectedInterests.length})`}
// //                 </Button>
// //               </DropdownMenuTrigger>
// //               <DropdownMenuContent className="w-56">
// //                 <DropdownMenuItem onClick={() => setSelectedInterests([])}>
// //                   Clear all
// //                 </DropdownMenuItem>
// //                 {allInterests.map((interest) => (
// //                   <DropdownMenuCheckboxItem
// //                     key={interest}
// //                     checked={selectedInterests.includes(interest)}
// //                     onCheckedChange={() => toggleInterest(interest)}
// //                   >
// //                     {interest}
// //                   </DropdownMenuCheckboxItem>
// //                 ))}
// //               </DropdownMenuContent>
// //             </DropdownMenu>

// //             <Button
// //               className="w-full md:w-auto"
// //               onClick={() => setIsFormOpen(true)}
// //             >
// //               <UploadCloud size={18} className="mr-2" />
// //               Share Your Story
// //             </Button>
// //           </div>
// //         </PageHeader>

// //         <div className="container-custom py-12">
// //           <div className="mb-8">
// //             <div className="flex justify-between items-center">
// //               <h2 className="text-2xl font-semibold">
// //                 {filteredBuddies.length > 0
// //                   ? `Found ${filteredBuddies.length} travel companions`
// //                   : "No travel buddies match your criteria"}
// //               </h2>

// //               <Button
// //                 variant="outline"
// //                 onClick={() => {
// //                   setSearchTerm("");
// //                   setSelectedDate(undefined);
// //                   setSelectedInterests([]);
// //                 }}
// //               >
// //                 Clear Filters
// //               </Button>
// //             </div>

// //             {selectedInterests.length > 0 && (
// //               <div className="flex flex-wrap gap-2 mt-4">
// //                 {selectedInterests.map((interest) => (
// //                   <Badge
// //                     key={interest}
// //                     variant="secondary"
// //                     className="flex items-center gap-1"
// //                   >
// //                     {interest}
// //                     <button
// //                       className="ml-1 text-muted-foreground hover:text-foreground"
// //                       onClick={() => toggleInterest(interest)}
// //                     >
// //                       ×
// //                     </button>
// //                   </Badge>
// //                 ))}
// //               </div>
// //             )}
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {filteredBuddies.map((buddy) => (
// //               <TravelBuddyCard
// //                 key={buddy.id}
// //                 id={buddy.id}
// //                 user={buddy.user}
// //                 destination={buddy.destination}
// //                 fromDate={buddy.fromDate}
// //                 toDate={buddy.toDate}
// //                 interests={buddy.interests}
// //                 message={buddy.message}
// //                 onConnect={handleConnectWithBuddy}
// //               />
// //             ))}
// //           </div>

// //           {filteredBuddies.length === 0 && (
// //             <div className="text-center py-16 bg-card rounded-xl shadow-sm border">
// //               <h3 className="text-xl font-semibold mb-2">
// //                 No travel buddies found
// //               </h3>
// //               <p className="text-muted-foreground mb-6">
// //                 Try adjusting your search or filters to find compatible travel
// //                 companions.
// //               </p>
// //               <div className="space-y-4">
// //                 <p className="font-medium">
// //                   Some popular destinations to explore:
// //                 </p>
// //                 <div className="flex flex-wrap justify-center gap-2">
// //                   {[
// //                     "Rajasthan",
// //                     "Kerala",
// //                     "Varanasi",
// //                     "Hampi",
// //                     "Spiti Valley",
// //                   ].map((place) => (
// //                     <Button
// //                       key={place}
// //                       variant="outline"
// //                       onClick={() => setSearchTerm(place)}
// //                     >
// //                       {place}
// //                     </Button>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           <div className="mt-12 bg-card rounded-xl shadow-sm border p-8 text-center">
// //             <h3 className="text-2xl font-semibold mb-4">
// //               Can't find a travel buddy?
// //             </h3>
// //             <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
// //               Create your own travel plan and let others connect with you! Share
// //               your destination, dates, and what you're looking for in a travel
// //               companion.
// //             </p>
// //             <a
// //               href="https://vistara-travel-itinerary-generator.streamlit.app/"
// //               rel="noopener noreferrer"
// //             >
// //               <Button size="lg">Create Travel Plan</Button>
// //             </a>
// //           </div>
// //         </div>
// //       </main>
// //       <Footer />
// //       <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
// //         <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto p-4 sm:p-6 w-[95vw]">
// //           <DialogHeader>
// //             <DialogTitle>Share Your Karnataka Story</DialogTitle>
// //             <DialogDescription>
// //               Share your experience of Karnataka’s hidden gems, traditions, or
// //               festivals. Your story will be reviewed before publishing.
// //             </DialogDescription>
// //           </DialogHeader>

// //           {submitSuccess ? (
// //             <Alert className="bg-green-50 border-green-200 text-green-800">
// //               <AlertDescription className="py-4 text-center">
// //                 🎉 Submitted Successfully! Our team will review your story soon.
// //               </AlertDescription>
// //             </Alert>
// //           ) : (
// //             <form onSubmit={handleSubmit} className="space-y-4 mt-4">
// //               <div>
// //                 <Label htmlFor="uname">Name</Label>
// //                 <Input
// //                   id="uname"
// //                   name="uname"
// //                   value={formData.uname}
// //                   onChange={handleInputChange}
// //                   placeholder="e.g., My Adventure at Jog Falls"
// //                   required
// //                 />
// //               </div>
// //               <div>
// //                 <Label htmlFor="age">Age</Label>
// //                 <Input
// //                   id="age"
// //                   name="age"
// //                   value={formData.age}
// //                   onChange={handleInputChange}
// //                   maxLength={150}
// //                   placeholder="A short description of your story (max 150 characters)"
// //                   required
// //                 />
// //               </div>
// //               <div>
// //                 <Label htmlFor="gender">Gender</Label>
// //                 <Input
// //                   id="gender"
// //                   name="gender"
// //                   value={formData.gender}
// //                   onChange={handleInputChange}
// //                   placeholder="e.g., My Adventure at Jog Falls"
// //                   required
// //                 />
// //               </div>
// //               <div>
// //                 <Label htmlFor="place">Place</Label>
// //                 <Input
// //                   id="place"
// //                   name="place"
// //                   value={formData.place}
// //                   onChange={handleInputChange}
// //                   placeholder=""
// //                   required
// //                 />
// //               </div>
// //               <div>
// //                 <Label htmlFor="interest">Interests *</Label>
// //                 <Select
// //                   value={formData.interest}
// //                   onValueChange={handleSelectChange}
// //                 >
// //                   <SelectTrigger className="w-full mt-1">
// //                     <SelectValue placeholder="Interest" />
// //                   </SelectTrigger>
// //                   <SelectContent>
// //                     {[
// //                       "Historical",
// //                       "Adventure",
// //                       "Cultural",
// //                       "Festival",
// //                       "Spiritual",
// //                       "Cuisine",
// //                       "Architecture",
// //                       "Natural",
// //                     ].map((cat) => (
// //                       <SelectItem key={cat} value={cat}>
// //                         {cat}
// //                       </SelectItem>
// //                     ))}
// //                   </SelectContent>
// //                 </Select>
// //               </div>
// //               <div>
// //                 <Label htmlFor="imageUrl">Image URL</Label>
// //                 <Input
// //                   id="imageUrl"
// //                   name="imageUrl"
// //                   value={formData.imageUrl}
// //                   onChange={handleInputChange}
// //                   placeholder="https://example.com/your-image.jpg"
// //                 />
// //               </div>
// //               <div>
// //                 <Label htmlFor="description">Description</Label>
// //                 <Textarea
// //                   id="description"
// //                   name="description"
// //                   value={formData.description}
// //                   onChange={handleInputChange}
// //                   maxLength={150}
// //                   placeholder="A short description"
// //                   required
// //                 />
// //               </div>

// //               <DialogFooter className="mt-4 flex flex-col sm:flex-row gap-2">
// //                 <Button
// //                   type="button"
// //                   variant="outline"
// //                   onClick={() => setIsFormOpen(false)}
// //                 >
// //                   Cancel
// //                 </Button>
// //                 <Button type="submit">Submit</Button>
// //               </DialogFooter>
// //             </form>
// //           )}
// //         </DialogContent>
// //       </Dialog>
// //     </div>
// //   );
// // };

// // export default Connect;

// import { useState } from "react";
// import { travelBuddies } from "@/data/travelBuddies";
// import { format } from "date-fns";
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
// import PageHeader from "@/components/common/PageHeader";
// import TravelBuddyCard from "@/components/connect/TravelBuddyCard";
// import { Search, Filter, MapPin, Calendar, User } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Calendar as CalendarComponent } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuCheckboxItem,
// } from "@/components/ui/dropdown-menu";
// import { Badge } from "@/components/ui/badge";
// import { cn } from "@/lib/utils";

// const Connect = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
//   const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
//   const [calendarOpen, setCalendarOpen] = useState(false);

//   // Collect all unique interests from travel buddies
//   const allInterests = [
//     ...new Set(travelBuddies.flatMap((buddy) => buddy.interests)),
//   ].sort();

//   const toggleInterest = (interest: string) => {
//     if (selectedInterests.includes(interest)) {
//       setSelectedInterests(selectedInterests.filter((i) => i !== interest));
//     } else {
//       setSelectedInterests([...selectedInterests, interest]);
//     }
//   };

//   const filteredBuddies = travelBuddies.filter((buddy) => {
//     // Filter by search term (destination or name)
//     const matchesSearch =
//       buddy.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       buddy.user.name.toLowerCase().includes(searchTerm.toLowerCase());

//     // Filter by date if selected
//     let matchesDate = true;
//     if (selectedDate) {
//       const formattedSelectedDate = format(selectedDate, "MMM d, yyyy");
//       const fromDate = new Date(buddy.fromDate);
//       const toDate = new Date(buddy.toDate);
//       const selectedDateTime = selectedDate.getTime();
//       matchesDate =
//         selectedDateTime >= fromDate.getTime() &&
//         selectedDateTime <= toDate.getTime();
//     }

//     // Filter by interests if any selected
//     let matchesInterests = true;
//     if (selectedInterests.length > 0) {
//       matchesInterests = selectedInterests.some((interest) =>
//         buddy.interests.includes(interest)
//       );
//     }

//     return matchesSearch && matchesDate && matchesInterests;
//   });

//   const handleConnectWithBuddy = (id: string) => {
//     console.log(`Connected with buddy ${id}`);
//     // In a real app, this would send a connection request
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <main className="flex-grow pt-16">
//         <PageHeader
//           title="Travel Buddy Connector"
//           description="Find like-minded travelers to explore cultural destinations together. Share expenses, experiences, and create lasting memories."
//           bgImage="https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&q=80"
//         >
//           <div className="flex flex-wrap items-center gap-4 mt-4">
//             <div className="relative flex-grow min-w-[200px]">
//               <Search
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
//                 size={18}
//               />
//               <Input
//                 type="text"
//                 placeholder="Where do you want to go?"
//                 className="pl-10 bg-white/80 backdrop-blur-sm border-white/20"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>

//             <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className="bg-white/80 backdrop-blur-sm border-white/20 text-foreground min-w-[240px]"
//                 >
//                   <Calendar size={18} className="mr-2" />
//                   {selectedDate ? format(selectedDate, "PPP") : "When?"}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0" align="start">
//                 <CalendarComponent
//                   mode="single"
//                   selected={selectedDate}
//                   onSelect={(date) => {
//                     setSelectedDate(date);
//                     setCalendarOpen(false);
//                   }}
//                   initialFocus
//                 />
//               </PopoverContent>
//             </Popover>

//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className="bg-white/80 backdrop-blur-sm border-white/20 text-foreground"
//                 >
//                   <User size={18} className="mr-2" />
//                   Interests{" "}
//                   {selectedInterests.length > 0 &&
//                     `(${selectedInterests.length})`}
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-56">
//                 <DropdownMenuItem onClick={() => setSelectedInterests([])}>
//                   Clear all
//                 </DropdownMenuItem>
//                 {allInterests.map((interest) => (
//                   <DropdownMenuCheckboxItem
//                     key={interest}
//                     checked={selectedInterests.includes(interest)}
//                     onCheckedChange={() => toggleInterest(interest)}
//                   >
//                     {interest}
//                   </DropdownMenuCheckboxItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>

//             <Button className="w-full sm:w-auto">Find Buddies</Button>
//           </div>
//         </PageHeader>

//         <div className="container-custom py-12">
//           <div className="mb-8">
//             <div className="flex justify-between items-center">
//               <h2 className="text-2xl font-semibold">
//                 {filteredBuddies.length > 0
//                   ? `Found ${filteredBuddies.length} travel companions`
//                   : "No travel buddies match your criteria"}
//               </h2>

//               <Button
//                 variant="outline"
//                 onClick={() => {
//                   setSearchTerm("");
//                   setSelectedDate(undefined);
//                   setSelectedInterests([]);
//                 }}
//               >
//                 Clear Filters
//               </Button>
//             </div>

//             {selectedInterests.length > 0 && (
//               <div className="flex flex-wrap gap-2 mt-4">
//                 {selectedInterests.map((interest) => (
//                   <Badge
//                     key={interest}
//                     variant="secondary"
//                     className="flex items-center gap-1"
//                   >
//                     {interest}
//                     <button
//                       className="ml-1 text-muted-foreground hover:text-foreground"
//                       onClick={() => toggleInterest(interest)}
//                     >
//                       ×
//                     </button>
//                   </Badge>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredBuddies.map((buddy) => (
//               <TravelBuddyCard
//                 key={buddy.id}
//                 id={buddy.id}
//                 user={buddy.user}
//                 destination={buddy.destination}
//                 fromDate={buddy.fromDate}
//                 toDate={buddy.toDate}
//                 interests={buddy.interests}
//                 message={buddy.message}
//                 onConnect={handleConnectWithBuddy}
//               />
//             ))}
//           </div>

//           {filteredBuddies.length === 0 && (
//             <div className="text-center py-16 bg-card rounded-xl shadow-sm border">
//               <h3 className="text-xl font-semibold mb-2">
//                 No travel buddies found
//               </h3>
//               <p className="text-muted-foreground mb-6">
//                 Try adjusting your search or filters to find compatible travel
//                 companions.
//               </p>
//               <div className="space-y-4">
//                 <p className="font-medium">
//                   Some popular destinations to explore:
//                 </p>
//                 <div className="flex flex-wrap justify-center gap-2">
//                   {[
//                     "Rajasthan",
//                     "Kerala",
//                     "Varanasi",
//                     "Hampi",
//                     "Spiti Valley",
//                   ].map((place) => (
//                     <Button
//                       key={place}
//                       variant="outline"
//                       onClick={() => setSearchTerm(place)}
//                     >
//                       {place}
//                     </Button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="mt-12 bg-card rounded-xl shadow-sm border p-8 text-center">
//             <h3 className="text-2xl font-semibold mb-4">
//               Can't find a travel buddy?
//             </h3>
//             <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
//               Create your own travel plan and let others connect with you! Share
//               your destination, dates, and what you're looking for in a travel
//               companion.
//             </p>
//             <a
//               href="https://vistara-travel-itinerary-generator.streamlit.app/"
//               rel="noopener noreferrer"
//             >
//               <Button size="lg">Create Travel Plan</Button>
//             </a>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Connect;

// updated Connect.tsx
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import PageHeader from "../components/common/PageHeader";
import TravelBuddyCard from "../components/connect/TravelBuddyCard";
import { Search, Calendar as CalendarIcon, User } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Calendar as CalendarComponent } from "../components/ui/calendar";
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
import { Badge } from "../components/ui/badge";

const Connect = () => {
  const [buddies, setBuddies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    uname: "",
    age: "",
    gender: "",
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
        place: "",
        interest: "",
        imageUrl: "",
        description: "",
      });
    }
  };

  const allInterests = [
    ...new Set(buddies.flatMap((buddy) => buddy.interests || [])),
  ].sort();

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const filteredBuddies = buddies.filter((buddy) => {
    const matchesSearch =
      buddy.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      buddy.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesDate = true;
    if (selectedDate) {
      const selectedTime = new Date(selectedDate).getTime();
      const fromTime = new Date(buddy.fromDate).getTime();
      const toTime = new Date(buddy.toDate).getTime();
      matchesDate = selectedTime >= fromTime && selectedTime <= toTime;
    }

    let matchesInterests = true;
    if (selectedInterests.length > 0) {
      matchesInterests = selectedInterests.some((i) =>
        buddy.interests.includes(i)
      );
    }

    return matchesSearch && matchesDate && matchesInterests;
  });

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
            <Button onClick={() => setIsFormOpen(true)}>Find Buddies</Button>
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
              onConnect={() => console.log("connect", buddy._id)}
            />
          ))}
        </div>
      </main>
      <Footer />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Your Travel Plan</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                name="uname"
                value={formData.uname}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label>Age</Label>
              <Input
                name="age"
                type="number"
                value={formData.age}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label>Gender</Label>
              <Input
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label>Destination</Label>
              <Input
                name="place"
                value={formData.place}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
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
            </div>
            <div>
              <Label>Image URL</Label>
              <Input
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Message</Label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
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
