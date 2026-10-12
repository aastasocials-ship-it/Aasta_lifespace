import { useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { InquiryDialog } from "@/components/InquiryDialog";
import { StartProjectBand } from "@/components/StartProjectBand";
import { BLOG_POSTS } from "@/data/blogs";

const Blog = () => {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [featured, ...rest] = BLOG_POSTS;
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-ink/10 px-6 py-5 lg:px-20"><Link to="/" className="inline-flex items-center gap-3 text-[10px] tracking-label uppercase text-ink-soft hover:text-copper"><ArrowLeft size={14} /> Back to Aasta</Link><nav className="flex items-center gap-6"><Link to="/projects" className="hidden text-[10px] tracking-label uppercase text-ink-soft hover:text-copper sm:inline">Projects</Link><button type="button" onClick={() => setInquiryOpen(true)} className="inline-flex items-center gap-2 bg-ink px-5 py-3 text-[10px] tracking-label uppercase text-ivory hover:bg-copper">Contact us <ArrowUpRight size={13} /></button></nav></header>
      <section className="px-6 py-20 lg:px-20 lg:py-28">
        <p className="text-[10px] tracking-label uppercase text-copper">Journal</p>
        <h1 className="mt-8 max-w-4xl font-display text-6xl leading-[.95] text-ink lg:text-8xl">Notes on <span className="font-italic-serif text-copper">building well.</span></h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">Practical guidance from four decades of designing and building homes — on planning, budgets, materials and making a house that lasts.</p>

        <Link to={`/blog/${featured.slug}`} className="group mt-16 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="overflow-hidden lg:col-span-7"><img src={featured.coverImage} alt={featured.title} className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" /></div>
          <div className="lg:col-span-5"><p className="text-[10px] tracking-label uppercase text-copper">{featured.category} · {featured.readTime}</p><h2 className="mt-4 font-display text-4xl leading-tight text-ink transition-colors group-hover:text-copper">{featured.title}</h2><p className="mt-4 leading-relaxed text-ink-soft">{featured.excerpt}</p><span className="mt-6 inline-flex items-center gap-2 text-[10px] tracking-label uppercase text-ink">Read article <ArrowUpRight size={13} /></span></div>
        </Link>

        <div className="mt-20 grid gap-x-6 gap-y-14 md:grid-cols-2 xl:grid-cols-4">
          {rest.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="group">
              <div className="overflow-hidden"><img src={post.coverImage} alt={post.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
              <p className="mt-5 text-[10px] tracking-label uppercase text-copper">{post.category} · {post.readTime}</p>
              <h3 className="mt-2 font-display text-2xl leading-snug text-ink transition-colors group-hover:text-copper">{post.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
      <StartProjectBand title="Have a question about your project?" accent="Ask our team." />
      <InquiryDialog open={inquiryOpen} onOpenChange={setInquiryOpen} />
    </main>
  );
};

export default Blog;
