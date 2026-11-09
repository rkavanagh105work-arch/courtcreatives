// One page per place named in the homepage FAQ "Where are you based and what
// areas do you cover?". Each entry is written separately rather than generated
// from a template: near-identical town pages are treated as doorway pages by
// Google. Drive times are approximate from Belfast. "venues" lists only places
// Courtney has actually filmed at; add to them as she supplies more.
export type Area = {
  slug: string;
  name: string;
  /** Preposition + name, for headings: "in Belfast", "on the Causeway Coast". */
  place: string;
  county: string;
  title: string;
  description: string;
  summary: string;
  intro: string[];
  moments: { heading: string; text: string }[];
  /** url is the venue's own website, not a directory or Google listing. */
  venues?: { name: string; location: string; url: string }[];
  travel: string;
};

export const areas: Area[] = [
  {
    slug: "belfast",
    name: "Belfast",
    place: "in Belfast",
    county: "County Antrim & County Down",
    title:
      "Wedding Content Creator Belfast | TikTok & Reels | CourtCreatives",
    description:
      "Belfast-based wedding content creator capturing candid TikToks, Instagram Reels and stills from city-centre hotels to the Belfast Hills. Delivered within 24–48 hours.",
    summary:
      "My home city: city-centre hotels, historic churches and venues out towards the Belfast Hills.",
    intro: [
      "Belfast is home, so a Belfast wedding is the one I can get to quickest. Whether you're getting ready in a city-centre hotel, marrying in one of the city's historic churches or celebrating somewhere out towards the Belfast Hills, I'll be there capturing the candid, behind-the-scenes moments that your photographer and videographer aren't looking for.",
      "Everything is shot vertically on iPhone, ready for TikTok, Instagram Reels and Stories, and your content lands with you within 24 to 48 hours.",
    ],
    moments: [
      {
        heading: "Getting ready with a city view",
        text: "Hotel-room mornings in the city centre make for brilliant content: mirror shots, the dress going on, the first glass of fizz and the bridal party's reactions, all captured without getting under your photographer's feet.",
      },
      {
        heading: "The bits in between",
        text: "City weddings often mean a short drive or walk between the ceremony and the reception. The wedding car, the confetti on the steps and your first walk through the streets as a married couple are some of the most shareable clips of the whole day.",
      },
      {
        heading: "Evening in the city",
        text: "As the light drops, the city makes a great backdrop. I bring portable lighting for evening receptions, so the first dance and the party look as good on your phone as they felt in the room.",
      },
    ],
    travel:
      "I'm based in Belfast, so there's no travel fee for weddings anywhere in the city.",
  },
  {
    slug: "lisburn",
    name: "Lisburn",
    place: "in Lisburn",
    county: "County Antrim",
    title:
      "Wedding Content Creator Lisburn & Lagan Valley | CourtCreatives",
    description:
      "Wedding content creator covering Lisburn, Hillsborough and the Lagan Valley. Candid TikToks, Reels and stills from your day, delivered within 24–48 hours.",
    summary:
      "Around 20 minutes from Belfast, covering the city, Hillsborough and the Lagan Valley villages.",
    intro: [
      "Lisburn is around 20 minutes down the road from my base in Belfast, which makes it one of the easiest places for me to cover. Between the city itself, the villages of the Lagan Valley and nearby Hillsborough, there's no shortage of beautiful places to get married.",
      "I capture the candid, behind-the-scenes side of your day on iPhone, shot vertically for TikTok and Instagram, and deliver it all within 24 to 48 hours.",
    ],
    moments: [
      {
        heading: "Country house mornings",
        text: "Plenty of Lagan Valley weddings start in a country house or the family home. Those slower mornings are perfect for relaxed getting-ready content: the details, the laughs and the last-minute nerves.",
      },
      {
        heading: "Gardens and grounds",
        text: "If your venue has grounds worth showing off, I'll make the most of them. I'll get the walk-ins, the wander for couple portraits and your guests spilling out onto the lawn for the drinks reception.",
      },
      {
        heading: "Speeches and the dance floor",
        text: "The reactions during the speeches and the chaos of the dance floor are what people actually rewatch. I'll be in the middle of it with my phone, capturing it the way your guests see it.",
      },
    ],
    travel:
      "Lisburn is around 20 minutes from Belfast, and travel is included as standard.",
  },
  {
    slug: "bangor",
    name: "Bangor",
    place: "in Bangor",
    county: "County Down",
    title:
      "Wedding Content Creator Bangor & North Down | CourtCreatives",
    description:
      "Seaside wedding content in Bangor, North Down and the Ards Peninsula. Candid TikToks, Instagram Reels and stills, delivered within 24–48 hours.",
    summary:
      "Around half an hour from Belfast: the marina, the North Down coast and the Ards Peninsula.",
    intro: [
      "Bangor and the North Down coast are only around half an hour from Belfast, and a seaside wedding here gives you something city venues can't: the marina, the sea and a lot of sky. Whether you're marrying in Bangor itself, along the coast towards Helen's Bay and Crawfordsburn, or further down the Ards Peninsula, I'll capture your day as it happens.",
      "Everything is filmed vertically on iPhone for TikTok, Reels and Stories, and it's with you within 24 to 48 hours.",
    ],
    moments: [
      {
        heading: "Sea air and coastal light",
        text: "Coastal weddings come with big skies and changeable weather. A veil caught in the breeze or the evening light over Belfast Lough can end up being the clip everyone remembers, so I'll keep an eye on the light and grab those moments when they appear.",
      },
      {
        heading: "The marina and the seafront",
        text: "A short walk along the seafront or around the marina is often all it takes to get couple content that feels completely different to the rest of your day.",
      },
      {
        heading: "Smaller celebrations on the peninsula",
        text: "Venues further down the Ards Peninsula tend to be more rural and intimate. Smaller weddings like these are a great fit for raw, personal content that feels like it was filmed by a friend.",
      },
    ],
    travel:
      "Bangor is around half an hour from Belfast, and travel to Bangor and North Down is included as standard.",
  },
  {
    slug: "newry",
    name: "Newry",
    place: "in Newry",
    county: "County Down & County Armagh",
    title:
      "Wedding Content Creator Newry, Mournes & South Armagh | CourtCreatives",
    description:
      "Wedding content creator covering Newry, the Mourne Mountains, Carlingford Lough and Slieve Gullion. Candid TikToks and Reels delivered within 24–48 hours.",
    summary:
      "Around 45 minutes from Belfast, with the Mournes, Carlingford Lough and Slieve Gullion nearby.",
    intro: [
      "Newry sits on the border between County Down and County Armagh, about 45 minutes from Belfast, with the Mourne Mountains, Carlingford Lough and Slieve Gullion all close by. It's some of the most dramatic scenery in Northern Ireland, and it makes for unforgettable wedding content.",
      "Being so close to the border, Newry weddings often bring families together from both sides of it. Your content lands within 24 to 48 hours, so guests heading home in either direction can watch it back before the weekend's over.",
    ],
    moments: [
      {
        heading: "Mountain and lough backdrops",
        text: "With the Mournes on one side and Carlingford Lough on the other, a quick stop on the way to your reception can give you some of the most striking clips of the day.",
      },
      {
        heading: "The arrivals",
        text: "The wedding car pulling up, the bridal party piling out and the first glimpse of each other are over in seconds. I'll be ready for them, filming from angles your photographer won't be using.",
      },
      {
        heading: "Two families, one party",
        text: "When two families meet on the dance floor, the best moments are rarely planned. I'll catch the reunions, the singalongs and the grandparents showing everyone how it's done.",
      },
    ],
    travel:
      "Newry is around 45 minutes from Belfast, and travel is included as standard. If your venue is just across the border in County Louth, a travel fee applies, as it does for all Republic of Ireland weddings.",
  },
  {
    slug: "ballymena",
    name: "Ballymena",
    place: "in Ballymena",
    county: "County Antrim",
    title:
      "Wedding Content Creator Ballymena & Mid-Antrim | CourtCreatives",
    description:
      "Wedding content creator covering Ballymena and Mid-Antrim, including Galgorm, the Leighinmohr House Hotel and Kilmore Country House. Candid TikToks and Reels delivered within 24–48 hours.",
    summary:
      "Around 40 minutes up the M2, with Slemish and the Glens of Antrim close by.",
    intro: [
      "Ballymena is around 40 minutes up the M2 from Belfast, in the heart of Mid-Antrim. With Slemish on the skyline and the Glens of Antrim a short drive away, the countryside around the town is a lovely setting for a wedding.",
      "I shoot everything vertically on iPhone, ready for TikTok, Instagram Reels and Stories, and your gallery is with you within 24 to 48 hours.",
    ],
    moments: [
      {
        heading: "Everything on one site",
        text: "When getting ready, the ceremony and the reception all happen at the same venue, I can spend the whole day capturing instead of travelling between locations, which means more content for you.",
      },
      {
        heading: "Glens and Slemish views",
        text: "If you fancy a short detour, the open views towards Slemish and the Glens make a dramatic backdrop for a few minutes of couple content.",
      },
      {
        heading: "Mornings at the family home",
        text: "Getting ready at home has its own charm: the dog getting in the way, the kitchen full of people, someone seeing the dress for the first time. Those are some of the most genuine moments of the day.",
      },
    ],
    venues: [
      {
        name: "Galgorm",
        location: "Ballymena",
        url: "https://www.galgorm.com/wedding-venue-northern-ireland.html",
      },
      {
        name: "The Leighinmohr House Hotel",
        location: "Ballymena",
        url: "https://leighinmohrhotel.com/",
      },
      {
        name: "Kilmore Country House",
        location: "Glenariff, Glens of Antrim",
        url: "https://kilmorecountryhouse.com/",
      },
    ],
    travel:
      "Ballymena is around 40 minutes from Belfast, and travel is included as standard.",
  },
  {
    slug: "armagh",
    name: "Armagh",
    place: "in Armagh",
    county: "County Armagh",
    title:
      "Wedding Content Creator Armagh | TikTok & Reels | CourtCreatives",
    description:
      "Wedding content creator covering Armagh city and the Orchard County. Candid TikToks, Instagram Reels and stills from your day, delivered within 24–48 hours.",
    summary:
      "Around 50 minutes from Belfast: the cathedral city, the Mall and the Orchard County.",
    intro: [
      "Armagh is Ireland's ecclesiastical capital, with two St Patrick's Cathedrals looking across the city at each other and the tree-lined Mall and Georgian streets in between. It's around 50 minutes from Belfast, and it's a beautiful place to get married.",
      "Beyond the city, County Armagh is the Orchard County. If you haven't set a date yet, a spring wedding with the apple blossom out is something special.",
    ],
    moments: [
      {
        heading: "Church ceremonies",
        text: "Some churches have rules about filming during the service, and I'll always follow them. Around the ceremony I'll capture the arrivals, the nerves outside and the moment you come back out of the doors as a married couple.",
      },
      {
        heading: "The Mall and the city streets",
        text: "Armagh's Georgian streets and the Mall are made for a short stroll between the ceremony and the reception, which is easy, natural couple content that doesn't feel posed.",
      },
      {
        heading: "Blossom season",
        text: "The orchards around the county usually blossom around May. If your wedding falls then, a few minutes among the trees makes for some of the prettiest content of the year.",
      },
    ],
    travel:
      "Armagh is around 50 minutes from Belfast, and travel is included as standard.",
  },
  {
    slug: "enniskillen",
    name: "Enniskillen",
    place: "in Enniskillen",
    county: "County Fermanagh",
    title:
      "Wedding Content Creator Enniskillen & Fermanagh Lakes | CourtCreatives",
    description:
      "Lakeside wedding content in Enniskillen and the Fermanagh lakelands. Candid TikToks, Instagram Reels and stills, delivered within 24–48 hours.",
    summary:
      "The Fermanagh lakelands: island venues, lakeside light and weekend-long celebrations.",
    intro: [
      "Enniskillen is the island town at the heart of the Fermanagh lakelands, set between Upper and Lower Lough Erne. Lakeside venues, islands and castles make it one of the most romantic corners of Northern Ireland to get married in.",
      "A lot of guests make a whole weekend of a Fermanagh wedding, and that relaxed, holiday feeling comes through in the content. I capture it all on iPhone for TikTok and Reels and deliver it within 24 to 48 hours.",
    ],
    moments: [
      {
        heading: "Arriving by water",
        text: "If your day includes a boat, whether you're arriving across the water or heading out between the ceremony and the reception, it's a moment made for vertical video.",
      },
      {
        heading: "Lakeside golden hour",
        text: "With water on every side, the evening light around Lough Erne is beautiful. I'll steal you away for a few minutes at golden hour to catch it.",
      },
      {
        heading: "Guests on holiday",
        text: "Guests who've travelled for the weekend tend to let their hair down. Drinks by the water and a packed dance floor late into the night make for great, unfiltered content.",
      },
    ],
    travel:
      "Enniskillen is around an hour and three-quarters from Belfast, one of my longer journeys, so a small travel fee may apply. I'll confirm it in your quote.",
  },
  {
    slug: "omagh",
    name: "Omagh",
    place: "in Omagh",
    county: "County Tyrone",
    title:
      "Wedding Content Creator Omagh & Tyrone | TikTok & Reels | CourtCreatives",
    description:
      "Wedding content creator covering Omagh, the Sperrins and County Tyrone, including the Old Rectory Killyman. Candid TikToks, Reels and stills, delivered within 24–48 hours.",
    summary:
      "Tyrone's county town, with the Sperrins and Gortin Glen a short drive away.",
    intro: [
      "Omagh is the county town of Tyrone, around an hour and a quarter from Belfast, with the Sperrin Mountains to the north and rolling countryside all around. Whether you're planning a big family celebration or something smaller and more relaxed, I'll capture it the way your guests experience it.",
      "Everything is shot vertically on iPhone, ready for TikTok, Instagram Reels and Stories, and it's with you within 24 to 48 hours.",
    ],
    moments: [
      {
        heading: "Sperrins scenery",
        text: "Gortin Glen and the Sperrins are a short drive from town if you'd like a few minutes of moody, open landscape between the ceremony and the reception.",
      },
      {
        heading: "Countryside character",
        text: "Country venues with stone buildings, long driveways and open fields give a lot of character to work with, and they're great for natural, unposed content.",
      },
      {
        heading: "Big family moments",
        text: "The aunties on the dance floor, the cousins' reunion and the father-of-the-bride speech are the moments that make your content feel like your wedding.",
      },
    ],
    venues: [
      {
        name: "The Old Rectory Killyman",
        location: "Killyman, near Dungannon",
        url: "https://www.oldrectorykillyman.co.uk/",
      },
    ],
    travel:
      "Omagh is around an hour and a quarter from Belfast, one of my longer journeys, so a small travel fee may apply. I'll confirm it in your quote.",
  },
  {
    slug: "derry-londonderry",
    name: "Derry~Londonderry",
    place: "in Derry~Londonderry",
    county: "County Londonderry",
    title:
      "Wedding Content Creator Derry~Londonderry | TikTok & Reels | CourtCreatives",
    description:
      "Wedding content creator covering Derry~Londonderry, from the city walls to Beech Hill Country House. Candid TikToks, Instagram Reels and stills, delivered within 24–48 hours.",
    summary:
      "The walled city on the Foyle, a short hop from Donegal.",
    intro: [
      "Derry~Londonderry is one of the best-preserved walled cities in Europe, with the Peace Bridge across the Foyle, the Guildhall and a city centre full of history. It's around an hour and a half from Belfast and makes a striking setting for a wedding.",
      "It's also a short hop from Donegal, so if your celebration spans both sides of the border, I can cover that too.",
    ],
    moments: [
      {
        heading: "The walls and the Peace Bridge",
        text: "A walk along the city walls or across the Peace Bridge gives you couple content with a real sense of place: unmistakably Derry, and nothing like anywhere else.",
      },
      {
        heading: "Guildhall Square and the city centre",
        text: "The Guildhall and the streets around it make a great backdrop for the in-between moments: the walk to the car, the confetti and the first few minutes as a married couple.",
      },
      {
        heading: "Evening on the Foyle",
        text: "Once the city lights come on along the river, the evening content looks completely different. My portable lighting keeps the first dance and the party looking great on your phone.",
      },
    ],
    venues: [
      {
        name: "Beech Hill Country House",
        location: "Derry~Londonderry",
        url: "https://beech-hill.com/",
      },
    ],
    travel:
      "Derry~Londonderry is around an hour and a half from Belfast, one of my longer journeys, so a small travel fee may apply. A travel fee applies for venues over the border in Donegal.",
  },
  {
    slug: "causeway-coast",
    name: "Causeway Coast",
    place: "on the Causeway Coast",
    county: "County Antrim & County Londonderry",
    title:
      "Wedding Content Creator Causeway Coast | Portrush & Portstewart | CourtCreatives",
    description:
      "Wedding content creator covering the Causeway Coast: Portrush, Portstewart, Bushmills and Ballycastle. Candid TikToks and Reels delivered within 24–48 hours.",
    summary:
      "Portrush, Portstewart, Bushmills and Ballycastle: cliffs, beaches and Atlantic sunsets.",
    intro: [
      "The Causeway Coast is Northern Ireland at its most dramatic: cliffs, sandy beaches, Dunluce Castle and the Giant's Causeway itself. Portrush, Portstewart, Bushmills and Ballycastle all sit along this stretch of coast, around an hour and a quarter from Belfast.",
      "It's a part of the world that looks incredible on camera, and I capture it vertically on iPhone for TikTok and Reels, with everything delivered within 24 to 48 hours.",
    ],
    moments: [
      {
        heading: "Beaches and cliffs",
        text: "With golden beaches and clifftop views right on the doorstep, a few minutes on the sand or along the coast path can give you the most breathtaking clips of the day.",
      },
      {
        heading: "Embracing the weather",
        text: "North coast weather changes fast, and raw content is all about embracing it. A veil whipping in the wind or the two of you laughing under an umbrella is often more you than a perfectly still shot.",
      },
      {
        heading: "Sunset over the Atlantic",
        text: "On a clear summer evening the sun sets late over the sea. If we get one, I'll grab you for a few minutes to make the most of it.",
      },
    ],
    travel:
      "The Causeway Coast is around an hour and a quarter from Belfast, one of my longer journeys, so a small travel fee may apply. I'll confirm it in your quote.",
  },
];

export function getArea(slug: string) {
  return areas.find((area) => area.slug === slug);
}
