"use server";
import { databases } from "@/lib/AppwriteClient";
import { Permission, Role } from "appwrite";

export const create_req = async (data: {
  name: string;
  receiver_name: string;
  relationship: string;
  message: string;
}) => {
  try {
    const req_data = await databases.createDocument({
      databaseId: process.env.DATABASE_ID!,
      collectionId: process.env.COLLECTION_ID!,
      documentId: "unique()",
      data,
      permissions: [
        Permission.read(Role.any()),
        Permission.write(Role.any()),
        Permission.update(Role.any()),
        Permission.delete(Role.any()),
      ],
    });
    const { $id, name, receiver_name, relationship, message } = JSON.parse(
      JSON.stringify(req_data),
    );
    return { id: $id, name, receiver_name, relationship, message };
  } catch (error) {
    console.log(error);
  }
};
