import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Timeline } from "@/components/ui/timeline"

interface BlogPost {
  title: string
  description: string
  date: string
  readTime: string
  slug: string
}

const blogPosts: BlogPost[] = [
  {
    title: "Comment créer une navbar moderne avec Next.js",
    description: "Découvrez comment implémenter une barre de navigation élégante et responsive avec des animations fluides.",
    date: "29 Jan 2024",
    readTime: "5 min",
    slug: "navbar-moderne-nextjs"
  },
  {
    title: "Les meilleures pratiques React en 2024",
    description: "Un guide complet sur les patterns et pratiques recommandés pour le développement React moderne.",
    date: "25 Jan 2024",
    readTime: "8 min",
    slug: "meilleures-pratiques-react-2024"
  },
  {
    title: "Introduction à Tailwind CSS",
    description: "Apprenez à utiliser Tailwind CSS pour créer des interfaces utilisateur modernes et maintenables.",
    date: "20 Jan 2024",
    readTime: "6 min",
    slug: "introduction-tailwind-css"
  }
]

const timelineData = blogPosts.map(post => ({
  title: post.date,
  content: (
    <Link
      href={`/blog/${post.slug}`}
      className="block group"
    >
      <article className="p-6 bg-muted/50 rounded-lg transition-all hover:bg-muted/80">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-2xl font-semibold group-hover:text-primary transition-colors">
            {post.title}
          </h2>
          <ArrowRight className="w-5 h-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </div>
        <p className="text-muted-foreground mb-4">{post.description}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{post.readTime} de lecture</span>
        </div>
      </article>
    </Link>
  )
}))

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-2 mb-12">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="text-muted-foreground">
          Découvrez nos derniers articles sur le développement web et les technologies modernes.
        </p>
      </div>

      <Timeline data={timelineData} />
    </div>
  )
}
