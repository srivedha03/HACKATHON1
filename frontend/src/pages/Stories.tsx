// import { useState } from "react";
// import { stories } from "@/data/stories";
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
// import PageHeader from "@/components/common/PageHeader";
// import StoryCard from "@/components/stories/StoryCard";
// import { Search, Filter, UploadCloud } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
// } from "@/components/ui/dropdown-menu";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const Stories = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [category, setCategory] = useState("all");
//   const [sortBy, setSortBy] = useState("popular");
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);

//   // Form state
//   const [formData, setFormData] = useState({
//     title: "",
//     excerpt: "",
//     content: "",
//     authorName: "",
//     category: "",
//     imageUrl: "",
//   });

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSelectChange = (value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       category: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:5000/api/stories", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         setSubmitSuccess(true);

//         // Reset after 3 seconds
//         setTimeout(() => {
//           setSubmitSuccess(false);
//           setIsFormOpen(false);
//           setFormData({
//             title: "",
//             excerpt: "",
//             content: "",
//             authorName: "",
//             category: "",
//             imageUrl: "",
//           });
//         }, 3000);
//       } else {
//         const errData = await response.json();
//         console.error("Failed to submit:", errData.message);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   const filteredStories = stories.filter((story) => {
//     // Filter by search term
//     const matchesSearch =
//       story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       story.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

//     // Filter by category
//     const matchesCategory =
//       category === "all" ||
//       story.categories.some(
//         (cat) => cat.toLowerCase() === category.toLowerCase()
//       );

//     return matchesSearch && matchesCategory;
//   });

//   // Sort stories
//   const sortedStories = [...filteredStories].sort((a, b) => {
//     if (sortBy === "popular") {
//       return b.likes - a.likes;
//     } else if (sortBy === "comments") {
//       return b.comments - a.comments;
//     } else if (sortBy === "newest") {
//       // This would typically use a date field, but we're using the postedAt string as a proxy
//       return a.postedAt.localeCompare(b.postedAt);
//     }
//     return 0;
//   });

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <main className="flex-grow pt-16">
//         <PageHeader
//           title="Karnataka Stories"
//           description="Explore authentic cultural stories and personal experiences from travelers across Karnataka. Discover hidden gems, ancient traditions, and breathtaking landscapes of this culturally rich state."
//           bgImage="/story-hero.gif"
//         >
//           <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
//             <div className="relative flex-grow w-full max-w-lg">
//               <Search
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
//                 size={18}
//               />
//               <Input
//                 type="text"
//                 placeholder="Search stories..."
//                 className="pl-10 bg-white/80 backdrop-blur-sm border-white/20"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <Button
//               className="w-full md:w-auto"
//               onClick={() => setIsFormOpen(true)}
//             >
//               <UploadCloud size={18} className="mr-2" />
//               Share Your Story
//             </Button>
//           </div>
//         </PageHeader>

//         <div className="container mx-auto px-4 md:px-8 lg:px-20 py-8 md:py-12">
//           <div className="flex flex-col gap-4 mb-8">
//             {/* Scrollable tabs for mobile */}
//             <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
//               <Tabs
//                 defaultValue="all"
//                 className="w-full"
//                 onValueChange={setCategory}
//               >
//                 <TabsList className="inline-flex w-max md:w-auto">
//                   <TabsTrigger value="all">All</TabsTrigger>
//                   <TabsTrigger value="Historical">Historical</TabsTrigger>
//                   <TabsTrigger value="Adventure">Adventure</TabsTrigger>
//                   <TabsTrigger value="Cultural">Cultural</TabsTrigger>
//                   <TabsTrigger value="Festival">Festivals</TabsTrigger>
//                   <TabsTrigger value="Spiritual">Spiritual</TabsTrigger>
//                   <TabsTrigger value="Cuisine">Cuisine</TabsTrigger>
//                 </TabsList>
//               </Tabs>
//             </div>

//             <div className="flex items-center w-full">
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     variant="outline"
//                     className="flex items-center gap-2 ml-auto"
//                   >
//                     <Filter size={16} />
//                     <span className="hidden sm:inline">Sort:</span>
//                     <span>
//                       {sortBy === "popular"
//                         ? "Most Popular"
//                         : sortBy === "comments"
//                         ? "Most Commented"
//                         : "Newest"}
//                     </span>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuItem onClick={() => setSortBy("popular")}>
//                     Most Popular
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => setSortBy("comments")}>
//                     Most Commented
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => setSortBy("newest")}>
//                     Newest
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </div>

