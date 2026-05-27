import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  const password = await bcrypt.hash(
    process.env.ADMIN_PASSWORD ?? "admin123",
    12
  );

  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL ?? "admin@growthcatalyst.com.np" },
    update: { password },
    create: {
      email: process.env.ADMIN_EMAIL ?? "admin@growthcatalyst.com.np",
      password,
      name: "Admin",
    },
  });

  const categoryNames = [
    "Web Development",
    "Mobile Development",
    "AI & Machine Learning",
    "Business & Strategy",
    "IT Sector Nepal",
    "Infrastructure",
    "Case Studies",
    "Process",
  ];
  const categories = await Promise.all(
    categoryNames.map((name) =>
      prisma.blogCategory.upsert({
        where: { slug: slugify(name) },
        update: {},
        create: { name, slug: slugify(name) },
      })
    )
  );
  const catBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));

  const settings: Record<string, string> = {
    hero_eyebrow: "Software & IT Consulting · Nepal",
    hero_headline: "We catalyze growth through disciplined process.",
    hero_subheadline:
      "Growth Catalyst delivers software & IT consulting from eCommerce and FinTech to ERP and AI with a rigorous, process-first methodology that accelerates your business across Nepal.",
    hero_cta_primary: "Start a Project",
    hero_cta_secondary: "Our Philosophy",
    cta_headline: "Let's build something exceptional together",
    cta_subheadline:
      "Whether you're an enterprise or a growing SME, our process-driven approach delivers results that scale.",
    about_headline: "Growth is not accidental, it is engineered.",
    about_intro:
      "Growth Catalyst Pvt. Ltd. is a software and IT consulting firm headquartered in Imadol, Lalitpur. We serve corporate enterprises and growing SMEs across Nepal with solutions spanning eCommerce, IoT, FinTech, accounting systems, ERP, CMS, and bespoke business platforms.\n\nOur name reflects our mission: to be the catalyst that accelerates and enhances your business growth. We do not chase trends we follow disciplined processes that deliver predictable, measurable outcomes.\n\nEvery engagement is structured around transparency, iterative delivery, and long-term partnership.",
    about_mission:
      "Accelerate and enhance client business growth through process excellence.",
    about_vision:
      "Become Nepal's most trusted process-oriented technology partner.",
    about_values: "Discipline · Transparency · Quality · Partnership",
    services_headline: "Technology solutions engineered for growth",
    services_intro:
      "From startups to enterprise corporations, we deliver web, mobile, AI, and custom business solutions with our proven six-step process.",
    products_headline: "Solutions built for real business needs",
    products_intro:
      "Our product portfolio spans industry-specific platforms managed and updated through our admin panel.",
    team_headline: "The people behind the process",
    team_intro:
      "Our core team brings together engineering excellence, design discipline, and business acumen.",
    careers_headline: "Join Growth Catalyst",
    careers_intro:
      "We're always looking for disciplined engineers, designers, and consultants who believe in process-driven excellence.",
    footer_about:
      "Process-oriented software & IT consulting accelerating business growth across Nepal and beyond.",
    seo_title: "Growth Catalyst | Software & IT Consulting in Nepal",
    seo_description:
      "Web, mobile, AI, and enterprise software consulting from Imadol, Lalitpur. Trusted by enterprises and SMEs across Nepal.",
    seo_keywords:
      "software company Nepal, IT consulting Nepal, web development Nepal, mobile app development Nepal, AI Nepal, ERP Nepal",
  };

  await Promise.all(
    Object.entries(settings).map(([key, value]) =>
      prisma.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
    )
  );

  const clientNames = [
    "FinCorp Nepal",
    "RetailPro",
    "TechVentures",
    "AgriLink",
    "HealthPlus",
    "EduStream",
    "LogiTrack",
    "PayNepal",
  ];
  for (let i = 0; i < clientNames.length; i++) {
    await prisma.client.upsert({
      where: { id: `seed-client-${i}` },
      update: { name: clientNames[i], order: i, active: true },
      create: { id: `seed-client-${i}`, name: clientNames[i], order: i, active: true },
    });
  }

  const teamMembers = [
    {
      id: "seed-team-1",
      name: "Manoj Kumar Mahato",
      role: "-",
      bio: "Guiding every engagement with process rigor and client focus.",
      imageUrl: "/team/manoj.png",
      linkedin: "https://www.linkedin.com/in/manojmahato/",
      order: 1,
    },
    {
      id: "seed-team-2",
      name: "Sailesh Kasaju",
      role: "-",
      bio: "Building robust, scalable solutions across web, mobile, and AI.",
      imageUrl: "/team/sailesh.png",
      linkedin: "https://www.linkedin.com/in/saileshkasaju/",
      order: 2,
    },
    {
      id: "seed-team-3",
      name: "Jivan Shrestha",
      role: "-",
      bio: "Crafting minimalist, user-centered experiences.",
      imageUrl: "/team/jivan.png",
      linkedin: "https://www.linkedin.com/in/jivanshr/",
      order: 3,
    },
  ];
  for (const m of teamMembers) {
    await prisma.teamMember.upsert({
      where: { id: m.id },
      update: m,
      create: { ...m, published: true },
    });
  }

  await prisma.teamMember.updateMany({
    where: { id: { notIn: teamMembers.map((m) => m.id) } },
    data: { published: false },
  });

  const products = [
    {
      id: "seed-prod-1",
      name: "Catalyst ERP",
      slug: "catalyst-erp",
      description:
        "End-to-end enterprise resource planning suite tailored for Nepali businesses inventory, accounting, HR, payroll, and reporting in one unified platform.",
      features: ["Multi-branch support", "VAT-ready accounting", "Nepali calendar (BS)", "Role-based access", "Real-time dashboards"],
      order: 1,
    },
    {
      id: "seed-prod-2",
      name: "Catalyst Commerce",
      slug: "catalyst-commerce",
      description:
        "Headless eCommerce platform with integrations for eSewa, Khalti, IME Pay, and Nepali logistics partners. Built for retail, fashion, and B2B distributors.",
      features: ["eSewa & Khalti payments", "Multi-warehouse inventory", "Bulk pricing rules", "SEO-optimized storefront"],
      order: 2,
    },
    {
      id: "seed-prod-3",
      name: "Catalyst FinTrack",
      slug: "catalyst-fintrack",
      description:
        "Modern accounting and bookkeeping software for SMEs, with bank reconciliation, GST/VAT compliance, and instant financial reporting.",
      features: ["Double-entry ledger", "Auto-reconciliation", "Custom invoice templates", "Tax filing support"],
      order: 3,
    },
    {
      id: "seed-prod-4",
      name: "Catalyst IoT Gateway",
      slug: "catalyst-iot-gateway",
      description:
        "Industrial IoT platform for hydropower, agriculture, and manufacturing real-time sensor monitoring, alerts, and predictive maintenance.",
      features: ["MQTT & Modbus support", "Edge analytics", "Mobile alerts", "Historical data store"],
      order: 4,
    },
    {
      id: "seed-prod-5",
      name: "CatalystAI",
      slug: "catalyst-ai",
      description:
        "Production-ready AI platform for Nepali businesses LLM-powered assistants, document intelligence, forecasting, and workflow automation integrated with your existing systems.",
      features: ["LLM chat & assistants", "Document OCR & extraction", "Demand forecasting", "OpenAI & self-hosted models"],
      order: 5,
    },
    {
      id: "seed-prod-6",
      name: "CatalystLogistics",
      slug: "catalyst-logistics",
      description:
        "End-to-end logistics and fleet management for distributors and couriers route optimization, live tracking, COD reconciliation, and integrations with Nepali delivery partners.",
      features: ["Live GPS tracking", "Route optimization", "COD & settlement", "Courier API integrations"],
      order: 6,
    },
  ];
  for (const p of products) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: p,
      create: { ...p, published: true },
    });
  }

  const blogs = [
    {
      title: "Why Process Matters in Software Development",
      slug: "why-process-matters",
      categorySlug: slugify("Process"),
      excerpt:
        "Discover how a process-oriented approach eliminates risk and accelerates delivery in software projects across Nepal's IT sector.",
      content:
        "At Growth Catalyst, we believe great software is the result of disciplined process not luck. Our six-step methodology ensures every project delivers measurable business value.\n\n## The Cost of Ad-Hoc Development\n\nMany Nepali businesses still rely on freelance teams without structured processes. The result: missed deadlines, runaway budgets, and software that cannot scale. A process-first firm changes that dynamic by making expectations explicit from day one.\n\n## Six Steps to Predictable Outcomes\n\nDiscovery, planning, iterative development, QA, deployment, and growth optimization each phase has clear deliverables and acceptance criteria. This is how enterprise teams in Kathmandu, Lalitpur, and Pokhara deliver software that actually ships.\n\n## What This Means for Your Business\n\nWhen process is the product, transparency becomes the default. You see progress weekly. Risks surface early. And the final solution reflects exactly what your business needs to grow.",
    },
    {
      title: "Building Modern Web Applications for Nepali Businesses in 2026",
      slug: "modern-web-applications-nepal-2026",
      categorySlug: slugify("Web Development"),
      excerpt:
        "A practical guide to modern web stacks Next.js, TypeScript, and PostgreSQL and why they are right for businesses operating in Nepal.",
      content:
        "Web technology has matured dramatically. For Nepali enterprises looking to digitize operations or launch new customer-facing products, choosing the right stack is the most important early decision.\n\n## Why Next.js Wins in 2026\n\nServer components, edge rendering, and built-in optimization make Next.js the default for performance-critical apps. With most internet users in Nepal browsing on mid-range Android devices, render speed is everything.\n\n## TypeScript: Safety at Scale\n\nWhen your engineering team turns over common in Nepal's growing IT job market strong typing protects your codebase. New developers can onboard in days, not months.\n\n## PostgreSQL for Business-Grade Data\n\nFrom financial transactions to inventory ledgers, PostgreSQL provides the relational integrity, JSON flexibility, and full-text search that Nepali businesses need without exotic infrastructure.\n\n## The Practical Stack for Nepal\n\nFor most engagements at Growth Catalyst, we deploy Next.js + PostgreSQL + Prisma + Tailwind. This stack runs efficiently on local VPS providers like CloudHimalaya, Mercantile, and on global platforms like Vercel and Railway.",
    },
    {
      title: "Mobile App Development in Nepal: Native vs Cross-Platform",
      slug: "mobile-app-development-nepal-native-vs-cross-platform",
      categorySlug: slugify("Mobile Development"),
      excerpt:
        "Should you build a Flutter app, React Native app, or go fully native? A decision framework for businesses launching mobile products in Nepal.",
      content:
        "Mobile is non-negotiable in Nepal. With over 27 million mobile internet subscriptions and Android dominating the market, every consumer-facing business needs a mobile presence.\n\n## The Three Choices\n\nNative (Kotlin/Swift), React Native, or Flutter. Each has trade-offs that affect cost, performance, and team availability locally.\n\n## When to Go Native\n\nGo native when you depend heavily on hardware features biometrics for FinTech apps, GPS-intensive logistics tools, or AR/VR experiences. Native gives you full performance and the cleanest user experience.\n\n## When Flutter Makes Sense\n\nFlutter shines for content-rich apps with custom UI. Government service apps, eCommerce apps, and internal enterprise apps all benefit from Flutter's pixel-perfect rendering and fast iteration.\n\n## When React Native Wins\n\nIf your team already knows React, React Native is the obvious choice. You get 80% code reuse with web, and your engineers can switch contexts easily.\n\n## Our Recommendation\n\nFor most Nepali businesses launching their first mobile product, Flutter delivers the best balance of cost, time-to-market, and quality. Growth Catalyst has shipped multiple Flutter apps to the Play Store and App Store with measurable user growth.",
    },
    {
      title: "AI Adoption for Small Businesses in Nepal: A Practical Roadmap",
      slug: "ai-adoption-small-business-nepal",
      categorySlug: slugify("AI & Machine Learning"),
      excerpt:
        "How small and mid-size businesses in Nepal can deploy AI today without expensive GPUs or massive datasets to automate operations.",
      content:
        "AI is no longer the exclusive domain of Silicon Valley. With APIs from OpenAI, Anthropic, and self-hosted open models, even small businesses in Nepal can deploy meaningful AI within weeks.\n\n## Start With Three Use Cases\n\nFirst, customer support automation using large language models. Second, document understanding for invoices, contracts, and receipts. Third, lightweight forecasting for inventory and demand planning.\n\n## What You Actually Need\n\nYou do not need a data science team. You need clean data, clear objectives, and an engineering partner who understands both AI capabilities and business operations.\n\n## Common Pitfalls\n\nDo not start with chatbots on your homepage. Start internally automate one tedious back-office process and measure the time saved. That ROI funds the next iteration.\n\n## Where Growth Catalyst Helps\n\nWe build production-grade AI integrations using OpenAI, Anthropic, and self-hosted Llama models. Whether you process loan applications, classify support tickets, or extract data from PDFs in Nepali we can ship a working pilot in four to six weeks.",
    },
    {
      title: "The State of Nepal's IT Sector: Opportunities and Challenges in 2026",
      slug: "state-of-nepal-it-sector-2026",
      categorySlug: slugify("IT Sector Nepal"),
      excerpt:
        "An honest assessment of where Nepal's IT industry stands in 2026 talent, infrastructure, exports, and the gaps that still need closing.",
      content:
        "Nepal's IT sector has grown from a cottage industry to a meaningful contributor to GDP. But honest reflection is needed if we want sustained growth.\n\n## The Good News\n\nIT exports have crossed significant milestones. Nepali engineers are working remotely for global companies, earning hard currency, and bringing modern engineering practices back home. The talent pipeline through universities like Tribhuvan, KU, and Pulchowk continues to strengthen.\n\n## The Real Challenges\n\nElectricity reliability remains a barrier for serious data infrastructure. Internet redundancy is improving but still concentrated in Kathmandu valley. Foreign payment friction makes small businesses hesitant to scale digitally.\n\n## The Talent Squeeze\n\nMid-level engineers are increasingly choosing remote roles for US and Australian companies. Local firms must compete on culture, growth, and meaningful work not just salary.\n\n## What Process-Driven Firms Bring\n\nProcess discipline is what turns Nepal's strong individual talent into globally competitive teams. At Growth Catalyst, we invest heavily in engineering culture, documentation, and reviews because that is how local talent becomes world-class.",
    },
    {
      title: "Choosing IT Infrastructure in Nepal: Cloud, On-Premise, or Hybrid?",
      slug: "it-infrastructure-nepal-cloud-onpremise-hybrid",
      categorySlug: slugify("Infrastructure"),
      excerpt:
        "A guide for IT managers in Nepal weighing global cloud (AWS, GCP), local providers (CloudHimalaya, Worldlink), and hybrid setups.",
      content:
        "Where you host your software in Nepal is a strategic decision affecting compliance, latency, cost, and reliability. Here is how to think about it.\n\n## Local Cloud Providers\n\nProviders like CloudHimalaya, Mercantile, and Worldlink Data Center offer real value for businesses with Nepali-only customer bases. Latency is excellent for users in Kathmandu, and data stays within Nepal's borders useful for regulated industries like banking.\n\n## Global Cloud (AWS, GCP, Azure)\n\nFor SaaS products targeting international users or businesses needing global scale, AWS Mumbai or Singapore regions are the obvious choice. You get massive feature richness, automatic scaling, and certifications that enterprise buyers expect.\n\n## The Hybrid Reality\n\nMost ambitious Nepali businesses end up hybrid. Customer-facing apps live on global cloud for reliability. Sensitive databases and legacy ERPs stay on local providers or on-premise.\n\n## What We Recommend\n\nStart with a global cloud provider unless you have explicit data residency requirements. The operational simplicity and feature depth pay back the slightly higher cost within months. Growth Catalyst manages production workloads on AWS, GCP, and CloudHimalaya we can architect what fits your business.",
    },
    {
      title: "FinTech in Nepal: Case Study on Building a Compliant Payment Platform",
      slug: "fintech-nepal-case-study-payment-platform",
      categorySlug: slugify("Case Studies"),
      excerpt:
        "Lessons learned from architecting a NRB-compliant payment platform KYC, AML, settlement flows, and engineering trade-offs.",
      content:
        "FinTech in Nepal is regulated, complex, and incredibly rewarding. Here is what we learned shipping a payment processing platform that handled crore-scale transactions monthly.\n\n## Compliance Comes First\n\nNRB licensing requirements, KYC documentation, AML monitoring none of this is optional. The architecture must be designed around audit trails, immutable logs, and segregation of duties from day one.\n\n## The Settlement Layer\n\nReal-time interbank settlement requires deep integration with the connectIPS or NCHL switch. Mocking this in development is non-trivial; we built a complete sandbox to simulate edge cases.\n\n## Security Engineering\n\nField-level encryption for PII. Hardware security modules for cryptographic operations. PCI DSS scope minimization through tokenization. Every decision must consider the threat model.\n\n## What Worked\n\nA strict event-sourced architecture made audit and reconciliation trivial. Every state change is a recorded event disputes get resolved by replaying history rather than detective work.\n\n## What We Would Do Differently\n\nWe over-invested in microservices initially. A modular monolith would have shipped six months earlier with the same compliance posture. For most Nepali FinTech startups, monolithic architecture is the right starting point.",
    },
    {
      title: "Digital Transformation for Nepali Enterprises: A 12-Month Roadmap",
      slug: "digital-transformation-nepal-enterprise-roadmap",
      categorySlug: slugify("Business & Strategy"),
      excerpt:
        "Concrete 12-month playbook for established Nepali businesses moving from paper-based operations to integrated digital systems.",
      content:
        "Digital transformation is not a one-off software project. For traditional Nepali enterprises trading houses, manufacturers, hospitality groups it is a year-long organizational change effort.\n\n## Months 1-3: Discovery and Foundation\n\nMap every existing process. Identify the highest-value automation candidates usually accounting, inventory, and customer relationships. Build a clear baseline of how things work today.\n\n## Months 4-6: Core System Rollout\n\nDeploy ERP, accounting, and CRM as the foundation. Migrate data carefully. Train staff. Resist the temptation to add features get the core working perfectly first.\n\n## Months 7-9: Customer-Facing Digitization\n\nOnce internal operations are stable, build the customer-facing layer. eCommerce, customer portals, mobile apps. This is where revenue growth begins to compound.\n\n## Months 10-12: Analytics and Optimization\n\nWith digital data flowing, build dashboards, alerts, and lightweight AI for forecasting. This is the phase where leadership starts making data-driven decisions daily.\n\n## The Real Secret\n\nThe technology is the easy part. The hard part is change management getting your team to actually use the new systems. Growth Catalyst engagements include change-management workshops because we have learned this the hard way.",
    },
    {
      title: "Why eCommerce Businesses in Nepal Should Invest in Custom Software",
      slug: "ecommerce-nepal-custom-software-investment",
      categorySlug: slugify("Business & Strategy"),
      excerpt:
        "When off-the-shelf platforms like Shopify or WooCommerce stop scaling and how custom software unlocks competitive advantage in Nepal's eCommerce market.",
      content:
        "Nepal's eCommerce market is maturing fast. Daraz, SastoDeal, and countless niche players have proven consumer demand. But as your business grows past initial validation, off-the-shelf platforms start to limit you.\n\n## When to Stay With Shopify or WooCommerce\n\nIf you are doing under five crore in annual GMV with standard products, off-the-shelf is fine. You should spend your time on marketing and operations, not engineering.\n\n## When to Go Custom\n\nWhen you need deep integrations local couriers, cash-on-delivery workflows, multi-vendor marketplace logic, or industry-specific catalog rules off-the-shelf platforms become a tax on every new feature.\n\n## The Business Case\n\nCustom software is an asset on your balance sheet. It is also a moat. Competitors using Shopify cannot replicate the workflows that make your operations 30% more efficient.\n\n## The Honest Cost\n\nPlan for at least 25-50 lakh NPR for a serious custom commerce platform, plus ongoing maintenance. The ROI window is typically 18-24 months for businesses doing 10+ crore GMV.\n\n## Our Approach\n\nGrowth Catalyst builds custom commerce platforms on Next.js + PostgreSQL, integrated with eSewa, Khalti, IME Pay, and major Nepali logistics partners. We have shipped systems handling thousands of orders daily for retailers across the country.",
    },
    {
      title: "Implementing AI Document Processing for Nepali Banks and Cooperatives",
      slug: "ai-document-processing-nepal-banks-cooperatives",
      categorySlug: slugify("AI & Machine Learning"),
      excerpt:
        "Real-world AI use case: automating loan application processing for a Nepali cooperative citizenship cards, salary slips, and bank statements.",
      content:
        "Banks and cooperatives across Nepal process thousands of documents weekly citizenship cards, salary slips, land documents, bank statements. Most of this is still done manually. AI changes the economics dramatically.\n\n## The Old Workflow\n\nA loan officer receives a physical or scanned application. They manually verify each document, copy data into the core banking system, cross-check with the credit information bureau, and prepare an assessment. This takes hours per application.\n\n## The AI-Augmented Workflow\n\nDocuments are scanned and routed to an OCR pipeline trained specifically on Devanagari text. Key fields name, citizenship number, salary, employer are extracted automatically. The system flags anomalies and prepares a draft assessment. The officer reviews and approves in minutes.\n\n## Technology Choices\n\nWe combine specialized Devanagari OCR (we fine-tune open models on Nepali documents) with structured extraction using LLMs. Sensitive processing stays on-premise; only the necessary classification happens via API.\n\n## Real Impact\n\nFor one cooperative engagement, application processing time dropped from 3 days to 4 hours. Loan officer capacity tripled without adding headcount. False acceptance rates dropped because the model catches inconsistencies humans miss when fatigued.\n\n## Compliance Notes\n\nNRB compliance and customer data protection are non-negotiable. We architect these systems with full audit logs, role-based access, and on-premise inference for sensitive workloads.",
    },
  ];

  for (const post of blogs) {
    const category = catBySlug[post.categorySlug];
    if (!category) continue;
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        categoryId: category.id,
        published: true,
        authorId: admin.id,
      },
      create: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        categoryId: category.id,
        published: true,
        authorId: admin.id,
      },
    });
  }

  console.log("Seed completed.");
  console.log(`Admin: ${admin.email} / ${process.env.ADMIN_PASSWORD ?? "admin123"}`);
  console.log(`Blogs: ${blogs.length} | Products: ${products.length} | Team: ${teamMembers.length} | Clients: ${clientNames.length}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
