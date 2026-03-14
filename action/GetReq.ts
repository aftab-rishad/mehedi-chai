"use server";

import { databases } from "@/lib/AppwriteClient";

export const get_req = async (id: string) => {
  try {
    const req_data = await databases.getDocument({
      databaseId: process.env.DATABASE_ID!,
      collectionId: process.env.COLLECTION_ID!,
      documentId: id,
    });
    const { $id, name, receiver_name, relationship, message } = JSON.parse(
      JSON.stringify(req_data),
    );
    return { id: $id, name, receiver_name, relationship, message };
  } catch (error) {
    console.log(error);
  }
};
