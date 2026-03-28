'use client';

import type { ColDef, RowClickedEvent } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { AgGridProvider, AgGridReact } from 'ag-grid-react';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { ROUTES } from '@/constants/routes.constant';
import type { TUser } from '@/types/user.type';

import { RoleCell } from './RoleCell';
import { StatusCell } from './StatusCell';
import styles from './UsersGrid.module.scss';

type TUsersGridProps = {
  users: TUser[];
};

const UsersGrid = ({ users }: TUsersGridProps) => {
  const router = useRouter();

  const columnDefs = useMemo<ColDef<TUser>[]>(
    () => [
      {
        headerName: 'Full Name',
        valueGetter: ({ data }) => (data ? `${data.first_name} ${data.last_name}` : ''),
        tooltipValueGetter: ({ data }) => (data ? `${data.first_name} ${data.last_name}` : ''),
        flex: 1.2,
      },
      {
        field: 'email',
        headerName: 'Email',
        tooltipField: 'email',
        flex: 1.4,
      },
      {
        field: 'phone',
        headerName: 'Phone',
        tooltipField: 'phone',
        flex: 1,
      },
      {
        field: 'role',
        headerName: 'Role',
        tooltipField: 'role',
        cellRenderer: RoleCell,
        flex: 0.9,
      },
      {
        field: 'status',
        headerName: 'Status',
        tooltipField: 'status',
        cellRenderer: StatusCell,
        flex: 0.9,
      },
      {
        field: 'created_at',
        headerName: 'Created At',
        valueFormatter: ({ value }) => (value ? new Date(value).toLocaleDateString() : ''),
        tooltipValueGetter: ({ value }) => (value ? new Date(value).toLocaleString() : ''),
        flex: 1,
      },
    ],
    []
  );

  const handleRowClick = (event: RowClickedEvent<TUser>) => {
    if (!event.data) {
      return;
    }

    router.push(`${ROUTES.USERS}/${event.data.id}`);
  };

  return (
    <AgGridProvider modules={[AllCommunityModule]}>
      <div className={cn('ag-theme-quartz', styles.gridWrapper)}>
        <AgGridReact<TUser>
          rowData={users}
          columnDefs={columnDefs}
          defaultColDef={{
            sortable: true,
            resizable: true,
          }}
          headerHeight={36}
          rowHeight={36}
          tooltipShowDelay={200}
          animateRows
          suppressCellFocus
          onRowClicked={handleRowClick}
        />
      </div>
    </AgGridProvider>
  );
};

export { UsersGrid };
