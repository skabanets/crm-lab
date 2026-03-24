import { signOut } from '@/actions/auth';

const UsersPage = () => {
  return (
    <div>
      <form action={signOut}>
        <button type="submit">Logout</button>
      </form>
    </div>
  );
};

export default UsersPage;
