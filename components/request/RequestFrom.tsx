"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { generate_message } from "@/action/GenerateMessage";
import { useState } from "react";
import { create_req } from "@/action/CreateReq";

const schema = z.object({
  name: z.string().min(2, "নাম কমপক্ষে ২ অক্ষর হতে হবে"),
  receiver_name: z.string().min(2, "যার কাছে পাঠাবে তার নাম লাগবে"),
  relationship: z.string().min(1, "একটা সম্পর্ক নির্বাচন করো"),
  message: z.string().min(5, "মেসেজ একটু বড় লিখো"),
});

type FormData = z.infer<typeof schema>;

function RequestFrom() {
  const [loadingAI, setLoadingAI] = useState(false);
  const [reqId, setReqId] = useState("");
  const [copyed, setCopyed] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      receiver_name: "",
      relationship: "",
      message: "",
    },
  });

  const name = watch("name");
  const receiverName = watch("receiver_name");
  const relationship = watch("relationship");

  const isAIButtonDisabled = !name || !receiverName || !relationship;

  const onSubmit = async (data: FormData) => {
    const createdData = await create_req(data);
    setReqId(createdData?.id);
  };

  const handleGenerateMessage = async () => {
    try {
      setLoadingAI(true);
      const data = await generate_message({ receiverName, relationship });
      setValue("message", data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <Card className="max-w-xl w-full flex flex-col items-center justify-center">
      <CardHeader className="w-full flex flex-col">
        <CardTitle className="text-[1.05rem] sm:text-xl">
          <span className="bg-linear-to-r from-primary bg-clip-text text-transparent to-white">
            তোমার নামটা বলো আগে
          </span>{" "}
          😏
        </CardTitle>

        <CardDescription>
          চিন্তা করো না… আমরা কাউকে বলব না তুমি কার কাছে মেহেদি চাইছো।
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full">
        {reqId ? (
          <div className="flex items-center gap-2">
            <Field>
              <FieldLabel className="-mb-2 text-[0.8rem]">
                দেরি না করে লিংকটা প্রিয়জনকে পাঠিয়ে দাও!
              </FieldLabel>
              <Input
                readOnly
                value={`${process.env.NEXT_PUBLIC_BASE_URL}/r/${reqId}`}
              />
              <p className="text-foreground/60 -mt-2">
                কে জানে, হয়তো এখনই মেহেদি পরার সময় হয়ে গেছে। 😜✨
              </p>
            </Field>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(
                  `${process.env.NEXT_PUBLIC_BASE_URL}/r/${reqId}`,
                );
                setCopyed(true);
              }}
            >
              {copyed ? "কপি ডান! আক্রমণ 🏃‍♂️🔥" : "কপি করতে গুতা দাও! 👈"}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel className="-mb-2 text-[0.8rem]">
                  তোমার নাম
                </FieldLabel>

                <Input {...register("name")} placeholder="যেমন: টিয়া/ময়না" />
                {!errors.name && (
                  <p className="text-foreground/60 -mt-2">
                    ভয় পেও না… নামটা শুধু মেসেজে দেখানো হবে 😌{" "}
                  </p>
                )}
                {errors.name && (
                  <p className="text-red-500 -mt-2 text-sm">
                    {errors.name.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel className="-mb-2 text-[0.8rem]">
                  কার কাছে এই মেহেদি রিকোয়েস্ট?
                </FieldLabel>

                <Input
                  {...register("receiver_name")}
                  placeholder="যেমন: জসিম এর বাপ"
                />

                {errors.receiver_name && (
                  <p className="text-red-500 -mt-2 text-sm">
                    {errors.receiver_name.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel className="-mb-2 text-[0.8rem]">
                  তোমার সাথে তার সম্পর্ক
                </FieldLabel>

                <Select
                  onValueChange={(value) =>
                    setValue("relationship", value ?? "")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="একটা নির্বাচন করো" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="crush">Crush 😎</SelectItem>
                    <SelectItem value="boyfriend">Boyfriend ❤️</SelectItem>
                    <SelectItem value="bestfriend">Best Friend 🤝</SelectItem>
                    <SelectItem value="secretlove">Secret Love 👀</SelectItem>
                    <SelectItem value="brother">Brother 👬</SelectItem>
                    <SelectItem value="husband">Husband 💍</SelectItem>
                    <SelectItem value="ex">Ex 😈</SelectItem>
                    <SelectItem value="justfriend">Just Friend 🙂</SelectItem>
                    <SelectItem value="neighbor">Neighbor 😏</SelectItem>
                    <SelectItem value="cousin">Cousin 👩‍👧</SelectItem>
                    <SelectItem value="classmate">Classmate 📚</SelectItem>
                  </SelectContent>
                </Select>

                {errors.relationship && (
                  <p className="text-red-500 -mt-2 text-sm">
                    {errors.relationship.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel className="-mb-2 text-[0.8rem]">
                  তাকে কি বলতে চাও?
                </FieldLabel>

                <Textarea
                  {...register("message")}
                  placeholder="এখানে তোমার মেসেজ লিখো..."
                />

                <div className="-mt-1 justify-between flex">
                  <div>
                    {errors.message && (
                      <p className="text-red-500 text-sm">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                  <Button
                    onClick={handleGenerateMessage}
                    disabled={isAIButtonDisabled || loadingAI}
                    type="button"
                    variant="outline"
                  >
                    {loadingAI ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        {/* Icon from EOS Icons by SUSE UX/UI team - https://gitlab.com/SUSE-UIUX/eos-icons/-/blob/master/LICENSE */}
                        <circle cx="12" cy="2" r="0" fill="currentColor">
                          <animate
                            attributeName="r"
                            begin="0"
                            calcMode="spline"
                            dur="1s"
                            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                            repeatCount="indefinite"
                            values="0;2;0;0"
                          />
                        </circle>
                        <circle
                          cx="12"
                          cy="2"
                          r="0"
                          fill="currentColor"
                          transform="rotate(45 12 12)"
                        >
                          <animate
                            attributeName="r"
                            begin="0.125s"
                            calcMode="spline"
                            dur="1s"
                            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                            repeatCount="indefinite"
                            values="0;2;0;0"
                          />
                        </circle>
                        <circle
                          cx="12"
                          cy="2"
                          r="0"
                          fill="currentColor"
                          transform="rotate(90 12 12)"
                        >
                          <animate
                            attributeName="r"
                            begin="0.25s"
                            calcMode="spline"
                            dur="1s"
                            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                            repeatCount="indefinite"
                            values="0;2;0;0"
                          />
                        </circle>
                        <circle
                          cx="12"
                          cy="2"
                          r="0"
                          fill="currentColor"
                          transform="rotate(135 12 12)"
                        >
                          <animate
                            attributeName="r"
                            begin="0.375s"
                            calcMode="spline"
                            dur="1s"
                            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                            repeatCount="indefinite"
                            values="0;2;0;0"
                          />
                        </circle>
                        <circle
                          cx="12"
                          cy="2"
                          r="0"
                          fill="currentColor"
                          transform="rotate(180 12 12)"
                        >
                          <animate
                            attributeName="r"
                            begin="0.5s"
                            calcMode="spline"
                            dur="1s"
                            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                            repeatCount="indefinite"
                            values="0;2;0;0"
                          />
                        </circle>
                        <circle
                          cx="12"
                          cy="2"
                          r="0"
                          fill="currentColor"
                          transform="rotate(225 12 12)"
                        >
                          <animate
                            attributeName="r"
                            begin="0.625s"
                            calcMode="spline"
                            dur="1s"
                            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                            repeatCount="indefinite"
                            values="0;2;0;0"
                          />
                        </circle>
                        <circle
                          cx="12"
                          cy="2"
                          r="0"
                          fill="currentColor"
                          transform="rotate(270 12 12)"
                        >
                          <animate
                            attributeName="r"
                            begin="0.75s"
                            calcMode="spline"
                            dur="1s"
                            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                            repeatCount="indefinite"
                            values="0;2;0;0"
                          />
                        </circle>
                        <circle
                          cx="12"
                          cy="2"
                          r="0"
                          fill="currentColor"
                          transform="rotate(315 12 12)"
                        >
                          <animate
                            attributeName="r"
                            begin="0.875s"
                            calcMode="spline"
                            dur="1s"
                            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                            repeatCount="indefinite"
                            values="0;2;0;0"
                          />
                        </circle>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        aria-hidden="true"
                        className="size-4"
                      >
                        {" "}
                        <path d="M9.5 2.672a.5.5 0 1 0 1 0V.843a.5.5 0 0 0-1 0zm4.5.035A.5.5 0 0 0 13.293 2L12 3.293a.5.5 0 1 0 .707.707zM7.293 4A.5.5 0 1 0 8 3.293L6.707 2A.5.5 0 0 0 6 2.707zm-.621 2.5a.5.5 0 1 0 0-1H4.843a.5.5 0 1 0 0 1zm8.485 0a.5.5 0 1 0 0-1h-1.829a.5.5 0 0 0 0 1zM13.293 10A.5.5 0 1 0 14 9.293L12.707 8a.5.5 0 1 0-.707.707zM9.5 11.157a.5.5 0 0 0 1 0V9.328a.5.5 0 0 0-1 0zm1.854-5.097a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L8.646 5.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0l1.293-1.293Zm-3 3a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L.646 13.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0z" />{" "}
                      </svg>
                    )}
                    {loadingAI
                      ? "মেসেজ তৈরি হচ্ছে…"
                      : "AI দিয়ে মজার মেসেজ বানাও"}
                  </Button>{" "}
                </div>
              </Field>

              <Button type="submit">মেহেদি চাই! লিংক বানাও এখনই 😜</Button>
            </FieldGroup>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

export default RequestFrom;
