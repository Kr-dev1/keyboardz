import dbConnect from "@/lib/dbConnect";

export const GET = async (request: Request) => {
  await dbConnect();
};