//           {sortedStories.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {sortedStories.map((story) => (
//                 <StoryCard
//                   key={story.id}
//                   id={story.id}
//                   title={story.title}
//                   excerpt={story.excerpt}
//                   thumbnail={story.thumbnail}
//                   author={story.author}
//                   postedAt={story.postedAt}
//                   likes={story.likes}
//                   comments={story.comments}
//                   categories={story.categories}
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-16">
//               <h3 className="text-xl font-semibold mb-2">No stories found</h3>
//               <p className="text-muted-foreground">
//                 Try adjusting your search or filters to find what you're looking
//                 for.
//               </p>
//             </div>
//           )}
//         </div>
//       </main>
//       <Footer />

//       {/* Story Submission Form Dialog - Made responsive */}
//       <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
//         <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto p-4 sm:p-6 w-[95vw]">
//           <DialogHeader>
//             <DialogTitle className="text-xl sm:text-2xl">
//               Share Your Karnataka Story
//             </DialogTitle>
//             <DialogDescription className="text-sm sm:text-base">
//               Share your experience of Karnataka's hidden cultural gems,
//               traditions, or festivals. Your story will be reviewed before being
//               published.
//             </DialogDescription>
//           </DialogHeader>

//           {submitSuccess ? (
//             <Alert className="bg-green-50 border-green-200 text-green-800">
//               <AlertDescription className="flex items-center justify-center py-4">
//                 <div className="text-center">
//                   <div className="flex justify-center mb-2">
//                     <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
//                       <svg
//                         className="h-6 w-6 text-green-600"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M5 13l4 4L19 7"
//                         ></path>
//                       </svg>
//                     </div>
//                   </div>
//                   <h3 className="text-lg sm:text-xl font-semibold mb-1">
//                     Submitted Successfully!
//                   </h3>
//                   <p className="text-sm sm:text-base">
//                     Thank you for sharing your Karnataka story. Our team will
//                     review it shortly.
//                   </p>
//                 </div>
//               </AlertDescription>
//             </Alert>
//           ) : (
//             <form
//               onSubmit={handleSubmit}
//               className="space-y-4 sm:space-y-6 mt-2"
//             >
//               <div className="space-y-3 sm:space-y-4">
//                 <div>
//                   <Label htmlFor="title" className="text-sm sm:text-base">
//                     Story Title *
//                   </Label>
//                   <Input
//                     id="title"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleInputChange}
//                     placeholder="e.g., My Adventure at Jog Falls"
//                     required
//                     className="mt-1"
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="excerpt" className="text-sm sm:text-base">
//                     Brief Summary *
//                   </Label>
//                   <Textarea
//                     id="excerpt"
//                     name="excerpt"
//                     value={formData.excerpt}
//                     onChange={handleInputChange}
//                     placeholder="A short description of your story (max 150 characters)"
//                     className="resize-none mt-1"
//                     maxLength={150}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="content" className="text-sm sm:text-base">
//                     Your Story *
//                   </Label>
//                   <Textarea
//                     id="content"
//                     name="content"
//                     value={formData.content}
//                     onChange={handleInputChange}
//                     placeholder="Share your experience in detail..."
//                     className="min-h-[120px] sm:min-h-[150px] mt-1"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="authorName" className="text-sm sm:text-base">
//                     Your Name *
//                   </Label>
//                   <Input
//                     id="authorName"
//                     name="authorName"
//                     value={formData.authorName}
//                     onChange={handleInputChange}
//                     placeholder="e.g., Karthik Gowda"
//                     required
//                     className="mt-1"
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="category" className="text-sm sm:text-base">
//                     Category *
//                   </Label>
//                   <Select
//                     value={formData.category}
//                     onValueChange={handleSelectChange}
//                     required
//                   >
//                     <SelectTrigger className="w-full mt-1">
//                       <SelectValue placeholder="Select a category" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="Historical">Historical</SelectItem>
//                       <SelectItem value="Adventure">Adventure</SelectItem>
//                       <SelectItem value="Cultural">Cultural</SelectItem>
//                       <SelectItem value="Festival">Festival</SelectItem>
//                       <SelectItem value="Spiritual">Spiritual</SelectItem>
//                       <SelectItem value="Cuisine">Cuisine</SelectItem>
//                       <SelectItem value="Architecture">Architecture</SelectItem>
//                       <SelectItem value="Natural">Natural</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div>
//                   <Label htmlFor="imageUrl" className="text-sm sm:text-base">
//                     Image URL
//                   </Label>
//                   <Input
//                     id="imageUrl"
//                     name="imageUrl"
//                     value={formData.imageUrl}
//                     onChange={handleInputChange}
//                     placeholder="https://example.com/your-image.jpg"
//                     className="mt-1"
//                   />
//                   <p className="text-xs text-muted-foreground mt-1">
//                     Please provide a public URL to an image that represents your
//                     story
//                   </p>
//                 </div>
//               </div>

