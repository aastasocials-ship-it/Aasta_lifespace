import prestigeExt03 from "@/assets/prestige-ext-03.jpg";
import prestigeInt05 from "@/assets/prestige-int-05.jpg";
import wilson05 from "@/assets/wilson-05.jpg";
import kalyan08 from "@/assets/kalyan-08.jpg";
import jayamahal03 from "@/assets/jayamahal-03.jpg";

export interface BlogSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  coverImage: string;
  sections: BlogSection[];
  relatedProject?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "design-and-build-vs-separate-architect-and-contractor",
    title: "Design & Build or a separate architect and contractor: which is right for your home?",
    excerpt: "Two common ways to build a home — and why the gaps between designer and builder matter more than most people expect.",
    category: "Planning",
    readTime: "6 min read",
    coverImage: kalyan08,
    relatedProject: "kalyan-nagar",
    sections: [
      { paragraphs: [
        "When families start planning a home, one of the first decisions is also one of the most important: who will design it, and who will build it? Broadly, there are two routes. You can appoint an architect to design the house and then hire a contractor to build it, or you can work with a single Design & Build firm that handles both.",
        "Both routes can produce good homes. But they distribute responsibility very differently — and that affects your budget, your timeline and how much of your own time the project consumes.",
      ] },
      { heading: "The traditional route", paragraphs: [
        "In the traditional model, the architect prepares drawings, the contractor prices and builds them, and an interior designer often joins later. Each party is responsible for their own scope.",
        "This works well when the owner has the time and experience to coordinate between them. The challenge is that the drawings rarely answer every question on site. When they don't, the contractor interprets, the architect may not be available, and decisions get made under time pressure.",
      ] },
      { heading: "The Design & Build route", paragraphs: [
        "With Design & Build, one team takes responsibility for design, engineering, construction and — often — interiors. The people who draw the house are the people who build it.",
      ], list: [
        "One point of contact for every question",
        "Design decisions are made with construction cost and method in mind",
        "Electrical, plumbing and joinery are planned before walls are built, not after",
        "Budget and timeline are owned by a single, accountable team",
      ] },
      { heading: "Questions to ask before you decide", list: [
        "How much time can I personally give to coordinating the project?",
        "Do I want one estimate that covers the whole job, or am I comfortable combining several?",
        "Who will be responsible if the design and the site don't match?",
        "Will interiors be planned now, or after construction is complete?",
      ] },
      { heading: "Our view", paragraphs: [
        "At Aasta Lifespace we offer Design & Build because, over four decades, we have seen that most problems on a project happen in the handover between people. Removing that handover — so one team carries the idea from the first sketch to the final key — is the simplest way to protect the quality of the finished home.",
      ] },
    ],
  },
  {
    slug: "building-a-home-in-bangalore-stage-by-stage",
    title: "Building a home in Bangalore: a stage-by-stage guide",
    excerpt: "From the first site visit to handover — what happens at each stage of construction, and what you should be looking out for.",
    category: "Construction",
    readTime: "8 min read",
    coverImage: jayamahal03,
    relatedProject: "jaya-mahal",
    sections: [
      { paragraphs: [
        "Building a house is a long journey, and it is easier when you know what is coming next. Here is a simple map of the stages most residential projects pass through, and what matters at each one.",
      ] },
      { heading: "1. Discovery and site study", paragraphs: [
        "Every good home starts with the site — its size, orientation, soil, neighbours, road access and the trees already on it. This is also when we understand the family: how many people will live there, how they spend their days, what they need now and what they may need in ten years.",
      ] },
      { heading: "2. Design and approvals", paragraphs: [
        "Concept layouts become floor plans, elevations and 3D views. Once the design is agreed, working drawings and structural drawings are prepared, and the plan is submitted for the relevant authority approvals.",
      ] },
      { heading: "3. Foundation and structure", paragraphs: [
        "This is the stage that decides how long the building will last. Excavation, footings, columns, beams and slabs are built floor by floor. Reinforcement should be checked before every concrete pour, and concrete must be cured properly.",
      ], list: ["Soil and foundation design matched to site conditions", "Reinforcement checked before each pour", "Slabs cured for the full recommended period", "Basement and retaining walls waterproofed before backfilling"] },
      { heading: "4. Masonry, services and plastering", paragraphs: [
        "Once the frame is up, walls are built and electrical and plumbing routes are marked and chased. Getting this right before plastering avoids breaking finished walls later. Plastering follows, and rooms start to take shape.",
      ] },
      { heading: "5. Finishes and interiors", paragraphs: [
        "Flooring, doors, windows, paint, kitchen, wardrobes, lighting and fittings come in. When interiors are planned alongside construction, this stage moves quickly and with far fewer surprises.",
      ] },
      { heading: "6. Inspection and handover", paragraphs: [
        "A final inspection checks every room, fitting and finish. Any snags are corrected, the site is cleaned, and the home is handed over along with drawings and documentation.",
      ] },
      { heading: "Following progress", paragraphs: [
        "On every Aasta project, clients receive regular updates with site photographs. You can see an example of how we document progress on our ongoing Jaya Mahal project.",
      ] },
    ],
  },
  {
    slug: "what-decides-the-cost-of-building-a-house",
    title: "What really decides the cost of building a house?",
    excerpt: "Built-up area is only the start. Here are the choices that move your construction budget the most.",
    category: "Budgeting",
    readTime: "5 min read",
    coverImage: wilson05,
    sections: [
      { paragraphs: [
        "\"What will it cost per square foot?\" is the most common question we hear — and a fair one. But the per-square-foot number is the result of many decisions, not the starting point. Understanding them helps you spend where it matters.",
      ] },
      { heading: "The biggest cost drivers", list: [
        "Built-up area — including balconies, staircases, basements and terraces",
        "Structure — number of floors, spans, cantilevers and basement work",
        "Specification level — flooring, doors, windows, sanitaryware and fittings",
        "Facade and exterior — cladding, glazing and landscaping",
        "Interiors — kitchen, wardrobes, false ceilings and lighting",
        "Site conditions — soil, slope, access and existing structures",
      ] },
      { heading: "Where not to cut corners", paragraphs: [
        "Some parts of a building are almost impossible to fix later: the foundation, the structure, waterproofing and concealed plumbing and wiring. These deserve the best materials and supervision your budget allows. Finishes like paint, light fittings and soft furnishings can always be upgraded in the future.",
      ] },
      { heading: "How to keep the budget honest", list: [
        "Ask for an itemised estimate, not a single lump sum",
        "Agree the specification of every major item before work starts",
        "Make sure every change is documented with its cost before it is carried out",
        "Plan interiors early so they are included in the budget from day one",
      ] },
      { heading: "Get an indicative number", paragraphs: [
        "Our cost estimator on the home page gives an instant indicative budget based on area and specification level. For a detailed estimate for your site, talk to our team.",
      ] },
    ],
  },
  {
    slug: "planning-interiors-during-construction",
    title: "Why your interiors should be planned before the walls go up",
    excerpt: "Leaving interiors until after construction often means broken walls and compromises. Planning them together saves time, money and frustration.",
    category: "Interiors",
    readTime: "5 min read",
    coverImage: prestigeInt05,
    relatedProject: "prestige-laughing-waters",
    sections: [
      { paragraphs: [
        "Many homeowners think of interiors as something to sort out once the house is built. In practice, the most important interior decisions are made much earlier — and they shape how construction should be done.",
      ] },
      { heading: "What interiors decide", list: [
        "Where every switch, socket and light point needs to be",
        "Where water and drainage lines must run for the kitchen and bathrooms",
        "Where the AC units, pipes and drains will go",
        "How deep wardrobes and storage need to be, and which walls must support them",
        "Ceiling heights for false ceilings and concealed lighting",
      ] },
      { heading: "What happens when it's left too late", paragraphs: [
        "Finished walls get chased for new wiring. Floors are broken for plumbing. Furniture is designed around awkward sockets. Each fix adds cost, delays move-in and rarely looks as good as it would have if it had been planned.",
      ] },
      { heading: "The turnkey approach", paragraphs: [
        "In a turnkey project, interiors are designed alongside the building. Services are laid in the right place first time, joinery is measured off the real walls, and the house is handed over complete — ready to move in.",
      ] },
    ],
  },
  {
    slug: "designing-homes-for-bangalore-climate",
    title: "Designing homes for Bangalore's climate: light, air and greenery",
    excerpt: "How orientation, shading, ventilation and planting can make a home more comfortable all year round.",
    category: "Design",
    readTime: "6 min read",
    coverImage: prestigeExt03,
    relatedProject: "prestige-laughing-waters",
    sections: [
      { paragraphs: [
        "Bangalore's climate is one of the gentlest in India, which makes it ideal for homes that open up to the outdoors. A few careful design decisions can keep a house bright, cool and comfortable without relying heavily on air conditioning.",
      ] },
      { heading: "Let light in, keep heat out", paragraphs: [
        "Large windows and glazed doors bring in daylight, but unshaded glass on the west side can make rooms uncomfortable in the afternoon. Deep balconies, overhangs and fins shade openings while keeping the view.",
      ] },
      { heading: "Plan for cross-ventilation", paragraphs: [
        "Rooms with openings on two sides, internal courtyards and stair cores that act as chimneys help warm air escape and draw in cooler air. Ventilation is easiest to design in at the planning stage.",
      ] },
      { heading: "Use greenery as architecture", paragraphs: [
        "Planted terraces, balconies and green walls shade the building, soften the view from inside and make outdoor spaces genuinely usable. They need proper waterproofing and drainage designed in from the start.",
      ] },
      { heading: "Keep existing trees", paragraphs: [
        "Mature trees are a site's most valuable asset. Planning the building around them gives instant shade, privacy and character that new planting takes years to match.",
      ] },
      { heading: "Choose materials that breathe", list: [
        "Exposed brick and textured plaster for warmth and durability",
        "Light-coloured exteriors to reflect heat",
        "Natural stone and terracotta-toned floors that stay cool underfoot",
      ] },
    ],
  },
];

export const getPost = (slug: string) => BLOG_POSTS.find((post) => post.slug === slug);
