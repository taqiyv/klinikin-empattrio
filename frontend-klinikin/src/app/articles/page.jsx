import API from "@/lib/api";
import ArticlesCard from "@/components/ArticlesCard";

export default async function Page() {
  const res = await API.get("/articles");
  const articles = res.data;
  

  return (
    <div>
      <h1 className="text-xl font-bold">Semua Aartikel</h1>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {articles?.data?.slice(0, 4).map((article) => (
          <ArticlesCard
            key={article.id}
            image={article.image}
            title={article.title}
            content={article.content}
          />
        ))}
      </div>
    </div>
  );
}
