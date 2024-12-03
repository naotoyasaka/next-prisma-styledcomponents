import { prisma } from "@/lib/prisma";
import EditPostForm from "../../../../components/EditPostForm";

const EditPostPage = async ({ params }: { params: { id: string } }) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(params.id) },
  });

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1>Edit Post</h1>
      <EditPostForm post={post} />
    </div>
  );
};

export default EditPostPage;
