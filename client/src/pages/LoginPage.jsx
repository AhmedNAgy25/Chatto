import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import { FormField, PasswordField } from "../components/forms";
import Button from "../components/ui/Button";
import { Container, Card } from "../components/layout";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
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
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      login(formData);
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
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
                transition-colors"
                >
                  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold mt-2">
                  Welcome Back
                </h1>
                <p className="text-sm sm:text-base text-base-content/60">
                  Sign in to your account
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <FormField
                label="Email"
                icon={
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-base-content/40" />
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
                disabled={isLoggingIn}
                loading={isLoggingIn}
              >
                {isLoggingIn ? "Loading..." : "Sign in"}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm sm:text-base text-base-content/60">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="link link-primary">
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </div>

      <div className="order-1 lg:order-2">
        <AuthImagePattern
          title={"Welcome back!"}
          subtitle={
            "Sign in to continue your conversations and catch up with your messages."
          }
        />
      </div>
    </div>
  );
};
export default LoginPage;
