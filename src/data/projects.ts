import arte01 from "@/assets/arte-01.jpg";
import arte02 from "@/assets/arte-02.jpg";
import arte03 from "@/assets/arte-03.jpg";
import arte04 from "@/assets/arte-04.jpg";
import arte05 from "@/assets/arte-05.jpg";
import arte06 from "@/assets/arte-06.jpg";
import arte07 from "@/assets/arte-07.jpg";
import arte08 from "@/assets/arte-08.jpg";
import arte09 from "@/assets/arte-09.jpg";
import arte10 from "@/assets/arte-10.jpg";
import arte11 from "@/assets/arte-11.jpg";
import mohan01 from "@/assets/mohan-01.jpg";
import mohan02 from "@/assets/mohan-02.jpg";
import mohan03 from "@/assets/mohan-03.jpg";
import mohan04 from "@/assets/mohan-04.jpg";
import mohan05 from "@/assets/mohan-05.jpg";
import mohan06 from "@/assets/mohan-06.jpg";
import shri01 from "@/assets/shrinivas-01.jpg";
import kalyan01 from "@/assets/kalyan-01.jpg";
import kalyan02 from "@/assets/kalyan-02.jpg";
import kalyan03 from "@/assets/kalyan-03.jpg";
import kalyan04 from "@/assets/kalyan-04.jpg";
import kalyan05 from "@/assets/kalyan-05.jpg";
import kalyan06 from "@/assets/kalyan-06.jpg";
import kalyan07 from "@/assets/kalyan-07.jpg";
import kalyan08 from "@/assets/kalyan-08.jpg";
import kalyan09 from "@/assets/kalyan-09.jpg";
import kalyan10 from "@/assets/kalyan-10.jpg";
import kalyan11 from "@/assets/kalyan-11.jpg";
import kalyan12 from "@/assets/kalyan-12.jpg";
import kalyan13 from "@/assets/kalyan-13.jpg";
import kalyan14 from "@/assets/kalyan-14.jpg";
import kalyan15 from "@/assets/kalyan-15.jpg";
import kalyan16 from "@/assets/kalyan-16.jpg";
import kalyan17 from "@/assets/kalyan-17.jpg";
import wilson01 from "@/assets/wilson-01.jpg";
import wilson02 from "@/assets/wilson-02.jpg";
import wilson03 from "@/assets/wilson-03.jpg";
import wilson04 from "@/assets/wilson-04.jpg";
import wilson05 from "@/assets/wilson-05.jpg";
import wilson06 from "@/assets/wilson-06.jpg";
import wilson07 from "@/assets/wilson-07.jpg";
import wilson08 from "@/assets/wilson-08.jpg";
import wilson09 from "@/assets/wilson-09.jpg";
import wilson10 from "@/assets/wilson-10.jpg";
import wilson11 from "@/assets/wilson-11.jpg";
import wilson12 from "@/assets/wilson-12.jpg";
import wilson13 from "@/assets/wilson-13.jpg";
import jayamahal01 from "@/assets/jayamahal-01.jpg";
import jayamahal02 from "@/assets/jayamahal-02.jpg";
import jayamahal03 from "@/assets/jayamahal-03.jpg";
import jayamahal04 from "@/assets/jayamahal-04.jpg";
import jayamahal05 from "@/assets/jayamahal-05.jpg";
import jayamahal06 from "@/assets/jayamahal-06.jpg";
import jayamahal07 from "@/assets/jayamahal-07.jpg";
import prestigeExt01 from "@/assets/prestige-ext-01.jpg";
import prestigeExt02 from "@/assets/prestige-ext-02.jpg";
import prestigeExt03 from "@/assets/prestige-ext-03.jpg";
import prestigeExt04 from "@/assets/prestige-ext-04.jpg";
import prestigeExt05 from "@/assets/prestige-ext-05.jpg";
import prestigeExt06 from "@/assets/prestige-ext-06.jpg";
import prestigeExt07 from "@/assets/prestige-ext-07.jpg";
import prestigeInt01 from "@/assets/prestige-int-01.jpg";
import prestigeInt02 from "@/assets/prestige-int-02.jpg";
import prestigeInt03 from "@/assets/prestige-int-03.jpg";
import prestigeInt04 from "@/assets/prestige-int-04.jpg";
import prestigeInt05 from "@/assets/prestige-int-05.jpg";
import prestigeInt06 from "@/assets/prestige-int-06.jpg";
import prestigeInt07 from "@/assets/prestige-int-07.jpg";
import prestigeInt08 from "@/assets/prestige-int-08.jpg";
import prestigeInt09 from "@/assets/prestige-int-09.jpg";
import prestigeInt10 from "@/assets/prestige-int-10.jpg";
import prestigeInt11 from "@/assets/prestige-int-11.jpg";
import prestigeInt12 from "@/assets/prestige-int-12.jpg";
import prestigeTerrace01 from "@/assets/prestige-terrace-01.jpg";
import prestigeTerrace02 from "@/assets/prestige-terrace-02.jpg";
import prestigeTerrace03 from "@/assets/prestige-terrace-03.jpg";
import wilsonRender from "@/assets/wilson-render.jpg";

