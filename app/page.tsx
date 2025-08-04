"use client"

import {FormEvent, useState} from "react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {
    ArrowRight,
    CheckCircle,
    Users,
    Code,
    MessageSquare,
    Clock,
    DollarSign,
    Globe,
    Shield,
    Star,
    Building2,
    Stethoscope,
    Utensils,
    Truck,
    CreditCard,
    Mail,
    Phone,
    MapPin,
    ChevronDown,
    Store,
    Languages,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {redirect} from "next/navigation";

// Content translations
const content = {
    id: {
        // Navigation
        nav: {
            services: "Layanan",
            about: "Tentang",
            portfolio: "Portfolio",
            contact: "Kontak",
            getQuote: "Dapatkan Penawaran",
        },
        // Hero Section
        hero: {
            badge: "Solusi Teknologi Profesional",
            title: "Solusi Berkualitas Enterprise dengan",
            titleHighlight: " Harga Startup",
            description:
                "Kami menghadirkan solusi teknologi profesional tanpa harga premium. Melayani bisnis Indonesia dengan kualitas standar internasional di berbagai industri F&B, Kesehatan, Perbankan, Ekspor-Impor, dan UMKM.",
            getStarted: "Mulai Sekarang",
            viewPortfolio: "Lihat Portfolio",
            features: {
                fastDelivery: "Penerbitan Cepat",
                affordablePricing: "Harga Terjangkau",
                fullSupport: "Dukungan Penuh",
            },
        },
        // Services Section
        services: {
            title: "Solusi Teknologi Lengkap",
            description:
                "Dari konsep hingga deployment, kami menyediakan layanan teknologi end-to-end yang disesuaikan dengan kebutuhan dan anggaran bisnis Anda.",
            companyProfile: {
                title: "Pembuatan Profil Perusahaan",
                description: "Profil bisnis profesional dibuat dengan cepat dan terjangkau",
                features: [
                    "Penerbitan cepat 24-48 jam",
                    "Template desain profesional",
                    "Kustomisasi khusus industri",
                    "Output berbagai format",
                ],
            },
            fullSolution: {
                title: "Sistem Solusi Lengkap",
                description: "Tech stack lengkap dari desain hingga deployment",
                features: ["UI/UX yang Dapat Disesuaikan", "Aplikasi Web & Mobile", "Layanan Backend", "Manajemen Database"],
            },
            techConsulting: {
                title: "Konsultasi Teknologi",
                description: "Konsultasi teknologi strategis untuk pertumbuhan bisnis",
                features: [
                    "Perencanaan roadmap teknologi",
                    "Review arsitektur sistem",
                    "Transformasi digital",
                    "Dukungan teknis berkelanjutan",
                ],
            },
        },
        // Trust Building Section
        trust: {
            title: "Mengapa Memilih Amanel Tech?",
            description: "Keahlian profesional, proses transparan, dan teknologi modern",
            process: {
                title: "Proses Kami",
                steps: [
                    {
                        title: "Discovery & Perencanaan",
                        description: "Kami memahami kebutuhan bisnis Anda dan membuat rencana proyek yang detail",
                    },
                    {
                        title: "Desain & Pengembangan",
                        description: "Desain dan pengembangan profesional dengan update progress berkala",
                    },
                    {
                        title: "Testing & Deployment",
                        description: "Testing menyeluruh dan deployment yang lancar dengan dokumentasi lengkap",
                    },
                    {
                        title: "Dukungan & Maintenance",
                        description: "Dukungan berkelanjutan dan maintenance untuk memastikan performa optimal",
                    },
                ],
            },
            techStack: {
                title: "Technology Stack",
                frontend: {
                    title: "Frontend",
                    items: ["React/Angular", "Next.JS", "VueJS", "TypeScript", "Tailwind"],
                },
                backend: {
                    title: "Backend",
                    items: ["Golang", "Java", "Node.JS"],
                },
                database: {
                    title: "Database",
                    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
                },
                infrastructure: {
                    title: "Infrastructure",
                    items: ["Cloud", "On Premise", "Docker"],
                },
                messaging: {
                    title: "Messaging",
                    items: ["NSQ", "Kafka", "RabbitMQ"],
                },
                monitoring: {
                    title: "Monitoring",
                    items: ["Grafana", "Jaeger", "New Relic"],
                },
            },
        },
        // Industry Experience
        industry: {
            title: "Keahlian Lintas Industri",
            description: "Kami memahami tantangan dan kebutuhan unik dari berbagai industri",
            sectors: {
                fnb: {
                    title: "Food & Beverage",
                    description: "Sistem POS, manajemen inventori, platform pemesanan online",
                },
                exportImport: {
                    title: "Ekspor-Impor",
                    description: "Manajemen supply chain, dokumentasi bea cukai, tracking logistik",
                },
                healthcare: {
                    title: "Kesehatan",
                    description: "Sistem manajemen pasien, penjadwalan appointment, rekam medis",
                },
                banking: {
                    title: "Perbankan & Keuangan",
                    description: "Sistem pembayaran aman, dashboard keuangan, tools compliance",
                },
                umkm: {
                    title: "UMKM",
                    description: "Sistem kasir digital, manajemen stok, platform e-commerce sederhana",
                },
            },
        },
        // Social Proof
        socialProof: {
            title: "Kisah Sukses Klien",
            description: "Wujudkan kebutuhan teknologi mu bersama kami",
            testimonials: [
                {
                    text: "Amanel Tech menghadirkan sistem POS restoran kami hanya dalam 2 minggu dengan biaya setengah dari penyedia lain. Sistemnya robust dan sangat meningkatkan operasional kami.",
                    name: "Ahmad Rizki",
                    position: "Pemilik, Warung Nusantara",
                },
                {
                    text: "Sistem manajemen ekspor-impor mereka merampingkan seluruh proses logistik kami. Kualitas profesional dengan harga yang tak tertandingi.",
                    name: "Sarah Wijaya",
                    position: "Direktur, Global Trade Co.",
                },
                {
                    text: "Sistem manajemen pasien yang mereka buat untuk klinik kami persis seperti yang kami butuhkan. Komunikasi yang baik sepanjang proyek.",
                    name: "Dr. Budi Santoso",
                    position: "Direktur, Klinik Sehat",
                },
            ],
        },
        // Competitive Advantages
        advantages: {
            title: "Mengapa Kami Berbeda",
            description: "Lima keunggulan utama yang membedakan kami dari kompetitor",
            items: [
                {
                    title: "Solusi Hemat Biaya",
                    description:
                        "Kualitas profesional dengan harga ramah startup, hingga 60% lebih murah dari agensi tradisional",
                },
                {
                    title: "Produksi Cepat",
                    description: "Penerbitan cepat tanpa mengorbankan kualitas, sebagian besar proyek selesai dalam 2-4 minggu",
                },
                {
                    title: "Penanganan End-to-End",
                    description: "Manajemen proyek lengkap dari konsep hingga deployment dan dukungan berkelanjutan",
                },
                {
                    title: "Keahlian Lintas Industri",
                    description: "Pengalaman terbukti di sektor F&B, Kesehatan, Perbankan, Ekspor-Impor, dan UMKM",
                },
                {
                    title: "Lokal + Internasional",
                    description: "Pengetahuan mendalam pasar Indonesia dengan standar pengembangan internasional",
                },
            ],
        },
        // Contact Section
        contact: {
            title: "Siap untuk Memulai?",
            description: "Hubungi kami hari ini untuk konsultasi gratis dan penawaran proyek",
            getInTouch: "Hubungi Kami",
            quickQuote: "Permintaan Penawaran Cepat",
            form: {
                name: "Nama Anda",
                company: "Nama Perusahaan",
                email: "Alamat Email",
                phone: "Nomor Telepon",
                project: "Deskripsi Proyek",
                send: "Kirim Permintaan Penawaran",
            },
            faq: {
                title: "Pertanyaan yang Sering Diajukan",
                items: [
                    {
                        question: "Berapa biaya layanan Anda?",
                        answer:
                            "Harga kami berbasis proyek dan biasanya 20-40% lebih murah dari agensi tradisional. Hubungi kami untuk penawaran detail berdasarkan kebutuhan spesifik Anda.",
                    },
                    {
                        question: "Berapa lama timeline proyek biasanya?",
                        answer:
                            "Sebagian besar proyek selesai dalam 2-4 minggu, tergantung kompleksitas. Profil perusahaan dapat diselesaikan dalam 24-48 jam.",
                    },
                    {
                        question: "Apakah Anda menyediakan dukungan berkelanjutan?",
                        answer:
                            "Ya, kami menyediakan paket dukungan dan maintenance komprehensif untuk memastikan sistem Anda terus berkinerja optimal.",
                    },
                    {
                        question: "Bisakah Anda bekerja dengan klien internasional?",
                        answer:
                            "Meskipun kami mengkhususkan diri di pasar Indonesia, kami bekerja dengan klien internasional dan mengikuti standar pengembangan global.",
                    },
                ],
            },
        },
        // Footer
        footer: {
            description: "Solusi teknologi profesional dengan harga ramah startup.",
            services: "Layanan",
            industries: "Industri",
            contact: "Kontak",
            servicesList: [
                "Pembuatan Profil Perusahaan",
                "Sistem Solusi Lengkap",
                "Konsultasi Teknologi",
                "Dukungan Berkelanjutan",
            ],
            industriesList: ["Food & Beverage", "Ekspor-Impor", "Kesehatan", "Perbankan & Keuangan", "UMKM"],
            copyright: "Hak Cipta Dilindungi",
        },
    },
    en: {
        // Navigation
        nav: {
            services: "Services",
            about: "About",
            portfolio: "Portfolio",
            contact: "Contact",
            getQuote: "Get Quote",
        },
        // Hero Section
        hero: {
            badge: "Professional Tech Solutions",
            title: "Enterprise-Quality Solutions at",
            titleHighlight: " Startup Prices",
            description:
                "We deliver professional technology solutions without the premium price tag. Serving Indonesian businesses with international-standard quality across F&B, Healthcare, Banking, Export-Import, and UMKM industries.",
            getStarted: "Get Started",
            viewPortfolio: "View Portfolio",
            features: {
                fastDelivery: "Fast Delivery",
                affordablePricing: "Affordable Pricing",
                fullSupport: "Full Support",
            },
        },
        // Services Section
        services: {
            title: "Complete Technology Solutions",
            description:
                "From concept to deployment, we provide end-to-end technology services tailored to your business needs and budget.",
            companyProfile: {
                title: "Company Profile Generation",
                description: "Professional business profiles created quickly and affordably",
                features: [
                    "Fast 24-48 hour delivery",
                    "Professional design templates",
                    "Industry-specific customization",
                    "Multiple format outputs",
                ],
            },
            fullSolution: {
                title: "Full Solution Systems",
                description: "Complete tech stack from design to deployment",
                features: ["Customizable UI/UX", "Web Application & Mobile", "Backend Service", "Database Management"],
            },
            techConsulting: {
                title: "Technology Consulting",
                description: "Strategic tech advisory for business growth",
                features: [
                    "Technology roadmap planning",
                    "System architecture review",
                    "Digital transformation",
                    "Ongoing technical support",
                ],
            },
        },
        // Trust Building Section
        trust: {
            title: "Why Choose Amanel Tech?",
            description: "Professional expertise, transparent processes, and modern technology stack",
            process: {
                title: "Our Process",
                steps: [
                    {
                        title: "Discovery & Planning",
                        description: "We understand your business needs and create a detailed project plan",
                    },
                    {
                        title: "Design & Development",
                        description: "Professional design and development with regular progress updates",
                    },
                    {
                        title: "Testing & Deployment",
                        description: "Thorough testing and smooth deployment with full documentation",
                    },
                    {
                        title: "Support & Maintenance",
                        description: "Ongoing support and maintenance to ensure optimal performance",
                    },
                ],
            },
            techStack: {
                title: "Technology Stack",
                frontend: {
                    title: "Frontend",
                    items: ["React/Angular", "Next.JS", "VueJS", "TypeScript", "Tailwind"],
                },
                backend: {
                    title: "Backend",
                    items: ["Golang", "Java", "Node.JS"],
                },
                database: {
                    title: "Database",
                    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
                },
                infrastructure: {
                    title: "Infrastructure",
                    items: ["Cloud", "On Premise", "Docker"],
                },
                messaging: {
                    title: "Messaging",
                    items: ["NSQ", "Kafka", "RabbitMQ"],
                },
                monitoring: {
                    title: "Monitoring",
                    items: ["Grafana", "Jaeger", "New Relic"],
                },
            },
        },
        // Industry Experience
        industry: {
            title: "Cross-Industry Expertise",
            description: "We understand the unique challenges and requirements of different industries",
            sectors: {
                fnb: {
                    title: "Food & Beverage",
                    description: "POS systems, inventory management, online ordering platforms",
                },
                exportImport: {
                    title: "Export-Import",
                    description: "Supply chain management, customs documentation, logistics tracking",
                },
                healthcare: {
                    title: "Healthcare",
                    description: "Patient management systems, appointment scheduling, medical records",
                },
                banking: {
                    title: "Banking & Finance",
                    description: "Secure payment systems, financial dashboards, compliance tools",
                },
                umkm: {
                    title: "UMKM",
                    description: "Digital POS systems, inventory management, simple e-commerce platforms",
                },
            },
        },
        // Social Proof
        socialProof: {
            title: "Client Success Stories",
            description: "Bring Into Reality Your Digital Needs With Us",
            testimonials: [
                {
                    text: "Amanel Tech delivered our restaurant POS system in just 2 weeks at half the cost of other providers. The system is robust and has improved our operations significantly.",
                    name: "Ahmad Rizki",
                    position: "Owner, Warung Nusantara",
                },
                {
                    text: "Their export-import management system streamlined our entire logistics process. Professional quality at an unbeatable price point.",
                    name: "Sarah Wijaya",
                    position: "Director, Global Trade Co.",
                },
                {
                    text: "The patient management system they built for our clinic is exactly what we needed. Great communication throughout the project.",
                    name: "Dr. Budi Santoso",
                    position: "Director, Sehat Clinic",
                },
            ],
        },
        // Competitive Advantages
        advantages: {
            title: "Why We're Different",
            description: "Five key advantages that set us apart from the competition",
            items: [
                {
                    title: "Cost-Effective Solutions",
                    description: "Professional quality at startup-friendly prices, up to 60% less than traditional agencies",
                },
                {
                    title: "Quick Production",
                    description: "Fast delivery without compromising quality, most projects completed in 2-4 weeks",
                },
                {
                    title: "End-to-End Handling",
                    description: "Complete project management from concept to deployment and ongoing support",
                },
                {
                    title: "Cross-Industry Expertise",
                    description: "Proven experience across F&B, Healthcare, Banking, Export-Import, and UMKM sectors",
                },
                {
                    title: "Local + International",
                    description: "Deep Indonesian market knowledge with international development standards",
                },
            ],
        },
        // Contact Section
        contact: {
            title: "Ready to Get Started?",
            description: "Contact us today for a free consultation and project quote",
            getInTouch: "Get in Touch",
            quickQuote: "Quick Quote Request",
            form: {
                name: "Your Name",
                company: "Company Name",
                email: "Email Address",
                phone: "Phone Number",
                project: "Project Description",
                send: "Send Quote Request",
            },
            faq: {
                title: "Frequently Asked Questions",
                items: [
                    {
                        question: "How much do your services cost?",
                        answer:
                            "Our pricing is project-based and typically 20-40% less than traditional agencies. Contact us for a detailed quote based on your specific requirements.",
                    },
                    {
                        question: "What's your typical project timeline?",
                        answer:
                            "Most projects are completed within 2-4 weeks, depending on complexity. Company profiles can be delivered in 24-48 hours.",
                    },
                    {
                        question: "Do you provide ongoing support?",
                        answer:
                            "Yes, we provide comprehensive support and maintenance packages to ensure your systems continue to perform optimally.",
                    },
                    {
                        question: "Can you work with international clients?",
                        answer:
                            "While we specialize in the Indonesian market, we work with international clients and follow global development standards.",
                    },
                ],
            },
        },
        // Footer
        footer: {
            description: "Professional technology solutions at startup-friendly prices.",
            services: "Services",
            industries: "Industries",
            contact: "Contact",
            servicesList: ["Company Profile Generation", "Full Solution Systems", "Technology Consulting", "Ongoing Support"],
            industriesList: ["Food & Beverage", "Export-Import", "Healthcare", "Banking & Finance", "UMKM"],
            copyright: "All rights reserved",
        },
    },
}