//               <DialogFooter className="sm:flex-row flex-col gap-3 pt-2">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => setIsFormOpen(false)}
//                   className="w-full sm:w-auto order-2 sm:order-1"
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   className="w-full sm:w-auto order-1 sm:order-2"
//                 >
//                   Submit For Review
//                 </Button>
//               </DialogFooter>
//             </form>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Stories;

// import { useEffect, useState } from "react";
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
// import PageHeader from "@/components/common/PageHeader";
// import StoryCard from "@/components/stories/StoryCard";
// import { Search, Filter, UploadCloud } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
// } from "@/components/ui/dropdown-menu";

// interface Story {
//   _id: string;
//   title: string;
//   excerpt: string;
//   content: string;
//   authorName: string;
//   category: string;
//   imageUrl: string;
//   createdAt: string;
//   likes: number;
//   comments: number;
//   media?: {
//     url: string;
//     caption?: string;
//     type: "image" | "video";
//   }[];
// }

// const Stories = () => {
//   const [stories, setStories] = useState<Story[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [category, setCategory] = useState("all");
//   const [sortBy, setSortBy] = useState("popular");

//   useEffect(() => {
//     const fetchStories = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/stories");
//         const data = await res.json();
//         setStories(data);
//       } catch (error) {
//         console.error("Error fetching stories:", error);
//       }
//     };
//     fetchStories();
//   }, []);

//   const filteredStories = stories.filter((story) => {
//     const matchesSearch =
//       story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       story.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory =
//       category === "all" ||
//       story.category.toLowerCase() === category.toLowerCase();
//     return matchesSearch && matchesCategory;
//   });

//   const sortedStories = [...filteredStories].sort((a, b) => {
//     if (sortBy === "popular") return (b.likes ?? 0) - (a.likes ?? 0);
//     if (sortBy === "comments") return (b.comments ?? 0) - (a.comments ?? 0);
//     if (sortBy === "newest")
//       return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
//     return 0;
//   });

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <main className="flex-grow pt-16">
//         <PageHeader
//           title="Karnataka Stories"
//           description="Explore authentic cultural stories and personal experiences from travelers across Karnataka."
//           bgImage="/story-hero.gif"
//         >
//           <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
//             <div className="relative flex-grow w-full max-w-lg">
//               <Search
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
//                 size={18}
//               />
//               <Input
//                 type="text"
//                 placeholder="Search stories..."
//                 className="pl-10 bg-white/80 backdrop-blur-sm border-white/20"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>
//         </PageHeader>

//         <div className="container mx-auto px-4 md:px-8 lg:px-20 py-8 md:py-12">
//           <div className="flex flex-col gap-4 mb-8">
//             <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
//               <Tabs defaultValue="all" onValueChange={setCategory}>
//                 <TabsList className="inline-flex w-max md:w-auto">
//                   {[
//                     "all",
//                     "Historical",
//                     "Adventure",
//                     "Cultural",
//                     "Festival",
//                     "Spiritual",
//                     "Cuisine",
//                   ].map((cat) => (
//                     <TabsTrigger key={cat} value={cat}>
//                       {cat === "all" ? "All" : cat}
//                     </TabsTrigger>
//                   ))}
//                 </TabsList>
//               </Tabs>
//             </div>
//             <div className="flex items-center w-full">
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     variant="outline"
//                     className="ml-auto flex items-center gap-2"
//                   >
//                     <Filter size={16} />
//                     <span className="hidden sm:inline">Sort:</span>
//                     <span>
//                       {sortBy === "popular"
//                         ? "Most Popular"
//                         : sortBy === "comments"
//                         ? "Most Commented"
//                         : "Newest"}
//                     </span>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuItem onClick={() => setSortBy("popular")}>
//                     Most Popular
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => setSortBy("comments")}>
//                     Most Commented
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => setSortBy("newest")}>
//                     Newest
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </div>