type Point = { title: string; text: string };

export interface Project {
  id: string;
  slug: string;
  name: string;
  location: string;
  type: string;
  shortDescription: string;
  description: string;
  status: string;
  coverImage: string;
  galleryImages: string[];
  additionalDetails: { label: string; value: string }[];
  progress?: string;
  // Case-study sections — each renders only when provided.
  scope?: string;
  headline?: { lead: string; accent: string };
  overview?: string[];
  vision?: string;
  brief?: string[];
  challenges?: Point[];
  approachIntro?: string;
  approach?: Point[];
  highlights?: Point[];
  transformation?: { before: string; after: string; caption: string; beforeLabel?: string; afterLabel?: string }[];
  outcome?: Point[];
  testimonial?: { quote: string; author: string };
  gallery?: { title: string; caption?: string; images: string[] }[];
  // Ongoing projects — dated site progress, oldest first.
  updates?: { date: string; title: string; text?: string; image: string }[];
}

export const PROJECTS: Project[] = [
  {
    id: "arte-homes",
    slug: "arte-homes",
    name: "ARTE Homes",
    location: "Wilson Garden, Bangalore",
    type: "Residential apartments",
    scope: "Architecture · Construction",
    shortDescription: "A tree-lined apartment building where deep balconies, timber accents and a quiet white facade sit comfortably among old palms.",
    headline: { lead: "Modern homes, rooted in an", accent: "old green street." },
    description: "ARTE Homes is a boutique apartment building in Wilson Garden, one of Bangalore's most established residential neighbourhoods. The street is lined with tall coconut palms and broad rain trees, and the building was conceived to keep that canopy rather than compete with it.",
    overview: [
      "The result is a building that reads calmly from the road: a white, carefully proportioned envelope, layered with charcoal balcony frames and warm timber-toned panels. Deep balconies push outward on every level, so each home gains an outdoor room that looks straight into the treetops.",
      "Inside, the apartments were planned for everyday family life — open living and dining areas, well-proportioned bedrooms, and generous windows that bring in soft, filtered daylight through the surrounding green.",
    ],
    vision: "Homes that feel rooted in an established Bangalore neighbourhood — modern in line and finish, yet softened by the trees that were already there.",
    brief: [
      "Contemporary apartments with a clear, uncluttered architectural identity",
      "Keep the mature trees around the site and make them part of daily life",
      "Private outdoor space for every home",
      "Bright, practical interiors suited to families",
      "Durable finishes that stay presentable with minimal upkeep",
    ],
    challenges: [
      { title: "Building among mature trees", text: "Tall palms and spreading canopies sit right along the site edges. The structure, balconies and construction access all had to be planned around them without damaging roots or crowns." },
      { title: "A compact urban plot", text: "Fitting multiple well-planned homes, parking and circulation on an inner-city site meant every square foot of the plan had to work hard." },
      { title: "Light and privacy on a busy street", text: "Homes needed generous daylight and openness, while still feeling private from the road and neighbouring buildings." },
    ],
    approachIntro: "We treated the trees as the starting point of the design, then built a simple, robust architectural language around them.",
    approach: [
      { title: "Design & planning", text: "The massing works around the existing canopy, giving each apartment balconies that look into foliage rather than at neighbouring walls." },
      { title: "3D visualisation", text: "Exterior and interior renders were developed early, so finishes, furniture layouts and lighting could be agreed with confidence before work began on site." },
      { title: "Material selection", text: "A white finish is paired with dark metal railings and timber-toned cladding — a small palette chosen to age well and stay easy to maintain." },
      { title: "Structural planning", text: "Cantilevered balcony slabs were engineered to project cleanly from the frame, giving the facade its depth without extra columns at ground level." },
      { title: "Construction execution", text: "Work on site was sequenced to protect the trees, with careful coordination of access, scaffolding and material storage on a tight street-front plot." },
      { title: "Quality control", text: "Finishes, railings and cladding were checked stage by stage so the completed building closely matches the approved concept." },
    ],
    highlights: [
      { title: "Planned around the trees", text: "Existing palms and rain trees were retained, framing the building and filtering light into every home." },
      { title: "Deep cantilevered balconies", text: "Every level gets a sheltered outdoor room with views into the canopy." },
      { title: "A restrained material palette", text: "White walls, charcoal metalwork and timber-toned panels give warmth and contrast without visual clutter." },
      { title: "Light-filled interiors", text: "Large openings and simple layouts let daylight move deep into the living spaces." },
      { title: "Concept to completion", text: "The built facade closely follows the original 3D design — what the client approved is what was delivered." },
    ],
    transformation: [{ before: wilsonRender, after: wilson02, beforeLabel: "3D concept", afterLabel: "Completed", caption: "The approved concept render beside the completed building — the same proportions, palette and balcony rhythm, now set among the real trees." }],
    outcome: [
      { title: "Trees retained", text: "The mature canopy that defines the street remains, now part of the building's character." },
      { title: "Outdoor space for every home", text: "Each apartment has its own balcony looking into green." },
      { title: "Design delivered as approved", text: "The completed building matches the concept presented at the design stage." },
      { title: "A calm addition to the neighbourhood", text: "A contemporary building that sits comfortably on an established residential street." },
    ],
    status: "Completed",
    coverImage: wilson01,
    galleryImages: [arte01, arte02, wilson01, wilson03, wilson04, arte03, arte04, arte05, wilson05, wilson06, wilson07, wilson08],
    additionalDetails: [],
    gallery: [
      { title: "Exterior", caption: "Balconies, railings and timber panels seen through the surrounding palms and rain trees.", images: [wilson01, wilson02, wilson03, wilson04, wilson05, wilson06, wilson07, wilson08, wilson09, wilson10, wilson11, wilson12, wilson13] },
      { title: "Interior concepts", caption: "Design-stage visuals of the living, dining and bedroom spaces — warm neutrals, timber accents and soft lighting.", images: [arte03, arte04, arte05, arte06, arte07, arte08, arte09, arte10, arte11] },
    ],
  },
  {
    id: "prestige-laughing-waters",
    slug: "prestige-laughing-waters",
    name: "Prestige Laughing Waters",
    location: "Whitefield, Bangalore",
    type: "Private villa",
    scope: "Construction · Interiors",
    shortDescription: "A garden villa of exposed brick, layered terraces and light-washed living spaces, planted from the ground floor to the roof.",
    headline: { lead: "A house that is", accent: "half garden." },
    description: "This private villa within the Prestige Laughing Waters community is built as a series of terraces that step up and out, each edged with planting. From the street the house reads almost as much garden as building — bougainvillea, palms and climbing green spill over brick and concrete at every level.",
    overview: [
      "Inside, the mood shifts to warm and grounded. Exposed brick walls, timber joinery and terracotta-toned floors give the rooms texture and depth, while full-height glazing and courtyard openings draw daylight deep into the plan and keep the garden in view from almost everywhere.",
      "At the top of the house, a pergola-covered terrace walk turns the roof into its own outdoor room — a shaded, planted path for slow mornings and evenings outside.",
    ],
    vision: "A family home that lives outdoors as much as indoors — generous with light and greenery, honest in its materials, and personal in every room.",
    brief: [
      "Strong connection between indoor rooms and outdoor green spaces",
      "Natural, tactile materials rather than glossy, uniform finishes",
      "Bright, airy living areas with good cross-ventilation",
      "A complete, move-in-ready home with interiors handled alongside construction",
      "Usable outdoor space on every level, including the roof",
    ],
    challenges: [
      { title: "Landscape on every level", text: "Planters and terraces on upper floors bring weight, water and roots onto the structure — they needed careful structural and waterproofing detailing." },
      { title: "Daylight without heat", text: "Large openings were essential to the design, but had to be balanced with shade so rooms stay comfortable through Bangalore's warmer months." },
      { title: "Construction and interiors in step", text: "Exposed brick, built-in joinery and lighting leave little room for correction later, so interior decisions had to be resolved before the walls went up." },
    ],
    approachIntro: "We ran construction and interiors as one coordinated project, so materials, services and joinery were planned together from the start.",
    approach: [
      { title: "Design & planning", text: "Living areas are arranged around glazed openings and planted edges so most rooms look onto green and catch cross-ventilation." },
      { title: "Structural & waterproofing", text: "Terraces and planters were detailed for loading, drainage and waterproofing so the gardens can thrive without risk to the rooms below." },
      { title: "Material selection", text: "Exposed brick, timber and textured plaster bring warmth to the interiors and weather gracefully over time." },
      { title: "Interior coordination", text: "Kitchen, wardrobes, joinery and lighting were coordinated with construction so the house was handed over complete and ready to live in." },
      { title: "Craftsmanship", text: "Exposed brickwork and timber staircases were executed as finished surfaces — laid and detailed with the care a visible material demands." },
      { title: "Landscaping & exteriors", text: "Planting, pergolas and terrace walkways were treated as part of the architecture rather than an afterthought." },
    ],
    highlights: [
      { title: "Planted terraces", text: "Greenery cascades from every level, softening the building and shading the rooms behind." },
      { title: "Exposed brick walls", text: "Brick is used as a finished surface inside and out, giving the house warmth and texture." },
      { title: "Full-height glazing", text: "Living spaces open wide to the garden, bringing in daylight and long views." },
      { title: "Rooftop garden walk", text: "A pergola-shaded path turns the roof into a usable, planted outdoor room." },
      { title: "Custom timber joinery", text: "Storage, wardrobes and display units are built in and finished to suit each room." },
      { title: "Open, functional kitchen", text: "A practical layout with built-in appliances and natural light from the garden side." },
    ],
    transformation: [{ before: prestigeExt02, after: prestigeInt01, beforeLabel: "Exterior", afterLabel: "Interior", caption: "The planted terraces outside carry through to the living room, where full-height glazing frames the garden." }],
    outcome: [
      { title: "Delivered move-in ready", text: "Construction and interiors were completed together as one handover." },
      { title: "Greenery on every level", text: "Gardens and terraces extend usable living space from ground to roof." },
      { title: "Bright, ventilated rooms", text: "Large openings and planted edges keep the house light and airy." },
      { title: "A home with a clear identity", text: "Brick, timber and planting give the villa a warm, distinctive character." },
    ],
    status: "Completed",
    coverImage: prestigeExt01,
    galleryImages: [prestigeExt01, prestigeInt01, prestigeExt02, prestigeInt02, prestigeInt05, prestigeTerrace02],
    additionalDetails: [],
    gallery: [
      { title: "Exterior", caption: "Brick, concrete and planting layered across stepped terraces.", images: [prestigeExt01, prestigeExt02, prestigeExt03, prestigeExt04, prestigeExt05, prestigeExt06, prestigeExt07] },
      { title: "Living spaces", caption: "Daylit living and dining rooms, an open kitchen and a sculpted timber staircase.", images: [prestigeInt01, prestigeInt02, prestigeInt03, prestigeInt04, prestigeInt12, prestigeInt05, prestigeInt06, prestigeInt07] },
      { title: "Bedrooms & details", caption: "Brick feature walls, built-in joinery and quiet corridors.", images: [prestigeInt08, prestigeInt09, prestigeInt10, prestigeInt11] },
      { title: "Terrace garden", caption: "The pergola-covered rooftop walk, planted end to end.", images: [prestigeTerrace01, prestigeTerrace02, prestigeTerrace03] },
    ],
  },
  {
    id: "kalyan-nagar",
    slug: "kalyan-nagar",
    name: "Kalyan Nagar",
    location: "Kalyan Nagar, Bangalore",
    type: "Residential & commercial",
    scope: "Architecture · Construction",
    shortDescription: "A corner building pairing upper-floor homes with a street-level storefront, wrapped in greenery and crisp angled balconies.",
    headline: { lead: "Commercial at street level,", accent: "home above it." },
    description: "Set on a busy corner in Kalyan Nagar, this mixed-use building combines a retail frontage at ground level with homes on the floors above. It had to do two jobs at once: draw attention from the street, and give the people who live upstairs a calm, private place to come back to.",
    overview: [
      "The facade does this with a strong, layered profile. Angled, cantilevered balconies step out from the white envelope, creating deep shadows by day and shading the rooms behind. At ground level, a vertical garden, red-brick boundary walls and planted entrances soften the street edge and give the storefront a distinctive, green identity.",
      "After dark, warm facade lighting picks out the balconies and planting, turning the building into a quiet landmark on the corner.",
    ],
    vision: "A building that works hard on a commercial corner while still feeling like a calm place to come home to.",
    brief: [
      "A visible, attractive storefront facing the street",
      "Separate, private access for residents",
      "Homes with balconies, daylight and ventilation",
      "A distinctive facade that stands out without being loud",
      "Green, welcoming edges at ground level",
    ],
    challenges: [
      { title: "Two uses, one building", text: "Retail and residential needs differ — visibility and footfall below, privacy and quiet above. Both had to work without compromising each other." },
      { title: "A prominent corner site", text: "With two street faces, the building is seen from many angles, so every elevation needed to be resolved, not just the front." },
      { title: "Heat and glare", text: "West- and street-facing glass needed shading so upper-floor homes stay comfortable." },
    ],
    approachIntro: "We separated the building's two lives at ground level, then used the facade itself to give the homes above shade, privacy and character.",
    approach: [
      { title: "Design & planning", text: "Commercial and residential access are separated at ground level, giving shoppers and residents their own clear entrances." },
      { title: "Facade design", text: "Angled balcony slabs create a rhythm of light and shadow and give the corner a recognisable profile from both streets." },
      { title: "Structural planning", text: "The cantilevers and deep overhangs were engineered to project cleanly while keeping the ground floor open for retail." },
      { title: "Landscaping & exteriors", text: "A green wall, potted planting and red-brick compound walls soften the street edge and frame each entrance." },
      { title: "Lighting", text: "Exterior lighting was planned with the facade, so the building reads as clearly at night as it does by day." },
    ],
    highlights: [
      { title: "Retail with homes above", text: "A street-facing storefront and private residences share one well-organised building." },
      { title: "Angled cantilevered balconies", text: "A layered facade that shades the homes and gives the corner its identity." },
      { title: "Vertical garden", text: "A living green wall at the storefront brings softness to a busy street." },
      { title: "Brick entrances", text: "Red-brick walls and planted thresholds give each entrance warmth and a sense of arrival." },
      { title: "Architectural night lighting", text: "Warm uplighting highlights the balconies and planting after dark." },
    ],
    transformation: [{ before: kalyan01, after: kalyan13, beforeLabel: "By day", afterLabel: "By night", caption: "The same corner by day and by night — balconies and planting picked out by warm facade lighting." }],
    outcome: [
      { title: "A recognisable corner building", text: "A distinctive facade that stands out on both street faces." },
      { title: "Clear separation of uses", text: "Retail and residential entrances work independently." },
      { title: "Shaded, private homes", text: "Deep balconies give residents outdoor space and protection from sun and street." },
      { title: "A greener streetscape", text: "Planting and brick soften the ground floor for passers-by and residents alike." },
    ],
    status: "Completed",
    coverImage: kalyan01,
    galleryImages: [kalyan01, kalyan08, kalyan10, kalyan02, kalyan06, kalyan13],
    additionalDetails: [],
    gallery: [
      { title: "Exterior", caption: "The angled balconies and white envelope seen from both street faces.", images: [kalyan01, kalyan02, kalyan03, kalyan04, kalyan08, kalyan09, kalyan10, kalyan11, kalyan12] },
      { title: "Entrances & details", caption: "Brick walls, planting and the vertical garden at street level.", images: [kalyan05, kalyan06, kalyan07] },
      { title: "After dark", caption: "Warm facade lighting turns the corner into a landmark at night.", images: [kalyan13, kalyan14, kalyan15, kalyan16, kalyan17] },
    ],
  },
  {
    id: "radha-mohan-residence",
    slug: "radha-mohan-residence",
    name: "Radha Mohan Residence",
    location: "Bangalore",
    type: "Private residence",
    shortDescription: "A contemporary family home of stone-grey volumes, framed glazing and a planted roof terrace.",
    headline: { lead: "Clean lines, framed light,", accent: "a garden on top." },
    description: "Radha Mohan Residence is a contemporary independent home designed for a growing family. The design composes the house as a set of interlocking volumes — textured grey stone, crisp white plaster and slim dark frames — that give the street elevation depth and a quiet sense of permanence.",
    overview: [
      "Tall, framed windows bring daylight into the main rooms while sheer drapes keep them private from the street. Balconies are recessed into the facade, creating shaded outdoor corners on each level.",
      "The roof is planned as a planted terrace, giving the family a green retreat above the street and softening the building's skyline.",
    ],
    vision: "A modern family home with a strong, timeless street presence — private, full of daylight, and with green space to enjoy every day.",
    brief: [
      "A contemporary elevation that won't date quickly",
      "Bright rooms with privacy from the street",
      "Outdoor spaces on multiple levels",
      "A usable rooftop garden",
      "Secure, well-planned parking and entrance",
    ],
    approachIntro: "The design was developed through detailed 3D visualisation, so the family could see and refine the house before construction.",
    approach: [
      { title: "Space planning", text: "Rooms are stacked and arranged so living spaces face the light, with bedrooms set back for privacy." },
      { title: "3D visualisation", text: "Multiple elevation studies were rendered so materials, window sizes and planting could be decided visually." },
      { title: "Material selection", text: "Stone-textured cladding, white plaster and dark metal frames create contrast with a small, durable palette." },
      { title: "Landscaping", text: "Planting at the entrance and on the roof terrace ties the house to the trees around it." },
    ],
    highlights: [
      { title: "Layered volumes", text: "Grey stone and white plaster blocks give the elevation depth and proportion." },
      { title: "Framed glazing", text: "Tall windows set in dark frames bring in light and define the facade." },
      { title: "Recessed balconies", text: "Shaded outdoor corners on each level, protected from sun and street." },
      { title: "Rooftop garden", text: "A planted terrace that crowns the house and gives the family green space above the street." },
    ],
    status: "Project details to be confirmed",
    coverImage: mohan01,
    galleryImages: [mohan01, mohan02, mohan03, mohan04, mohan05, mohan06],
    additionalDetails: [],
    gallery: [{ title: "Design visuals", caption: "Elevation studies showing the street front, materials and roof garden.", images: [mohan01, mohan02, mohan03, mohan04, mohan05, mohan06] }],
  },
  {
    id: "shrinivas-murthy-residence",
    slug: "shrinivas-murthy-residence",
    name: "Shrinivas Murthy Residence",
    location: "Bangalore",
    type: "Private residence",
    shortDescription: "A multi-level family home pairing white plaster with warm timber cladding and a welcoming, planted entrance.",
    headline: { lead: "Warm timber, white walls,", accent: "a confident front." },
    description: "Shrinivas Murthy Residence is an independent family home designed with a strong, symmetrical street presence. The elevation combines clean white plaster with vertical bands of warm timber cladding, giving the house a balanced, welcoming front.",
    overview: [
      "Balconies with glass and metal railings open from the upper floors, framed by lit soffits that bring the facade to life in the evening. At ground level, a full-width gate, stone-finished base and potted planting give the entrance a sense of arrival.",
    ],
    vision: "A family home that feels warm and welcoming from the street, with a clear, balanced design and practical, well-lit living spaces.",
    brief: [
      "A balanced, contemporary elevation",
      "Warm materials to soften a modern design",
      "Balconies on upper floors",
      "Secure parking and a planted entrance",
    ],
    approach: [
      { title: "Elevation design", text: "White plaster and timber cladding are arranged in clear vertical bands for a calm, balanced facade." },
      { title: "3D visualisation", text: "The street front was rendered with lighting and planting so the finished look could be agreed early." },
      { title: "Lighting", text: "Soffit lighting at the balconies was planned as part of the facade, not added later." },
    ],
    highlights: [
      { title: "Timber-clad bays", text: "Warm vertical cladding contrasts with white plaster and adds texture." },
      { title: "Lit balcony soffits", text: "Concealed lighting gives the facade a warm glow in the evening." },
      { title: "Planted entrance", text: "Greenery and a stone-finished base make the approach welcoming." },
    ],
    status: "Project details to be confirmed",
    coverImage: shri01,
    galleryImages: [shri01],
    additionalDetails: [],
    gallery: [{ title: "Design visuals", caption: "The street elevation with lighting and planting.", images: [shri01] }],
  },
];