export default function AmaTechWebsite() {
    const [language, setLanguage] = useState<"id" | "en">("id")
    const t = content[language]

    const toggleLanguage = () => {
        setLanguage(language === "id" ? "en" : "id")
    }


    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const name = formData.get('name')?.toString() || '';
        const company = formData.get('company')?.toString() || '';
        const email = formData.get('email')?.toString() || '';
        const phone = formData.get('phone')?.toString() || '';
        const project = formData.get('project')?.toString() || '';

        const messageText = `
Halo, saya ingin menghubungi Anda terkait proyek.

*Nama:* ${name}
*Perusahaan:* ${company}
*Email:* ${email}
*Telepon:* ${phone}
*Deskripsi Proyek:*
${project}

Terima kasih!
  `.trim();

        const url = new URL('https://wa.me/6281397874869');
        url.searchParams.set('text', messageText);

        window.open(url.toString(), '_blank');

        event.currentTarget.reset()
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="h-8 w-8 bg-blue-700 rounded-lg flex items-center justify-center">
                                    <Code className="h-5 w-5 text-white"/>
                                </div>
                            </div>
                            <div className="ml-3">
                                <span className="text-xl font-bold text-gray-900">Amanel Tech</span>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-8">
                                <Link href="#services"
                                      className="text-gray-600 hover:text-blue-700 px-3 py-2 text-sm font-medium">
                                    {t.nav.services}
                                </Link>
                                <Link href="#about"
                                      className="text-gray-600 hover:text-blue-700 px-3 py-2 text-sm font-medium">
                                    {t.nav.about}
                                </Link>
                                <Link href="#portfolio"
                                      className="text-gray-600 hover:text-blue-700 px-3 py-2 text-sm font-medium">
                                    {t.nav.portfolio}
                                </Link>
                                <Link href="#contact"
                                      className="text-gray-600 hover:text-blue-700 px-3 py-2 text-sm font-medium">
                                    {t.nav.contact}
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={toggleLanguage}
                                className="flex items-center space-x-2 bg-transparent"
                            >
                                <Languages className="h-4 w-4"/>
                                <span>{language.toUpperCase()}</span>
                            </Button>
                            {/*<Button className="bg-blue-700 hover:bg-blue-800">{t.nav.getQuote}</Button>*/}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-100 to-indigo-200 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                {t.hero.title}
                                <span className="text-blue-700">{t.hero.titleHighlight}</span>
                            </h1>
                            <p className="text-lg text-gray-600 mb-6">{t.hero.description}</p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" className="bg-blue-700 hover:bg-blue-800">
                                    {t.hero.getStarted} <ArrowRight className="ml-2 h-4 w-4"/>
                                </Button>
                            </div>
                            <div className="mt-8 flex items-center space-x-6">
                                <div className="flex items-center">
                                    <CheckCircle className="h-5 w-5 text-green-500 mr-2"/>
                                    <span className="text-xs text-gray-600">{t.hero.features.fastDelivery}</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className="h-5 w-5 text-green-500 mr-2"/>
                                    <span className="text-xs text-gray-600">{t.hero.features.affordablePricing}</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className="h-5 w-5 text-green-500 mr-2"/>
                                    <span className="text-xs text-gray-600">{t.hero.features.fullSupport}</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <Image
                                src="/hero.png"
                                alt="Professional tech team"
                                width={600}
                                height={500}
                                className="rounded-lg shadow"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t.services.title}</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t.services.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="border-2 hover:border-blue-300 transition-colors">
                            <CardHeader>
                                <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center mb-4">
                                    <Building2 className="h-6 w-6 text-blue-700"/>
                                </div>
                                <CardTitle className="text-sm">{t.services.companyProfile.title}</CardTitle>
                                <CardDescription className="text-xs">{t.services.companyProfile.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-xs text-gray-600">
                                    {t.services.companyProfile.features.map((feature, index) => (
                                        <li key={index} className="flex items-center">
                                            <CheckCircle className="h-4 w-4 text-green-500 mr-2"/>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="border-2 hover:border-blue-300 transition-colors">
                            <CardHeader>
                                <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center mb-4">
                                    <Code className="h-6 w-6 text-blue-700"/>
                                </div>
                                <CardTitle className="text-sm">{t.services.fullSolution.title}</CardTitle>
                                <CardDescription className="text-xs">{t.services.fullSolution.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-xs text-gray-600">
                                    {t.services.fullSolution.features.map((feature, index) => (
                                        <li key={index} className="flex items-center">
                                            <CheckCircle className="h-4 w-4 text-green-500 mr-2"/>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="border-2 hover:border-blue-300 transition-colors">
                            <CardHeader>
                                <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center mb-4">
                                    <MessageSquare className="h-6 w-6 text-blue-700"/>
                                </div>
                                <CardTitle className="text-sm">{t.services.techConsulting.title}</CardTitle>
                                <CardDescription className="text-xs">{t.services.techConsulting.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-xs text-gray-600">
                                    {t.services.techConsulting.features.map((feature, index) => (
                                        <li key={index} className="flex items-center">
                                            <CheckCircle className="h-4 w-4 text-green-500 mr-2"/>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Industry Experience */}
            <section className="py-10 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{t.industry.title}</h2>
                        <p className="text-base text-gray-600 max-w-3xl mx-auto">{t.industry.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Utensils className="h-8 w-8 text-orange-600"/>
                                </div>
                                <CardTitle className="text-sm">{t.industry.sectors.fnb.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-xs">{t.industry.sectors.fnb.description}</p>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Truck className="h-8 w-8 text-green-600"/>
                                </div>
                                <CardTitle className="text-sm">{t.industry.sectors.exportImport.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-xs">{t.industry.sectors.exportImport.description}</p>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Stethoscope className="h-8 w-8 text-blue-700"/>
                                </div>
                                <CardTitle className="text-sm">{t.industry.sectors.healthcare.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-xs">{t.industry.sectors.healthcare.description}</p>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CreditCard className="h-8 w-8 text-purple-600"/>
                                </div>
                                <CardTitle className="text-sm">{t.industry.sectors.banking.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-xs">{t.industry.sectors.banking.description}</p>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Store className="h-8 w-8 text-teal-600"/>
                                </div>
                                <CardTitle className="text-sm">{t.industry.sectors.umkm.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-xs">{t.industry.sectors.umkm.description}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Trust Building Section */}
            <section id="about" className="py-10 bg-blue-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">{t.trust.title}</h2>
                        <p className="text-base text-blue-100 max-w-3xl mx-auto">{t.trust.description}</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-6">{t.trust.process.title}</h3>
                            <div className="space-y-4">
                                {t.trust.process.steps.map((step, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className="w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white">{step.title}</h4>
                                            <p className="text-blue-100">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-6">{t.trust.techStack.title}</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg border-white/30 border">
                                    <h4 className="font-semibold text-white mb-2">{t.trust.techStack.frontend.title}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {t.trust.techStack.frontend.items.map((item, index) => (
                                            <Badge key={index} variant="secondary">
                                                {item}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg border-white/30 border">
                                    <h4 className="font-semibold text-white mb-2">{t.trust.techStack.backend.title}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {t.trust.techStack.backend.items.map((item, index) => (
                                            <Badge key={index} variant="secondary">
                                                {item}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg border-white/30 border">
                                    <h4 className="font-semibold text-white mb-2">{t.trust.techStack.database.title}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {t.trust.techStack.database.items.map((item, index) => (
                                            <Badge key={index} variant="secondary">
                                                {item}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg border-white/30 border">
                                    <h4 className="font-semibold text-white mb-2">{t.trust.techStack.infrastructure.title}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {t.trust.techStack.infrastructure.items.map((item, index) => (
                                            <Badge key={index} variant="secondary">
                                                {item}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg border-white/30 border">
                                    <h4 className="font-semibold text-white mb-2">{t.trust.techStack.messaging.title}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {t.trust.techStack.messaging.items.map((item, index) => (
                                            <Badge key={index} variant="secondary">
                                                {item}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof Section */}
            <section id="portfolio" className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t.socialProof.title}</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t.socialProof.description}</p>
                    </div>
                </div>
            </section>

            {/* Competitive Advantages */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t.advantages.title}</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t.advantages.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {t.advantages.items.map((advantage, index) => {
                            const icons = [DollarSign, Clock, Shield, Users, Globe]
                            const colors = ["green", "blue", "purple", "orange", "red"]
                            const Icon = icons[index]
                            const color = colors[index]

                            return (
                                <div key={index} className="flex items-start">
                                    <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center mr-4`}>
                                        <Icon className={`h-6 w-6 text-${color}-600`}/>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{advantage.title}</h3>
                                        <p className="text-gray-600 text-sm">{advantage.description}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Contact & CTA Section */}
            <section id="contact" className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t.contact.title}</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t.contact.description}</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">{t.contact.getInTouch}</h3>
                            <div className="space-y-4 mb-6">
                                <div className="flex items-center">
                                    <Mail className="h-5 w-5 text-blue-700 mr-3"/>
                                    <span className="text-sm">panjaitanandree@gmail.com</span>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="h-5 w-5 text-blue-700 mr-3"/>
                                    <span className="text-sm">nathan.nandoo@gmail.com</span>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="h-5 w-5 text-blue-700 mr-3"/>
                                    <span className="text-sm">+62 81397874869</span>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="h-5 w-5 text-blue-700 mr-3"/>
                                    <span className="text-sm">+62 81263693706</span>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="h-5 w-5 text-blue-700 mr-3"/>
                                    <span className="text-sm">Jakarta, Indonesia</span>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg border">
                                <h4 className="font-bold text-gray-900 mb-4">{t.contact.quickQuote}</h4>
                                <form className="space-y-4" onSubmit={onSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input placeholder={t.contact.form.name} name='name' required/>
                                        <Input placeholder={t.contact.form.company} name='company' required/>
                                    </div>
                                    <Input placeholder={t.contact.form.email} name='email' type="email" required/>
                                    <Input placeholder={t.contact.form.phone} name='phone' required/>
                                    <Textarea placeholder={t.contact.form.project} name='project' rows={4} required/>
                                    <Button className="w-full bg-blue-700 hover:bg-blue-800">{t.contact.form.send}</Button>
                                </form>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">{t.contact.faq.title}</h3>
                            <div className="space-y-4">
                                {t.contact.faq.items.map((faq, index) => (
                                    <Card key={index}>
                                        <CardHeader>
                                            <CardTitle className="text-lg flex items-center justify-between">
                                                {faq.question}
                                                <ChevronDown className="h-4 w-4"/>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-600 text-sm">{faq.answer}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center mb-4">
                                <div className="h-8 w-8 bg-blue-700 rounded-lg flex items-center justify-center mr-3">
                                    <Code className="h-5 w-5 text-white"/>
                                </div>
                                <span className="text-xl font-bold">Amanel Tech</span>
                            </div>
                            <p className="text-gray-400 text-sm">{t.footer.description}</p>
                        </div>

                        <div>
                            <h4 className="font-bold mb-4">{t.footer.services}</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                {t.footer.servicesList.map((service, index) => (
                                    <li key={index}>{service}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-4">{t.footer.industries}</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                {t.footer.industriesList.map((industry, index) => (
                                    <li key={index}>{industry}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-xs">
                        <p>&copy; 2025 Amanel Tech. {t.footer.copyright}.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