//           {sortedStories.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {sortedStories.map((story) => (
//                 <StoryCard
//                   key={story._id}
//                   id={story._id}
//                   title={story.title}
//                   excerpt={story.excerpt}
//                   content={story.content}
//                   thumbnail={story.imageUrl}
//                   author={{ name: story.authorName }}
//                   postedAt={new Date(story.createdAt).toLocaleDateString()}
//                   likes={story.likes}
//                   comments={story.comments}
//                   categories={[story.category]}
//                   media={story.media}
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-16">
//               <h3 className="text-xl font-semibold mb-2">No stories found</h3>
//               <p className="text-muted-foreground">
//                 Try adjusting your search or filters.
//               </p>
//             </div>
//           )}
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Stories;

// WORKING

// import { useEffect, useState } from "react";
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
// import PageHeader from "@/components/common/PageHeader";
// import StoryCard from "@/components/stories/StoryCard";
// import { Search, Filter, UploadCloud } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
// } from "@/components/ui/dropdown-menu";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// interface Story {
//   _id: string;
//   title: string;
//   excerpt: string;
//   content: string;
//   authorName: string;
//   category: string;
//   imageUrl: string;
//   createdAt: string;
//   likes: number;
//   comments: number;
//   media?: {
//     url: string;
//     caption?: string;
//     type: "image" | "video";
//   }[];
// }

// const Stories = () => {
//   const [stories, setStories] = useState<Story[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [category, setCategory] = useState("all");
//   const [sortBy, setSortBy] = useState("popular");
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);

//   const [formData, setFormData] = useState({
//     title: "",
//     excerpt: "",
//     content: "",
//     authorName: "",
//     category: "",
//     imageUrl: "",
//   });

//   useEffect(() => {
//     const fetchStories = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/stories");
//         const data = await res.json();
//         setStories(data);
//       } catch (error) {
//         console.error("Error fetching stories:", error);
//       }
//     };
//     fetchStories();
//   }, []);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSelectChange = (value: string) => {
//     setFormData((prev) => ({ ...prev, category: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:5000/api/stories", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       if (res.ok) {
//         setSubmitSuccess(true);
//         setTimeout(() => {
//           setSubmitSuccess(false);
//           setIsFormOpen(false);
//           setFormData({
//             title: "",
//             excerpt: "",
//             content: "",
//             authorName: "",
//             category: "",
//             imageUrl: "",
//           });
//         }, 3000);
//       } else {
//         const err = await res.json();
//         console.error("Submit failed:", err.message);
//       }
//     } catch (error) {
//       console.error("Submit error:", error);
//     }
//   };

//   const filteredStories = stories.filter((story) => {
//     const matchesSearch =
//       story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       story.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory =
//       category === "all" ||
//       story.category.toLowerCase() === category.toLowerCase();
//     return matchesSearch && matchesCategory;
//   });

//   const sortedStories = [...filteredStories].sort((a, b) => {
//     if (sortBy === "popular") return (b.likes ?? 0) - (a.likes ?? 0);
//     if (sortBy === "comments") return (b.comments ?? 0) - (a.comments ?? 0);
//     if (sortBy === "newest")
//       return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
//     return 0;
//   });

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <main className="flex-grow pt-16">
//         <PageHeader
//           title="Karnataka Stories"
//           description="Explore authentic cultural stories and personal experiences from travelers across Karnataka."
//           bgImage="/story-hero.gif"
//         >
//           <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
//             <div className="relative flex-grow w-full max-w-lg">
//               <Search
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
//                 size={18}
//               />
//               <Input
//                 type="text"
//                 placeholder="Search stories..."
//                 className="pl-10 bg-white/80 backdrop-blur-sm border-white/20"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <Button
//               className="w-full md:w-auto"
//               onClick={() => setIsFormOpen(true)}
//             >
//               <UploadCloud size={18} className="mr-2" />
//               Share Your Story
//             </Button>
//           </div>
//         </PageHeader>

//         <div className="container mx-auto px-4 md:px-8 lg:px-20 py-8 md:py-12">
//           <div className="flex flex-col gap-4 mb-8">
//             <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
//               <Tabs defaultValue="all" onValueChange={setCategory}>
//                 <TabsList className="inline-flex w-max md:w-auto">
//                   {[
//                     "all",
//                     "Historical",
//                     "Adventure",
//                     "Cultural",
//                     "Festival",
//                     "Spiritual",
//                     "Cuisine",
//                   ].map((cat) => (
//                     <TabsTrigger key={cat} value={cat}>
//                       {cat === "all" ? "All" : cat}
//                     </TabsTrigger>
//                   ))}
//                 </TabsList>
//               </Tabs>
//             </div>
//             <div className="flex items-center w-full">
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     variant="outline"
//                     className="ml-auto flex items-center gap-2"
//                   >
//                     <Filter size={16} />
//                     <span className="hidden sm:inline">Sort:</span>
//                     <span>
//                       {sortBy === "popular"
//                         ? "Most Popular"
//                         : sortBy === "comments"
//                         ? "Most Commented"
//                         : "Newest"}
//                     </span>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuItem onClick={() => setSortBy("popular")}>
//                     Most Popular
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => setSortBy("comments")}>
//                     Most Commented
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => setSortBy("newest")}>
//                     Newest
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </div>

