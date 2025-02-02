import { Knex } from 'knex';

export const PinnedListTableName = 'pinned_list';
export const PinnedChartTableName = 'pinned_chart';
export const PinnedDashboardTableName = 'pinned_dashboard';

export type DbPinnedList = {
    pinned_list_uuid: string;
    project_uuid: string;
    created_at?: Date;
};

export type DbPinnedChart = {
    pinned_item_uuid: string;
    pinned_list_uuid: string;
    saved_chart_uuid: string;
    created_at: Date;
};
export type DbPinnedDashboard = {
    pinned_item_uuid: string;
    pinned_list_uuid: string;
    dashboard_uuid: string;
    created_at: Date;
};

export type CreatePinnedChart = Omit<
    DbPinnedChart,
    'pinned_item_uuid' | 'created_at'
>;
export type CreatePinnedDashboard = Omit<
    DbPinnedDashboard,
    'pinned_item_uuid' | 'created_at'
>;

export type PinnedListTable = Knex.CompositeTableType<
    DbPinnedList,
    Pick<DbPinnedList, 'project_uuid'>
>;
export type PinnedChartTable = Knex.CompositeTableType<
    DbPinnedChart,
    CreatePinnedChart
>;
export type PinnedDashboardTable = Knex.CompositeTableType<
    DbPinnedDashboard,
    CreatePinnedDashboard
>;
