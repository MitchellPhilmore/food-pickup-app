"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Utensils, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function DashboardLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
        console.error("Login error:", result.error);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Unexpected error during login:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-5"
        initial={{ backgroundPosition: "0% 0%" }}
        animate={{ backgroundPosition: "100% 100%" }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23FFA500" fill-opacity="0.4"%3E%3Cpath d="M0 0h20L0 20z"/%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: "20px 20px",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative"
      >
        <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-amber-600/20">
          <div className="bg-amber-600 p-4 flex justify-center items-center">
            <Utensils className="text-gray-900 h-12 w-12" />
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <h1 className="text-3xl font-bold text-center text-amber-500">
              Soul Food Dashboard
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="space-y-2"
            >
              <Label htmlFor="email" className="text-amber-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-700 border-gray-600 text-amber-100 placeholder-amber-300/50 focus:border-amber-500 focus:ring-amber-500"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="space-y-2"
            >
              <Label htmlFor="password" className="text-amber-300">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-700 border-gray-600 text-amber-100 placeholder-amber-300/50 focus:border-amber-500 focus:ring-amber-500"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-gray-900 font-semibold transition-colors duration-300"
              >
                Log In
              </Button>
            </motion.div>
          </form>
          <motion.div
            className="bg-gray-700 p-4 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="text-amber-300 text-sm flex items-center">
              <Coffee className="mr-2 h-4 w-4" />
              Serving up comfort, one login at a time
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