//           {sortedStories.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {sortedStories.map((story) => (
//                 <StoryCard
//                   key={story._id}
//                   id={story._id}
//                   title={story.title}
//                   excerpt={story.excerpt}
//                   content={story.content}
//                   thumbnail={story.imageUrl}
//                   author={{ name: story.authorName }}
//                   postedAt={new Date(story.createdAt).toLocaleDateString()}
//                   likes={story.likes}
//                   comments={story.comments}
//                   categories={[story.category]}
//                   media={story.media}
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-16">
//               <h3 className="text-xl font-semibold mb-2">No stories found</h3>
//               <p className="text-muted-foreground">
//                 Try adjusting your search or filters.
//               </p>
//             </div>
//           )}
//         </div>
//       </main>
//       <Footer />

//       {/* Form Dialog */}
//       <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
//         <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto p-4 sm:p-6 w-[95vw]">
//           <DialogHeader>
//             <DialogTitle>Share Your Karnataka Story</DialogTitle>
//             <DialogDescription>
//               Share your experience of Karnataka’s hidden gems, traditions, or
//               festivals. Your story will be reviewed before publishing.
//             </DialogDescription>
//           </DialogHeader>

//           {submitSuccess ? (
//             <Alert className="bg-green-50 border-green-200 text-green-800">
//               <AlertDescription className="py-4 text-center">
//                 🎉 Submitted Successfully! Our team will review your story soon.
//               </AlertDescription>
//             </Alert>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-4 mt-4">
//               <div>
//                 <Label htmlFor="title">Story Title *</Label>
//                 <Input
//                   id="title"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="excerpt">Brief Summary *</Label>
//                 <Textarea
//                   id="excerpt"
//                   name="excerpt"
//                   value={formData.excerpt}
//                   onChange={handleInputChange}
//                   maxLength={150}
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="content">Your Story *</Label>
//                 <Textarea
//                   id="content"
//                   name="content"
//                   value={formData.content}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="authorName">Your Name *</Label>
//                 <Input
//                   id="authorName"
//                   name="authorName"
//                   value={formData.authorName}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="category">Category *</Label>
//                 <Select
//                   value={formData.category}
//                   onValueChange={handleSelectChange}
//                 >
//                   <SelectTrigger className="w-full mt-1">
//                     <SelectValue placeholder="Select a category" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {[
//                       "Historical",
//                       "Adventure",
//                       "Cultural",
//                       "Festival",
//                       "Spiritual",
//                       "Cuisine",
//                       "Architecture",
//                       "Natural",
//                     ].map((cat) => (
//                       <SelectItem key={cat} value={cat}>
//                         {cat}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div>
//                 <Label htmlFor="imageUrl">Image URL</Label>
//                 <Input
//                   id="imageUrl"
//                   name="imageUrl"
//                   value={formData.imageUrl}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <DialogFooter className="mt-4 flex flex-col sm:flex-row gap-2">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => setIsFormOpen(false)}
//                 >
//                   Cancel
//                 </Button>
//                 <Button type="submit">Submit for Review</Button>
//               </DialogFooter>
//             </form>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Stories;

// ----------------------------FINAL------------------------------------------
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/common/PageHeader";
import StoryCard from "@/components/stories/StoryCard";
import { Search, Filter, UploadCloud } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Story {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  authorName: string;
  category: string;
  imageUrl: string;
  createdAt: string;
  likes: number;
  comments: number;
  media?: {
    url: string;
    caption?: string;
    type: "image" | "video";
  }[];
}

