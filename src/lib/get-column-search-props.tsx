import { ColumnType } from "antd/es/table";
import { ProColumnType } from '@ant-design/pro-components/es'
import { StringFilter } from "../components/string-filter";
import { SearchOutlined } from "@ant-design/icons";

export function getColumnSearchProps<T>(dataIndex: keyof T): ProColumnType<T> {
  return {
    filterDropdown: (props) => (
      <StringFilter {...props} dataIndex={dataIndex as string} />
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      (record[dataIndex] as string)
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
  };
}
