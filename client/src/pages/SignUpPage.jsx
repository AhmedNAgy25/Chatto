import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";
import { FormField, PasswordField } from "../components/forms";
import Button from "../components/ui/Button";
import { Container } from "../components/layout";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      signup(formData);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-4 sm:p-6 lg:p-12 order-2 lg:order-1">
        <Container maxWidth="md">
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center mb-6 sm:mb-8">
              <div className="flex flex-col items-center gap-2 group">
                <div
                  className="size-10 sm:size-12 rounded-xl bg-primary/10 flex items-center justify-center 
                group-hover:bg-primary/20 transition-colors"
                >
                  <MessageSquare className="size-5 sm:size-6 text-primary" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold mt-2">
                  Create Account
                </h1>
                <p className="text-sm sm:text-base text-base-content/60">
                  Get started with your free account
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <FormField
                label="Full Name"
                icon={
                  <User className="size-4 sm:size-5 text-base-content/40" />
                }
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />

              <FormField
                label="Email"
                icon={
                  <MessageSquare className="size-4 sm:size-5 text-base-content/40" />
                }
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <PasswordField
                label="Password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isSigningUp}
                loading={isSigningUp}
              >
                {isSigningUp ? "Loading..." : "Create Account"}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm sm:text-base text-base-content/60">
                Already have an account?{" "}
                <Link to="/login" className="link link-primary">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </div>

      <div className="order-1 lg:order-2">
        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
        />
      </div>
    </div>
  );
};
export default SignUpPage;
