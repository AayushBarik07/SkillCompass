import AuthForm from "@/components/AuthForm";

export default function SignupPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <AuthForm type="signup" />
    </div>
  );
}
