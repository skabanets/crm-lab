type TUserPageProps = {
  params: {
    id: string;
  };
};

const UserPage = async ({ params }: TUserPageProps) => {
  const { id } = await params;

  return <div>User id: {id}</div>;
};

export default UserPage;