const Stories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    authorName: "",
    category: "",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/stories");
        const data = await res.json();
        setStories(data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };
    fetchStories();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const newStory = await res.json(); // ✅ get the new story returned from backend

        // ✅ add new story to the top of the list
        setStories((prev) => [newStory, ...prev]);

        setSubmitSuccess(true);
        setTimeout(() => {
          setSubmitSuccess(false);
          setIsFormOpen(false);
          setFormData({
            title: "",
            excerpt: "",
            content: "",
            authorName: "",
            category: "",
            imageUrl: "",
          });
        }, 3000);
      } else {
        const err = await res.json();
        console.error("Submit failed:", err.message);
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const filteredStories = stories.filter((story) => {
    const matchesSearch =
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      category === "all" ||
      story.category.toLowerCase() === category.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const sortedStories = [...filteredStories].sort((a, b) => {
    if (sortBy === "popular") return (b.likes ?? 0) - (a.likes ?? 0);
    if (sortBy === "comments") return (b.comments ?? 0) - (a.comments ?? 0);
    if (sortBy === "newest")
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        <PageHeader
          title="Karnataka Stories"
          description="Explore authentic cultural stories and personal experiences from travelers across Karnataka."
          bgImage="/story-hero.gif"
        >
          <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
            <div className="relative flex-grow w-full max-w-lg">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <Input
                type="text"
                placeholder="Search stories..."
                className="pl-10 bg-white/80 backdrop-blur-sm border-white/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              className="w-full md:w-auto"
              onClick={() => setIsFormOpen(true)}
            >
              <UploadCloud size={18} className="mr-2" />
              Share Your Story
            </Button>
          </div>
        </PageHeader>

        <div className="container mx-auto px-4 md:px-8 lg:px-20 py-8 md:py-12">
          <div className="flex flex-col gap-4 mb-8">
            <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
              <Tabs defaultValue="all" onValueChange={setCategory}>
                <TabsList className="inline-flex w-max md:w-auto">
                  {[
                    "all",
                    "Historical",
                    "Adventure",
                    "Cultural",
                    "Festival",
                    "Spiritual",
                    "Cuisine",
                  ].map((cat) => (
                    <TabsTrigger key={cat} value={cat}>
                      {cat === "all" ? "All" : cat}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            <div className="flex items-center w-full">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="ml-auto flex items-center gap-2"
                  >
                    <Filter size={16} />
                    <span className="hidden sm:inline">Sort:</span>
                    <span>
                      {sortBy === "popular"
                        ? "Most Popular"
                        : sortBy === "comments"
                        ? "Most Commented"
                        : "Newest"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortBy("popular")}>
                    Most Popular
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem onClick={() => setSortBy("comments")}>
                    Most Commented
                  </DropdownMenuItem> */}
                  <DropdownMenuItem onClick={() => setSortBy("newest")}>
                    Newest
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {sortedStories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedStories.map((story) => (
                <StoryCard
                  key={story._id}
                  id={story._id}
                  title={story.title}
                  excerpt={story.excerpt}
                  content={story.content}
                  thumbnail={story.imageUrl}
                  author={{ name: story.authorName }}
                  postedAt={new Date(story.createdAt).toLocaleDateString()}
                  likes={story.likes}
                  comments={story.comments}
                  categories={[story.category]}
                  media={story.media}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No stories found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto p-4 sm:p-6 w-[95vw]">
          <DialogHeader>
            <DialogTitle>Share Your Karnataka Story</DialogTitle>
            <DialogDescription>
              Share your experience of Karnataka’s hidden gems, traditions, or
              festivals. Your story will be reviewed before publishing.
            </DialogDescription>
          </DialogHeader>

          {submitSuccess ? (
            <Alert className="bg-green-50 border-green-200 text-green-800">
              <AlertDescription className="py-4 text-center">
                🎉 Submitted Successfully! Our team will review your story soon.
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <Label htmlFor="title">Story Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., My Adventure at Jog Falls"
                  required
                />
              </div>
              <div>
                <Label htmlFor="excerpt">Brief Summary *</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  maxLength={150}
                  placeholder="A short description of your story (max 150 characters)"
                  required
                />
              </div>
              <div>
                <Label htmlFor="content">Your Story *</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="e.g., My Adventure at Jog Falls"
                  required
                />
              </div>
              <div>
                <Label htmlFor="authorName">Your Name *</Label>
                <Input
                  id="authorName"
                  name="authorName"
                  value={formData.authorName}
                  onChange={handleInputChange}
                  placeholder="e.g.,Vedha"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Historical",
                      "Adventure",
                      "Cultural",
                      "Festival",
                      "Spiritual",
                      "Cuisine",
                      "Architecture",
                      "Natural",
                    ].map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/your-image.jpg"
                />
              </div>

              <DialogFooter className="mt-4 flex flex-col sm:flex-row gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsFormOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Submit for Review</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Stories;
