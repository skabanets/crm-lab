type TUserPageProps = {
  params: {
    id: string;
  };
};

const UserPage = ({ params }: TUserPageProps) => {
  return <div>User id: {params.id}</div>;
};

export default UserPage;
