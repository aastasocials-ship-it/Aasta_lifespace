import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { StartProjectBand } from "@/components/StartProjectBand";
import { BLOG_POSTS, getPost } from "@/data/blogs";
import { getProject } from "@/data/projects";

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? getPost(slug) : undefined;
  if (!post) return <Navigate to="/blog" replace />;
  const project = post.relatedProject ? getProject(post.relatedProject) : undefined;
  const more = BLOG_POSTS.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-ink/10 px-6 py-5 lg:px-20"><Link to="/blog" className="inline-flex items-center gap-3 text-[10px] tracking-label uppercase text-ink-soft hover:text-copper"><ArrowLeft size={14} /> All articles</Link><Link to="/" className="text-[10px] tracking-label uppercase text-ink-soft hover:text-copper">Aasta Lifespace</Link></header>
      <article>
        <div className="px-6 pt-16 lg:px-20 lg:pt-24">
          <div className="mx-auto max-w-3xl">
            <p className="text-[10px] tracking-label uppercase text-copper">{post.category} · {post.readTime}</p>
            <h1 className="mt-6 font-display text-4xl leading-[1.05] text-ink lg:text-6xl">{post.title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">{post.excerpt}</p>
          </div>
        </div>
        <div className="mt-12 px-6 lg:px-20"><img src={post.coverImage} alt={post.title} className="mx-auto aspect-[16/8] w-full max-w-6xl object-cover" /></div>
        <div className="px-6 py-16 lg:px-20 lg:py-24">
          <div className="mx-auto max-w-3xl space-y-10">
            {post.sections.map((section, index) => (
              <section key={section.heading ?? index}>
                {section.heading && <h2 className="font-display text-3xl text-ink">{section.heading}</h2>}
                {section.paragraphs?.map((paragraph) => <p key={paragraph} className="mt-4 text-[17px] leading-relaxed text-ink-soft">{paragraph}</p>)}
                {section.list && <ul className="mt-5 space-y-3">{section.list.map((item) => <li key={item} className="flex gap-3 text-[17px] leading-relaxed text-ink-soft"><span className="mt-3 h-px w-4 shrink-0 bg-copper" />{item}</li>)}</ul>}
              </section>
            ))}
            {project && (
              <Link to={`/projects/${project.slug}`} className="group mt-6 grid gap-6 border-t border-ink/15 pt-10 sm:grid-cols-[200px_1fr] sm:items-center">
                <img src={project.coverImage} alt={project.name} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                <div><p className="text-[10px] tracking-label uppercase text-copper">See it in practice</p><h3 className="mt-2 font-display text-2xl text-ink group-hover:text-copper">{project.name}</h3><p className="mt-2 text-sm text-ink-soft">{project.shortDescription}</p><span className="mt-3 inline-flex items-center gap-2 text-[10px] tracking-label uppercase text-ink">View project <ArrowUpRight size={13} /></span></div>
              </Link>
            )}
          </div>
        </div>
      </article>
      <StartProjectBand dark title="Planning a home or commercial space?" accent="Talk to Aasta Lifespace." />
      <section className="px-6 py-20 lg:px-20 lg:py-28">
        <p className="text-[10px] tracking-label uppercase text-copper">Keep reading</p>
        <div className="mt-8 grid gap-10 md:grid-cols-3">
          {more.map((item) => (
            <Link key={item.slug} to={`/blog/${item.slug}`} className="group">
              <div className="overflow-hidden"><img src={item.coverImage} alt={item.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
              <p className="mt-4 text-[10px] tracking-label uppercase text-copper">{item.category}</p>
              <h3 className="mt-2 font-display text-xl leading-snug text-ink group-hover:text-copper">{item.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default BlogPost;
