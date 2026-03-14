import { get_req } from "@/action/GetReq";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import MehediHand from "@/public/mehedi-hand.jpg";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = await params;

  const data = await get_req(id);

  if (!data) {
    return {
      title: "মেহেদি রিকোয়েস্ট",
    };
  }

  const title = `${data.name} তোমার কাছে মেহেদি চাইছে 😏`;
  const description = `${data.name} এই ঈদের জন্য ${data.receiver_name} এর কাছে মেহেদি রিকোয়েস্ট পাঠিয়েছে। দেখো তো কিনে দাও কিনা! 💅`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://mehedichai.com/r/${id}`,
      siteName: "MehediChai",
      locale: "bn_BD",
      type: "website",
      images: [
        {
          url: "/og_image.png",
          width: 1200,
          height: 630,
          alt: "Mehedi Request",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og_image.png"],
    },
  };
}

async function ReqPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const data = await get_req(id);
  if (!data) notFound();

  return (
    <div className="flex min-h-screen w-screen items-center justify-center px-4 mt-2 sm:mt-0">
      <Card
        className="max-w-lg w-full flex flex-col items-center justify-center relative"
        style={{
          backgroundImage: "url('/req_bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="fixed inset-0 bg-background/80" />

        <CardHeader className="w-full z-50 flex flex-col items-center justify-center">
          <CardTitle className="text-[1.05rem] sm:text-xl">
            🚨{" "}
            <span className="bg-linear-to-r from-primary bg-clip-text text-transparent to-white">
              ঈদের আগে জরুরি ঘোষণা
            </span>
          </CardTitle>
          <CardDescription>
            <span className="font-bold text-white">{data?.name}</span> তোমার
            কাছে একটা ছোট ঈদের রিকোয়েস্ট পাঠিয়েছে 😌
          </CardDescription>
        </CardHeader>
        <CardContent className="flex z-50 flex-col items-center text-center">
          <div className="text-start">
            <span className="font-bold text-white">{data?.name}</span> বলছে —
            <br />
            <br />
            <span className="font-bold text-white">{data?.receiver_name}</span>
            , এই ঈদে আমার হাতে মেহেদি না থাকলে
            <br />
            আমার ঈদটা একটু sad হয়ে যাবে 😢
            <Image
              alt="mehedi hand"
              src={MehediHand}
              className="w-72 h-72 object-cover rounded-2xl"
              style={{
                WebkitMaskImage: `
                 linear-gradient(to right, transparent, black 15%, black 80%, transparent),
                 linear-gradient(to bottom, transparent, black 15%, black 80%, transparent)
               `,
                WebkitMaskComposite: "intersect",
                maskImage: `
                 linear-gradient(to right, transparent, black 15%, black 80%, transparent),
                 linear-gradient(to bottom, transparent, black 15%, black 80%, transparent)
               `,
                maskComposite: "intersect",
              }}
            />
            তাই তোমার কাছেই চাইছি...
            <br />
            একটু মেহেদি কিনে দেবে? 💅
          </div>

          <div className="w-full bg-black/40 border border-white/5 rounded-2xl p-2 my-2 italic text-lg leading-relaxed text-gray-200">
            &quot;{data?.message}&quot;
          </div>

          <Button size="lg" asChild>
            <Link
              href="https://www.facebook.com/mehedinokshabymimi"
              target="_blank"
            >
              <span>💅 মেহেদি কিনে দাও</span>
              <span className="group-hover:scale-125 transition-transform inline-block">
                🤩
              </span>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default ReqPage;
