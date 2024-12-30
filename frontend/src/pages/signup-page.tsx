import { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ChevronLeft, ChevronRight, LoaderIcon } from "lucide-react";
import { z } from "zod";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import { signupSchema } from "../lib/utils";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface Review {
  id: number;
  name: string;
  role: string;
  photo: string;
  content: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Buyer",
    photo: "/images/user_1.jpg",
    content:
      "I've been using VendoraX for a few months now, and it's been a game-changer for buying second-hand items. The platform is smooth, easy to navigate, and the transactions are quick and secure. I was able to find some amazing deals that I wouldn't have found elsewhere!",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Seller",
    photo: "/images/user_2.jpg",
    content:
      "VendoraX has made selling my old electronics so easy. The listing process is simple, and I can manage my products effortlessly. I appreciate the secure payment system, and I’ve sold a number of items without any issues!",
  },
  {
    id: 3,
    name: "Michael Johnson",
    role: "Seller",
    photo: "/images/user_3.jpg",
    content:
      "As a frequent seller, I love how VendoraX gives me full control over my listings. The interface is clean, and I can update product details quickly. It's also reassuring to know that their backend ensures secure transactions every time.",
  },
  {
    id: 4,
    name: "Sarah Williams",
    role: "Buyer",
    photo: "/images/user_4.jpg",
    content:
      "Great platform! I was able to find a bike for half the price of what I would have paid at a store. The product search feature is robust, and the entire buying process was smooth. Highly recommend to anyone looking to buy or sell!",
  },
  {
    id: 5,
    name: "David Lee",
    role: "Buyer",
    photo: "/images/user_5.jpg",
    content:
      "I love how fast and responsive VendoraX is! The app loads quickly, and I had no issues browsing through different product categories. The ability to filter by condition, price, and location makes it easy to find exactly what I’m looking for.",
  },
];

interface Errors {
  [key: string]: string[] | undefined;
}

export function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    try {
      signupSchema.parse(formData);
      setIsSubmitting(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(formData);
      toast("Account created successfully!");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.flatten().fieldErrors);
      } else {
        toast("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/*hidden section for large screens*/}
      <div className="hidden lg:flex lg:w-full bg-black text-white p-12 flex-col relative items-center justify-center ">
        <div className="max-w-xl">
          <h1 className="text-5xl font-semibold mb-4">
            Rent, Buy, or Sell — We Make It Easy!
          </h1>
          <p className="text-gray-400 mb-8">
            Whether you're looking to rent, buy, or sell products, VendoraX
            makes the process seamless, fast, and secure for everyone.
          </p>

          <div className="relative bg-zinc-900 p-6 rounded-xl mb-6">
            <div className="mb-4 mx-4">
              <p className="text-white">{reviews[currentReview].content}</p>
            </div>
            <div className="flex items-center gap-3 mx-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                <img
                  src={reviews[currentReview].photo}
                  alt={reviews[currentReview].name}
                  className="w-10 h-10 object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-white">
                  {reviews[currentReview].name}
                </p>
                <p className="text-sm text-gray-400">
                  {reviews[currentReview].role}
                </p>
              </div>
            </div>
            <button
              onClick={prevReview}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-500 transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextReview}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-500 transition-colors"
              aria-label="Next review"
            >
              <ChevronRight size={24} />
            </button>
            <div className="flex justify-center gap-2 mt-4">
              {reviews.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentReview ? "bg-white" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/*visible section for all screens*/}
      <div className="w-full lg:w-full p-6 lg:p-12 flex items-center justify-center">
        <div className="w-full max-w-[440px] mx-7 ">
          <h2 className="text-3xl font-semibold mb-8">Create an account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="sr-only">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.firstName[0]}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName" className="sr-only">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.lastName[0]}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="sr-only">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email[0]}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone" className="sr-only">
                Phone number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone[0]}</p>
              )}
            </div>

            <div className="relative">
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password[0]}
                </p>
              )}
            </div>

            <div className="relative">
              <Label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword[0]}
                </p>
              )}
            </div>

            {isSubmitting ? (
            <Button disabled className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
              <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
              Create an Account
            </Button>
          )}
          </form>

          <div className="mt-6 text-center text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-500 hover:text-orange-600 font-medium"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
