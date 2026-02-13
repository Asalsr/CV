import { Artwork, ArtworkCategory } from '../types/artwork';

// Cloudinary CDN with automatic format & quality optimization
const CL = 'https://res.cloudinary.com/dvtsn17rp/image/upload/f_auto,q_auto';
// Fallback for images not yet uploaded to Cloudinary
const JSD = 'https://cdn.jsdelivr.net/gh/Asalsr/CV@master/frontend/public';

export const artworks: Artwork[] = [
  {
    id: 1,
    title: 'HATCH',
    category: 'Photography',
    year: '2021',
    thumbnail: `${CL}/2_1_piow2j.webp`,
    images: [
      `${CL}/2_1_piow2j.webp`,
      `${CL}/2_2_zefw46.webp`,
      `${CL}/2_4_kpt1jk.webp`,
      `${CL}/2_5_nyk5yc.webp`,
      `${CL}/2_6_e7tana.webp`,
      `${CL}/2_7_h2oqly.webp`,
      `${CL}/2_8_zu3xbs.webp`,
      `${CL}/2_10_lk4mqj.webp`,
      `${CL}/2_11_xp1qxz.webp`,
      `${CL}/2_12_jyrcn8.webp`,
    ],
    type: 'image',
    description: `**HATCH - Photography Series**

A photographic exploration of emergence and transformation. This series captures moments of breaking through barriers, both literal and metaphorical.

**Concept**
The "hatching" metaphor represents new beginnings, vulnerability, and the courage required to emerge into something new. Each image in the series explores different aspects of this transformative moment.

**Technical Approach**
Shot using natural lighting to emphasize organic textures and forms. Post-processing focused on maintaining authenticity while enhancing the emotional impact of each frame.`,
    relatedProjects: [6, 5, 13],
  },
  {
    id: 2,
    title: 'War',
    category: 'Painting',
    year: '2022',
    thumbnail: `${CL}/1_hr3wos.webp`,
    images: [
      `${CL}/1_hr3wos.webp`,
      `${CL}/MATTOCK-3_v0naq9.webp`,
      `${CL}/MATTOCK-5_yh1i2p.webp`,
      `${CL}/pittura_2-1_pxtf5a.webp`,
      `${CL}/pittura_2-2_c7yfg5.webp`,
      `${CL}/pittura_2-3_xlbtum.webp`,
      `${CL}/Sarcofago_Grande_Ludovisi_twnk1u.webp`,
      `${CL}/IMG_3791_uh2skl.webp`,
      `${CL}/z_ltwie1.webp`,
    ],
    type: 'image',
    description: `**War - Illustration Series**

A visual meditation on conflict, drawing from classical art history and contemporary events to explore the enduring nature of human warfare.

**Inspiration**
References to historical battle scenes, including the famous Ludovisi Battle Sarcophagus, are reinterpreted through a modern lens. The series questions whether humanity has truly evolved beyond its violent instincts.

**Technique**
Mixed media illustrations combining traditional drawing with digital enhancement. The raw, expressive style intentionally contrasts with the refined aesthetics of classical war art.`,
    relatedProjects: [11, 4],
  },
  {
    id: 3,
    title: 'Paintings Collection',
    category: 'Painting',
    year: '2015-2018',
    thumbnail: `${CL}/a1_owk3pu.webp`,
    images: [
      `${CL}/a1_owk3pu.webp`,
      `${CL}/a2_odvqgt.webp`,
      `${CL}/a4_tzjwqh.webp`,
      `${CL}/a6_ph6unf.webp`,
      `${CL}/a8_brxuje.webp`,
      `${CL}/a9_sibsyz.webp`,
      `${CL}/IMG_7605_hxc9tf.webp`,
      `${CL}/IMG_7620_l5wib4.webp`,
      `${CL}/IMG_1024_ldtagd.webp`,
      `${CL}/IMG_1034_iddr3u.webp`,
      `${CL}/IMG_1039_ohi12e.webp`,
      `${CL}/IMG_1049_eawieh.webp`,
      `${CL}/IMG_1050_zcjpeb.webp`,
      `${CL}/IMG_1054_qnwphu.webp`,
      `${CL}/IMG_1057_cgjfa0.webp`,
      `${CL}/IMG_1062_tbrvek.webp`,
      `${CL}/IMG_1065_i72axq.webp`,
      `${CL}/IMG_1068_kmtzyg.webp`,
      `${CL}/IMG_1077_y5korc.webp`,
    ],
    type: 'image',
    description: `**Paintings Collection (2015-2018)**

A comprehensive collection of paintings created during the formative years of artistic development, spanning various styles and subjects.

**Evolution**
This collection documents the artistic journey from early explorations to more refined techniques. Themes range from abstract expressionism to figurative work, reflecting diverse influences and experimentation.

**Medium**
Primarily acrylic on canvas, with some works incorporating mixed media elements. The collection showcases the development of a personal visual language over three years of intensive practice.`,
    relatedProjects: [7, 10],
  },
  {
    id: 4,
    title: 'Liberi di Crescere',
    category: 'Workshop/Illustration',
    year: '2023',
    thumbnail: `${CL}/7_tyf2du.webp`,
    images: [
      `${CL}/7_tyf2du.webp`,
      `${CL}/copy_yzjzeb.webp`,
      `${CL}/photo_1_2026-02-04_17-08-54_mmpxko.webp`,
      `${CL}/photo_2_2026-02-04_17-08-54_dxi3tq.webp`,
      `${CL}/photo_3_2026-02-04_17-08-54_cgafu9.webp`,
      `${CL}/photo_4_2026-02-04_17-08-54_f1fv14.webp`,
      `${CL}/photo_5_2026-02-04_17-08-54_rclcsh.webp`,
      `${CL}/photo_6_2026-02-04_17-08-54_o4hdfv.webp`,
      `${CL}/photo_7_2026-02-04_17-08-54_uraetu.webp`,
      `${CL}/photo_8_2026-02-04_17-08-54_cnhguj.webp`,
      `${CL}/photo_9_2026-02-04_17-08-54_ic2hhw.webp`,
      `${CL}/photo_10_2026-02-04_17-08-54_uv65kv.webp`,
      `${CL}/photo_11_2026-02-04_17-08-54_wxv8wz.webp`,
      `${CL}/photo_12_2026-02-04_17-08-54_piyeyn.webp`,
      `${CL}/photo_13_2026-02-04_17-08-54_ymaknj.webp`,
      `${CL}/photo_14_2026-02-04_17-08-54_pw8f6n.webp`,
      `${CL}/photo_15_2026-02-04_17-08-54_xyblfl.webp`,
      `${CL}/photo_16_2026-02-04_17-08-54_gdsjin.webp`,
      `${CL}/photo_19_2026-02-04_17-08-54_xpekm1.webp`,
      `${CL}/photo_20_2026-02-04_17-08-54_uo4phd.webp`,
      `${CL}/photo_21_2026-02-04_17-08-54_li06qn.webp`,
    ],
    type: 'image',
    description: `**Liberi di Crescere - Free to Grow**

A collaborative project with Gruppo Abele and Associazione Liberi di Crescere in Turin.

**About the Project**
"Siamo tutti Liberi di Crescere" (We are all Free to Grow) is a national campaign promoting children's rights and healthy development. The project focuses on creating awareness about the importance of nurturing environments for children's growth.

**My Contribution**
Illustrative design and visual identity work for events and workshops organized by the association. The designs aim to communicate the campaign's message of freedom, growth, and children's wellbeing through accessible and engaging visual language.

**The Organization**
Gruppo Abele is a renowned Italian social organization founded by Don Luigi Ciotti, dedicated to fighting marginalization and promoting social justice. The Liberi di Crescere initiative specifically addresses children's rights and development.`,
    externalLink: 'https://www.gruppoabele.org/it-schede-1673-siamo_tutti_liberi_di_crescere',
    relatedProjects: [2, 11],
  },
  {
    id: 5,
    title: 'Commercial Photography',
    category: 'Photography',
    year: '2023',
    thumbnail: 'https://mir-s3-cdn-cf.behance.net/projects/404/f3e026162745975.Y3JvcCwzODQwLDMwMDMsMCwxMzc4.jpg',
    images: ['https://mir-s3-cdn-cf.behance.net/projects/404/f3e026162745975.Y3JvcCwzODQwLDMwMDMsMCwxMzc4.jpg'],
    type: 'image',
    description: `**Commercial Photography**

Professional product and commercial photography work for various clients.

**Services**
- Product photography for e-commerce
- Brand imagery and lifestyle shots
- Corporate event documentation

**Approach**
Clean, professional aesthetic with attention to lighting, composition, and post-processing that enhances without overwhelming the subject. Each project is tailored to the client's brand identity and marketing needs.`,
    relatedProjects: [1, 6, 8],
  },
  {
    id: 6,
    title: 'Woman Life Liberty',
    category: 'Photography',
    year: '2022-2023',
    thumbnail: `${CL}/1_r7ays8.webp`,
    images: [
      `${CL}/1_r7ays8.webp`,
      `${CL}/443A4611_shddzh.webp`,
      `${CL}/443A4643_bdn0zf.webp`,
      `${CL}/443A4682_dixh5s.webp`,
      `${CL}/443A4686_mxiqxd.webp`,
      `${CL}/443A4690_mz34gr.webp`,
      `${CL}/443A4695_o8dwl7.webp`,
      `${CL}/443A4718_awiqfu.webp`,
      `${CL}/443A4744_sip5oj.webp`,
      `${CL}/443A4839_oil54m.webp`,
      `${CL}/443A4842_mvxnh5.webp`,
      `${CL}/443A4889_s4rqus.webp`,
      `${CL}/443A4967_ivm8x4.webp`,
      `${CL}/443A4970_sfd64d.webp`,
      `${CL}/443A5110_py6kff.webp`,
      `${CL}/443A5130_enle3z.webp`,
      `${CL}/443A5194_hmfqim.webp`,
      `${CL}/443A5198_ekzezg.webp`,
      `${CL}/IMG_2921_zmpilp.webp`,
      `${CL}/IMG_E3046_ya8xqs.webp`,
    ],
    type: 'image',
    description: `**Woman Life Liberty - Documentary Photography**

Photographic documentation of the solidarity movement in Turin, Italy, following the tragic death of Mahsa Amini in Iran.

**Context**
In September 2022, Mahsa Amini died in custody of Iran's morality police, sparking worldwide protests under the slogan "Woman, Life, Freedom" (Zan, Zendegi, Azadi). This series captures the Turin community's response to these events.

**The Movement**
These images document peaceful demonstrations, vigils, and community gatherings that expressed solidarity with Iranian women fighting for their fundamental rights.

**Significance**
Beyond documentation, this project represents a personal connection to the struggle for human rights and the power of collective action across borders.`,
    relatedProjects: [1, 13],
  },
  {
    id: 7,
    title: 'Plastic Blue',
    category: 'Painting',
    year: '2021-2022',
    thumbnail: `${CL}/final-prova-27_a3bbrn.webp`,
    images: [
      `${CL}/final-prova-27_a3bbrn.webp`,
      `${CL}/20220128_152247_t5bkem.webp`,
      `${CL}/20220128_152336_e7b1ba.webp`,
      `${CL}/20220128_152420_lccdtd.webp`,
      `${CL}/20220128_152500_yzdjwv.webp`,
      `${CL}/saeedeh-sarrmadi-4_afmvfj.webp`,
    ],
    type: 'image',
    description: `**Academy of Fine Arts of Rome | Thesis Project**
Supervisor: Prof. Sergio Sarra

**Core Philosophy**
The title references Chaos Theory and the Butterfly Effect: "Small variations in initial conditions produce large variations in the long-term behavior of the system." Our small daily choices about plastic have catastrophic long-term consequences.

**The Problem of Scale**
Humans cannot truly visualize environmental statistics: 300 million tons of plastic produced annually (half for single-use), 91% never recycled, 273 million tons ending up in oceans and nature each year. The Great Pacific Garbage Patch spans 1.6 million km² — twice the size of Texas.

**The Artworks**
Five paintings named after the five oceans, each containing a garbage island: The Atlantic, The Pacific, The Indian, The Arctic, and The Southern. Acrylic painting on canvas with real plastic elements — single-use items personally collected from the streets of Rome.

**Origin Story**
The project began on Hormoz Island (southern Iran) — a remote island where, while camping under unpolluted stars, masses of garbage were discovered on the beach. Annual cleanup campaigns revealed ever-increasing waste, sparking this investigation into plastic's global impact.

**Artists Studied**
The thesis examines Vik Muniz (Pictures of Garbage at Jardim Gramacho landfill), Jason Dodge (Cut a Door in the Wolf at MACRO Rome), and Ashley Bickerton (Flotsam Series with ocean debris from Bali).

**UN Sustainable Development Goals**
Aligned with Goals 3, 6, 12, 13, 14, and 15 — addressing health, clean water, responsible consumption, climate action, and life below water and on land.`,
    relatedProjects: [3, 10],
  },
  {
    id: 8,
    title: 'Craftswomenship',
    category: 'Graphic Design',
    year: '2022',
    thumbnail: `${CL}/1-logo_onwzki.webp`,
    images: [
      `${CL}/1-logo_onwzki.webp`,
      `${CL}/business-card-2_cgkq49.webp`,
      `${CL}/INSTAGRAM_nzhep2.webp`,
    ],
    type: 'image',
    description: `**Craftswomenship - Brand Identity Project**

Complete visual identity development for a craftswoman's brand, celebrating handmade artistry and female entrepreneurship.

**Deliverables**
- Logo design and brand mark
- Business card design
- Social media templates
- Brand guidelines

**Concept**
The brand identity emphasizes authenticity, craftsmanship, and the personal touch that distinguishes handmade products. The visual language balances modern aesthetics with artisanal warmth.`,
    relatedProjects: [9, 5],
  },
  {
    id: 9,
    title: 'Podcast Cover Design',
    category: 'Graphic Design',
    year: '2020-2021',
    thumbnail: `${JSD}/art/logo-design/pale-1.webp`,
    images: [
      `${JSD}/art/logo-design/pale-1.webp`,
      `${JSD}/art/logo-design/pale-2.webp`,
      `${JSD}/art/logo-design/pale-3.webp`,
      `${JSD}/art/logo-design/pale-4.webp`,
      `${JSD}/art/logo-design/pale-5.webp`,
      `${JSD}/art/logo-design/logo.webp`,
      `${CL}/1_xate9z.webp`,
      `${CL}/2_i2tkuh.webp`,
      `${CL}/Untitled-2_ydjsbv.webp`,
      `${CL}/blueblue2_zfbgbc.webp`,
      `${CL}/matrix_m8fioq.webp`,
      `${CL}/tars_film1_svkevy.webp`,
    ],
    type: 'image',
    description: `**Pale Blue Dot Podcast - Cover Design**

Cover artwork design for the Pale Blue Dot Podcast, a Persian-language podcast exploring science, philosophy, and culture.

**The Podcast**
Named after Carl Sagan's famous reflection on our planet, "Pale Blue Dot" discusses scientific concepts, philosophical questions, and cultural topics for Persian-speaking audiences worldwide.

**Design Approach**
The cover designs capture the essence of curiosity and cosmic wonder that defines the podcast. Each iteration balances visual intrigue with clear communication of the show's intellectual character.

**Deliverables**
- Primary podcast cover artwork
- Episode-specific variations
- Social media adaptations
- Promotional graphics`,
    relatedProjects: [12, 8],
  },
  {
    id: 10,
    title: 'Mural Painting',
    category: 'Mural Art',
    year: '2017',
    thumbnail: `${CL}/mural_uohos2.webp`,
    images: [
      `${CL}/mural_uohos2.webp`,
      `${CL}/mural-2_uoxwli.webp`,
      `${CL}/mural-3_dzfz5i.webp`,
      `${CL}/443A0014_bl5nxv.webp`,
      `${CL}/443A0021_y0hifv.webp`,
      `${CL}/443A0041_p0prh7.webp`,
      `${CL}/443A0046_ujcnf9.webp`,
      `${CL}/443A0051_zovoxj.webp`,
      `${CL}/443A0064_ybuhzx.webp`,
      `${CL}/443A9998_sh6awl.webp`,
      `${CL}/IMG_20161208_121523_ft7hs9.webp`,
      `${CL}/IMG_20170110_233038_zgsukv.webp`,
      `${CL}/IMG_20170110_233132_kj9ljf.webp`,
      `${CL}/IMG_20170111_103631_hrmnkz.webp`,
      `${CL}/IMG_20170111_103635_ckyajk.webp`,
      `${CL}/IMG_20170111_103649_rumapu.webp`,
      `${CL}/IMG_20170111_103706_wecfmz.webp`,
      `${CL}/Untitled-1_vvdz5q.webp`,
    ],
    type: 'image',
    description: `**Mural Painting Project**

Large-scale mural artwork spanning four walls, each measuring two meters, from initial design concept to final execution.

**Scope**
- Four interconnected murals
- Total coverage: 8 linear meters
- Complete project management from design to implementation

**Process**
1. Initial concept sketches and client consultation
2. Detailed design development
3. Surface preparation
4. Execution using exterior-grade paints
5. Protective finishing

**Impact**
The murals transformed a plain space into a vibrant environment, demonstrating the power of public art to enhance community spaces.`,
    relatedProjects: [3, 7],
  },
  {
    id: 11,
    title: 'Where Heart Goes',
    category: 'Illustration',
    year: '2022',
    thumbnail: 'https://mir-s3-cdn-cf.behance.net/projects/404/6b6d90158301219.Y3JvcCw4MDgsNjMyLDAsMA.png',
    images: [
      'https://mir-s3-cdn-cf.behance.net/projects/404/6b6d90158301219.Y3JvcCw4MDgsNjMyLDAsMA.png',
    ],
    type: 'image',
    description: `**Where Heart Goes - Illustration Series**

An illustrated exploration of emotional landscapes, inspired by Brené Brown's "Atlas of the Heart."

**Concept**
This series visualizes the complex geography of human emotions, mapping feelings as territories to be explored rather than problems to be solved.

**Style**
Soft, evocative illustrations that blend figurative elements with abstract emotional representations. The color palette shifts to reflect different emotional states.

**Inspiration**
Drawing from both psychological research and personal introspection, these illustrations aim to validate the full spectrum of human emotional experience.`,
    relatedProjects: [2, 4],
  },
  {
    id: 12,
    title: 'Poster and Cover Design',
    category: 'Graphic Design',
    year: '2017-2022',
    thumbnail: 'https://mir-s3-cdn-cf.behance.net/projects/404/d2f3a1103571959.Y3JvcCwxMDgwLDg0NCwwLDA.jpg',
    images: [
      'https://mir-s3-cdn-cf.behance.net/projects/404/d2f3a1103571959.Y3JvcCwxMDgwLDg0NCwwLDA.jpg',
    ],
    type: 'image',
    description: `**Poster and Cover Design Collection**

A curated selection of poster and book cover designs spanning five years of creative work.

**Featured Works**
- **Hormoz Island Event Poster**: Promotional design for a social event on Hormoz Island, southern Iran
- **Neuroscience Book Cover**: Cover design for an academic publication
- **Various Event Posters**: Promotional materials for cultural events

**Approach**
Each design balances visual impact with clear communication. Typography, imagery, and composition work together to create memorable pieces that serve their intended purpose.`,
    relatedProjects: [9, 8],
  },
  {
    id: 13,
    title: 'Mid Night Sun 2020',
    category: 'Photography',
    year: '2020',
    thumbnail: `${CL}/d032be244106067.698f8a87ef292_okmift.jpg`,
    images: [
      `${CL}/d032be244106067.698f8a87ef292_okmift.jpg`,
      `${CL}/1_lkrcfi.jpg`,
      `${CL}/2_qaagcp.jpg`,
      `${CL}/2d240f244106067.698f8a88020a9_mrunj4.jpg`,
      `${CL}/3e3b34244106067.698f8a87f27f8_wpkh1o.jpg`,
      `${CL}/5c0ded244106067.698f8a8805420_jlnvtl.jpg`,
      `${CL}/5ccf95244106067.698f8a88136fd_qseytt.jpg`,
      `${CL}/5ef634244106067.698f8a881170f_bxzywx.jpg`,
      `${CL}/9ca9f8244106067.698f8a8819289_mkgkfx.jpg`,
      `${CL}/10bfd6244106067.698f8a880bf23_uufczk.jpg`,
      `${CL}/45f4c8244106067.698f8a880726b_yxiyxp.jpg`,
      `${CL}/46cddc244106067.698f8a880a787_e9kvye.jpg`,
      `${CL}/978813244106067.698f8a880ed06_f2jeq9.jpg`,
      `${CL}/af327f244106067.698f8a8817153_ne9etd.jpg`,
      `${CL}/ca130d244106067.698f8a881544b_kbh2qu.jpg`,
      `${CL}/d65fc8244106067.698f8a881b5bd_qndemr.jpg`,
      `${CL}/e4818d244106067.698f8a880d648_jmhbuz.jpg`,
      `${CL}/ec1d63244106067.698f8a8800339_ojjcss.jpg`,
      `${CL}/efdc2f244106067.698f8a87f0f4d_qbmu9a.jpg`,
      `${CL}/f1bb53244106067.698f8a880388c_zewkb9.jpg`,
      `${CL}/f3bfe6244106067.698f8a8808fba_edikuu.jpg`,
    ],
    type: 'image',
    description: `**Mid Night Sun 2020 - Photography Series**

We are all going through a period of difficulty. In this particular time, like everyone, I had a different experience of life. For some people like me, it was even harder—because not only was I in quarantine, but I was also very far from my family and friends.

But it was also a very interesting and powerful experience. In my absolute solitude, I began to see things differently.

When I had the idea for these photos, we were in difficult moments—everyone at home, and many of us were alone. The window of my room was the only real connection I had with the world. From that window, I could watch people passing by, children playing, people keeping their distance from one another, and the new way of life.

To pass those days, I always tried to keep myself busy. During the day, the room was bright and the lights were always on. But one afternoon, when I was really down with all the lights off, I saw something else. My window was giving me something I hadn't seen until that moment. Every afternoon, the shadows, the sunlight, and the images of the world entered my room. My window painted my walls with different shapes. Every afternoon, when I turned off the lights, my room became my darkroom—with all the images that were different each time. And I began to photograph.`,
    relatedProjects: [1, 6],
  },
  {
    id: 14,
    title: 'Just Run',
    category: 'Video',
    year: '2020',
    thumbnail: 'https://img.youtube.com/vi/JFYqrltjOVQ/hqdefault.jpg',
    images: [],
    type: 'video',
    videoId: 'JFYqrltjOVQ',
    description: `**Just Run - Short Film**

A video project exploring movement, freedom, and the meditative quality of running.

**Concept**
The film captures the simple act of running as a form of liberation—from routine, from constraints, from the weight of daily life. The footage emphasizes rhythm, breath, and the relationship between body and environment.

**Production**
Shot on location with minimal equipment to maintain authenticity and spontaneity. The editing rhythm mirrors the pace of running, creating an immersive viewing experience.`,
    relatedProjects: [15],
  },
  {
    id: 15,
    title: 'The Savior of the Persian',
    category: 'Video',
    year: '2021',
    thumbnail: 'https://img.youtube.com/vi/UTlbjf041f8/hqdefault.jpg',
    images: [],
    type: 'video',
    videoId: 'UTlbjf041f8',
    description: `**The Savior of the Persian - Video Project**

A narrative video exploring cultural identity and heritage preservation.

**Theme**
The project examines the role of language, tradition, and cultural memory in shaping identity. It questions what it means to "save" a culture and who bears that responsibility.

**Production**
Combining documentary-style footage with artistic interpretation, the video weaves together personal narratives and broader cultural commentary.

**Significance**
This project represents a personal exploration of cultural roots and the ongoing dialogue between tradition and modernity.`,
    relatedProjects: [14],
  },
  {
    id: 16,
    title: 'Women Life Freedom Workshop',
    category: 'Workshop/Illustration',
    year: '2022-2023',
    thumbnail: `${CL}/443A4382_ryiovr.webp`,
    images: [
      `${CL}/443A4382_ryiovr.webp`,
      `${CL}/443A4389_cu1dbq.webp`,
      `${CL}/443A4417_sf036n.webp`,
      `${CL}/443A4418_x8brii.webp`,
      `${CL}/443A4420_huk6me.webp`,
      `${CL}/443A4489_ss0qtk.webp`,
      `${CL}/443A4553_ipofaa.webp`,
    ],
    type: 'image',
    description: `**Women Life Freedom - Workshop & Illustration**

Workshop and illustration project created in solidarity with the Iranian women's movement following the tragic death of Mahsa Amini.

**Context**
Part of the global response to the "Woman, Life, Freedom" movement that emerged in 2022, this project combines educational workshops with illustrative work to spread awareness and solidarity.

**The Workshop**
Interactive sessions exploring themes of freedom, identity, and resistance through creative expression. Participants engaged with the movement's powerful symbolism and created their own artistic responses.

**Significance**
This project bridges art and activism, using creative workshops as a platform for dialogue, education, and solidarity with those fighting for fundamental rights.`,
    relatedProjects: [6, 4],
  },
];

export const categories: (ArtworkCategory | 'All')[] = [
  'All',
  'Photography',
  'Painting',
  'Workshop/Illustration',
  'Illustration',
  'Graphic Design',
  'Mural Art',
  'Video',
];

export function getRelatedProjects(artwork: Artwork, allArtworks: Artwork[]): Artwork[] {
  // First try explicit related projects
  if (artwork.relatedProjects && artwork.relatedProjects.length > 0) {
    return artwork.relatedProjects
      .map(id => allArtworks.find(a => a.id === id))
      .filter((a): a is Artwork => a !== undefined)
      .slice(0, 3);
  }

  // Fallback to same category
  return allArtworks
    .filter(a => a.id !== artwork.id && a.category === artwork.category)
    .slice(0, 3);
}

export function getYearStats(allArtworks: Artwork[]): Map<string, number> {
  const yearMap = new Map<string, number>();
  allArtworks.forEach(artwork => {
    const year = artwork.year.split('-')[0];
    yearMap.set(year, (yearMap.get(year) || 0) + 1);
  });
  return yearMap;
}

export function getUniqueCategories(allArtworks: Artwork[]): Set<ArtworkCategory> {
  return new Set(allArtworks.map(a => a.category));
}
