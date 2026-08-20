import AuthForm from "@/components/auth/AuthForm";

export default function SignupPage() {
  return (
    <main className="bg-gray-50">
      <section className="mx-auto grid min-h-[70vh] max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-orange-600">
            Join Horoo
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-950 md:text-4xl">
            Create your account
          </h1>
          <p className="mt-3 text-base leading-7 text-gray-600">
            Choose tenant or owner during signup. Owner accounts can list and
            manage rental properties.
          </p>
        </div>
        <AuthForm defaultMode="signup" />
      </section>
    </main>
  );
}
