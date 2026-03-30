import { notFound } from 'next/navigation';

import { UserEditForm } from '@/components/containers/UserEditForm/UserEditForm';
import { createSupabaseServerClient } from '@/lib/supabase/server';

type TUserPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const UserPage = async ({ params }: TUserPageProps) => {
  const { id } = await params;

  const supabase = await createSupabaseServerClient();

  const { data: user, error } = await supabase.from('users').select('*').eq('id', id).single();

  if (error || !user) {
    notFound();
  }

  return <UserEditForm user={user} />;
};

export default UserPage;
