import Link from "next/link";

export default function ArticlesCard({image, title, content, id}) {
  return (
    <Link href={`articles/${id}`} className="bg-white h-64 max-w-sm rounded-md overflow-hidden hover:border-slate-400 group shadow-md transition-transform hover:scale-105">
      <img
        className=" object-cover w-full h-[50%]"
        src={image}
        alt={`gambar ${title}`}
      />
      <p className="text-slate-700 font-bold mx-2 mt-1.5 text-sm group-hover:text-[#ea384d]">
        {title}
      </p>
      <p className="text-slate-400 text-xs mx-2 mt-3">
        {content.length > 100 ? content.slice(0, 100) + "..." : content}
      </p>
    </Link>
  );
}