export const ONGOING_PROJECTS: Project[] = [
  {
    id: "jaya-mahal",
    slug: "jaya-mahal",
    name: "Jaya Mahal",
    location: "Jayamahal, Bangalore",
    type: "Residential building",
    shortDescription: "A multi-level home with basement and mezzanine, now moving from structure into finishing.",
    headline: { lead: "Built in the open,", accent: "stage by stage." },
    description: "Jaya Mahal is a multi-storey residence under construction in Jayamahal, one of Bangalore's quiet, tree-lined older neighbourhoods. The building includes a basement, a mezzanine and several upper floors rising to a finished roof.",
    overview: [
      "The structural frame is now complete and work has moved inside — masonry, plastering, electrical and plumbing services are underway, and individual rooms are beginning to take shape.",
      "We share dated site photographs here so the client and anyone interested can follow progress at every stage, from the first slabs to the final finishes.",
    ],
    approachIntro: "Each stage is planned, inspected and documented before the next begins.",
    approach: [
      { title: "Structural execution", text: "Basement retaining walls, the mezzanine and each floor slab were cast in sequence, with reinforcement checked before every pour." },
      { title: "Site supervision", text: "Regular inspections track workmanship, alignment and safety on site." },
      { title: "Services planning", text: "Electrical points and conduits are marked and chased before plastering, so walls are finished only once." },
      { title: "Progress reporting", text: "Dated photographs record every milestone and are shared with the client as work moves forward." },
    ],
    status: "Under construction",
    progress: "Structure complete · Plastering and services in progress",
    coverImage: jayamahal05,
    galleryImages: [jayamahal01, jayamahal02, jayamahal03, jayamahal04, jayamahal05, jayamahal06, jayamahal07],
    additionalDetails: [],
    updates: [
      { date: "Oct 2025", title: "Mezzanine slab", text: "Reinforcement fixed and the mezzanine slab cast over the basement.", image: jayamahal01 },
      { date: "Nov 2025", title: "Second-floor slab", text: "Upper floors rising, with brickwork beginning on the levels below.", image: jayamahal02 },
      { date: "Dec 2025", title: "Third-floor formwork", text: "Shuttering and props in place for the third-floor slab.", image: jayamahal03 },
      { date: "Feb 2026", title: "Third-floor slab", text: "Third-floor slab completed and cured.", image: jayamahal04 },
      { date: "Apr 2026", title: "Final roof", text: "The roof slab is cast — the structural frame is complete.", image: jayamahal05 },
      { date: "May 2026", title: "Internal plastering", text: "Walls plastered after electrical chasing, as rooms begin to take shape.", image: jayamahal06 },
      { date: "May 2026", title: "Site inspection", text: "Stage inspection of finished work before the next phase.", image: jayamahal07 },
    ],
  },
];

export const getProject = (slug: string) => [...PROJECTS, ...ONGOING_PROJECTS].find((project) => project.slug === slug);
