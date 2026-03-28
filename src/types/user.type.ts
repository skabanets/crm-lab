type TSidebarUser = {
  id: string;
  email: string;
};

type TUser = TSidebarUser & {
  first_name: string;
  last_name: string;
  phone: string | null;
  role: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type { TSidebarUser, TUser };
