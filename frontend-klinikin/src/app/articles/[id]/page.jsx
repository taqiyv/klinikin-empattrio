import API from "@/lib/api";
import NavbarUmum from "@/components/NavbarUmum";
import Footer from "@/components/Footer";


export default async function ArticleDetail({ params }) {
  const res = await API.get(`article/${params.id}`);
  const article = res.data.data;

  return (
    <>
      <NavbarUmum />
      <div className="max-w-3xl mx-auto py-10 px-4">
        <div className="bg-red-50 rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-red-700 mb-4">
            {article.title}
          </h1>
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 object-cover rounded-md mb-6 border-4 border-red-200"
          />
          <p className="text-lg text-red-900 leading-relaxed">
            {article.content}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
