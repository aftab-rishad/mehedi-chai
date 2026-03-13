import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import MehediHand from "@/public/mehedi-hand.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center px-4 mt-2 sm:mt-0">
      <Card className="max-w-xl w-full flex flex-col items-center justify-center">
        <CardHeader className="w-full flex flex-col items-center justify-center">
          <CardTitle className="text-[1.05rem] sm:text-xl">
            <span className="bg-linear-to-r from-primary bg-clip-text text-transparent to-white">
              ঈদ আসছে… কিন্তু তোমার হাতে এখনো মেহেদি নেই?
            </span>{" "}
            😢
          </CardTitle>
          <CardDescription>
            কোনো সমস্যা নেই! একটা ছোট মজার রিকোয়েস্ট পাঠাও, দেখো ম্যাজিক!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Image
            alt="mehedi hand"
            src={MehediHand}
            className="w-80 h-80 object-cover rounded-2xl"
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
        </CardContent>
        <CardFooter className="my-4 flex justify-center items-center flex-wrap-reverse gap-1 ">
          <Button size="lg" variant="secondary">
            <Link href="https://www.kabinbd.com/" target="_blank">
              মেহেদি দেওয়ার কেউ নাই… 😢
            </Link>
          </Button>
          <Button asChild size="lg">
            <Link prefetch href="/request">
              প্রিয়জনকে মেহেদি দিতে বলো 😏
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
