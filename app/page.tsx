import { CompanyForm } from "@/components/CompanyForm";

export default function Home() {
  return (
    <div className="max-w-4xl w-full p-8 sm:p-20">
      <h1 className="text-2xl font-bold mb-8 text-center">Company Information</h1>
      <div className="flex justify-center">
        <CompanyForm />
      </div>
    </div>
  );
}
